import React, { useEffect, useState } from 'react';
import Lupa from '../../assets/images/buscar.png';
import './BarraBuscar.css';

export default function BarraBuscar({ onSearch, onQueryChange, value = "" }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
            <img src={Lupa} alt="Lupa" className="lupa" />
            <input
                type="text"
                placeholder="Buscar gaming centers, torneos..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onQueryChange?.(e.target.value);
                }}
                className="search-input"
            />
        </div>
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  );
}