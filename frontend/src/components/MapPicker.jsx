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
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

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
    if (!mapRef.current) return;
    if (!coords?.lat || !coords?.lng) return;

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

  // 1) Si cambia el value (definitivo), actualiza marcador y centra
  useEffect(() => {
    applyCoords(value, 14);
  }, [value?.lat, value?.lng]);

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