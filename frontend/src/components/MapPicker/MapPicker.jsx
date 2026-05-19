import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./MapPicker.module.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapPicker({
  value,                 // { lat, lng } | null (valor "definitivo")
  onChange,              // ({lat,lng}) => void
  center = { lat: 41.3851, lng: 2.1734 },
  zoom = 12,
  resizeSignal = 0,      // cambia este prop para forzar resize (ej: step)
  flyTo = null,          // { lat, lng } | null (preview mientras escribe)
  centers = [],          // lista de gaming centers para pintarlos en el mapa
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const centerMarkersRef = useRef([]);
  const pendingCoordsRef = useRef(null);
  const centersRef = useRef(centers);

  useEffect(() => {
    centersRef.current = centers;
  }, [centers]);

  // init map (solo 1 vez)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;
    if (!import.meta.env.VITE_MAPBOX_TOKEN) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [value?.lng ?? center.lng, value?.lat ?? center.lat],
      zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      const currentCenters = centersRef.current || [];
      console.log("MapPicker: map loaded — rendering center markers, centers.length=", currentCenters.length);
      renderCenterMarkers(currentCenters);
      if (pendingCoordsRef.current) {
        applyCoords(pendingCoordsRef.current, 14);
      }
    });

    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      // Marcador
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      } else {
        markerRef.current.setLngLat([lng, lat]);
      }

      onChange?.({ lat, lng });
    });

    // Resize al montar (por si el contenedor estaba colapsado)
    setTimeout(() => {
      mapRef.current?.resize();
    }, 0);
  }, []);

  // Helper: centrar mapa + marcador
  const applyCoords = (coords, minZoom = 14) => {
    if (!coords?.lat || !coords?.lng) return;

    pendingCoordsRef.current = coords;
    if (!mapRef.current) return;

    if (!markerRef.current) {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([coords.lng, coords.lat])
        .addTo(mapRef.current);
    } else {
      markerRef.current.setLngLat([coords.lng, coords.lat]);
    }

    mapRef.current.easeTo({
      center: [coords.lng, coords.lat],
      zoom: Math.max(mapRef.current.getZoom(), minZoom),
      duration: 500,
    });
  };

  const clearCenterMarkers = () => {
    console.log("MapPicker: clearing", centerMarkersRef.current.length, "center markers");
    centerMarkersRef.current.forEach((marker) => marker.remove());
    centerMarkersRef.current = [];
  };

  const renderCenterMarkers = (items) => {
    if (!mapRef.current) return;
    console.log("MapPicker: renderCenterMarkers called — items.length=", (items || []).length);

    clearCenterMarkers();

    const validCenters = (items || []).filter(
      (centerItem) => centerItem?.lat != null && centerItem?.lng != null
    );

    console.log("MapPicker: validCenters.length=", validCenters.length);

    validCenters.forEach((centerItem) => {
      const isSelected =
        value &&
        Number(value.lat) === Number(centerItem.lat) &&
        Number(value.lng) === Number(centerItem.lng);

      const marker = new mapboxgl.Marker({
        color: isSelected ? "#1f8aff" : "#22c55e",
      })
        .setLngLat([Number(centerItem.lng), Number(centerItem.lat)])
        .setPopup(
          new mapboxgl.Popup({ offset: 18, className: "mapbox-popup-black" }).setHTML(
            `<strong>${centerItem.nombre || "Gaming center"}</strong><br>${centerItem.ciudad || ""}`
          )
        )
        .addTo(mapRef.current);

      centerMarkersRef.current.push(marker);
    });

    if (validCenters.length > 0 && !value && !flyTo) {
      const bounds = new mapboxgl.LngLatBounds();
      validCenters.forEach((centerItem) => {
        bounds.extend([Number(centerItem.lng), Number(centerItem.lat)]);
      });

      mapRef.current.fitBounds(bounds, {
        padding: 60,
        duration: 500,
        maxZoom: 14,
      });
    }
  };

  // 1) Si cambia el value (definitivo), actualiza marcador y centra
  useEffect(() => {
    applyCoords(value, 14);
  }, [value?.lat, value?.lng]);

  useEffect(() => {
    renderCenterMarkers(centers);
  }, [centers, value?.lat, value?.lng]);

  // 2) Si cambia flyTo (preview), mueve el mapa también
  //    (sin necesidad de “confirmar” lat/lng en el form)
  useEffect(() => {
    applyCoords(flyTo, 13);
  }, [flyTo?.lat, flyTo?.lng]);

  // Force resize cuando el wizard muestra el step del mapa
  useEffect(() => {
    if (!mapRef.current) return;
    setTimeout(() => mapRef.current?.resize(), 0);
  }, [resizeSignal]);

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return <div className={styles.fallback}>Falta VITE_MAPBOX_TOKEN en el .env</div>;
  }

  return <div className={styles.map} ref={mapContainerRef} />;
}