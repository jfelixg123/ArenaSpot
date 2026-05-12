import React, { useEffect, useState } from 'react';
import CardGaming from './CardGaming';
import './TrendingSection.css';

function GamingSection() {

    const [centers, setCenters] = useState([]);

    useEffect(() => {

        fetch('http://localhost:3001/api/trendingGamingCenters/trending-centers')
            .then(res => res.json())
            .then(data => {
                setCenters(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <section className="gaming-section">

            <h2 className="gaming-title">
                TRENDING GAMING CENTERS
            </h2>

            <div className="gaming-container">

                {centers.map(center => (
                    <CardGaming
                        key={center.id_center}
                        center={center}
                    />
                ))}

            </div>

        </section>
    );
}

export default GamingSection;
