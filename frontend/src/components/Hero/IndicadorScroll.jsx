import React from 'react';
import scroll from '../../assets/images/scroll.png';
import './IndicadorScroll.css';

function IndicadorScroll() {
  return (
    <div className="scroll-container">
      <img src={scroll} alt="Scroll" className="scroll-image" />
    </div>
  );
}

export default IndicadorScroll;