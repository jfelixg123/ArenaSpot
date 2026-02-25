import React from 'react';
import IndicadorScroll from './IndicadorScroll';

function Hero() {
  return (
    <section style={styles.hero}>
        <div style={styles.content}>
            <div style={styles.textContainer}>
                <h1 style={styles.title}>
                    Encuentra tu <span style={styles.highlight}>Gaming</span>
                </h1>
                <h1 style={styles.title}>
                    <span style={styles.highlight}>Center más cercano</span> y
                </h1>
                <h1 style={styles.title}>reserva tu hora para jugar</h1>
            </div>

            <button style={styles.boton}>RESERVAR AHORA</button>
        </div>
        <IndicadorScroll />
    </section>
  );
}

const styles = {
  hero: {
    height: '90vh',
    background: 'radial-gradient(circle at center, #10233b, #050b14)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Inter, sans-serif',
    paddingBottom: '4rem',
    position: 'relative',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '3rem',
  },
  highlight: {
    color: '#1F8AFF',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  boton: {
    padding: '1rem 3rem',
    fontSize: '1.1rem',
    backgroundColor: '#1F8AFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Hero;