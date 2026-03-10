import React from 'react';
import CardGaming from './CardGaming';
import './TrendingSection.css';

function GamingSection() {
  return (
    <section className="gaming-section">
      <h2 className="gaming-title">
        TRENDING GAMING CENTERS
      </h2>

      <div className="gaming-container">
        <CardGaming />
        <CardGaming />
        <CardGaming />
        <CardGaming />
      </div>
    </section>
  );
}

export default GamingSection;