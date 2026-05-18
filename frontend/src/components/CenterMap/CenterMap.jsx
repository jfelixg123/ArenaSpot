import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./CenterMap.css"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function CenterMap({ lat, lng }) {

    const mapContainer = useRef(null);

    useEffect(() => {

        // VALIDACIÓN
        if (!lat || !lng) return;

        // CREAR MAPA
        const map = new mapboxgl.Map({

            container: mapContainer.current,

            style: "mapbox://styles/mapbox/dark-v11",

            center: [
                parseFloat(lng),
                parseFloat(lat)
            ],

            zoom: 14

        });

        new mapboxgl.Marker({
            color: "#1F8AFF"
        })
            .setLngLat([
                parseFloat(lng),
                parseFloat(lat)
            ])
            .addTo(map);

        // LIMPIAR
        return () => map.remove();

    }, [lat, lng]);

    return (

        <div
            ref={mapContainer}
            className="center-map"
        />

    );
}

export default CenterMap;
