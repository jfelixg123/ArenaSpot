import React from 'react';
import scroll from '../assets/images/scroll.png';

function IndicadorScroll() {
  return (
    <div style={styles.container}>
        <img src={scroll} alt="Scroll" style={styles.scrollImage} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollImage: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
    animation: 'bounce 2s infinite',
  },
};

export default IndicadorScroll;