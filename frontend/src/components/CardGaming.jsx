import React from 'react';
import scroll from '../assets/images/gcPrueba.png';
import ubicacion from '../assets/images/ubicacion.png';

function CardGaming() {
    return (
        <div style={styles.card}>
            <img src={scroll} alt="Scroll" style={styles.gcImage} />
            <div style={styles.containerCard}>
                <div style={styles.divCard}>
                    <h3>Gaming Center Title</h3>
                    <h4>Precio</h4>
                </div>
                <div style={styles.containerUbicacion}>
                    <img src={ubicacion} alt="Ubicación" style={styles.ubicacion} />
                    <p>Dirección</p>
                </div>
                <div style={styles.spacer}></div>
                <button style={styles.boton}>RESERVAR</button>
            </div>
        </div>
    );
}

const styles = {
    gcImage: {
        height: '250px',
        width: '100%',
        objectFit: 'cover',
        borderRadius: '15px',
    },
    ubicacion: {
        width: '15px',
        height: '15px',
        objectFit: 'contain',
        animation: 'bounce 2s infinite',
    },
    card: {
        width: '350px',
        height: '350px',
        backgroundColor: '#172237',
        color: 'white',
        borderRadius: '15px',
        border: '3px solid #1F8AFF',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    containerCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem',
        flex: 1,
    },
    spacer: {
        flex: 1,
    },
    boton: {
        alignSelf: 'flex-end',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#1F8AFF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    divCard: {
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif',
        margin: '0.25rem 0',
    },
    containerUbicacion: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.25rem 0',
    },
};
export default CardGaming;