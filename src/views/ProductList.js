import React, { useState } from 'react';
import datosGafas from '../data/gafas.json'; // Importamos los datos externos

const ProductList = ({ onAgregar }) => { // <--- AÑADIDO: Recibimos la prop aquí
    const [productos] = useState(datosGafas);
    const [seleccion, setSeleccion] = useState({});

    const manejarCambioLente = (id, aumento) => {
        setSeleccion({
            ...seleccion,
            [id]: parseInt(aumento)
        });
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
            }}>
                {productos.map((gafa) => {
                    const extra = seleccion[gafa.id] || 0;
                    const precioFinal = gafa.precioBase + extra;

                    return (
                        <div key={gafa.id} style={{
                            backgroundColor: '#fff',
                            borderRadius: '15px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            padding: '20px',
                            opacity: gafa.stock ? 1 : 0.6 // Si no hay stock, se ve un poco opaco
                        }}>
                            <img src={gafa.imagen} alt={gafa.nombre} style={{ width: '100%', borderRadius: '10px' }} />

                            <h2 style={{ marginTop: '15px' }}>{gafa.nombre}</h2>
                            <p style={{ color: '#777' }}>{gafa.descripcion}</p>

                            {!gafa.stock && <span style={{ color: 'red', fontWeight: 'bold' }}>AGOTADO</span>}

                            <div style={{ margin: '20px 0' }}>
                                <select
                                    disabled={!gafa.stock}
                                    onChange={(e) => manejarCambioLente(gafa.id, e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                                >
                                    <option value="0">Estándar +0€</option>
                                    <option value="30">Fotocromática +30€</option>
                                    <option value="50">Graduada +50€</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{precioFinal}€</span>
                                <button
                                    disabled={!gafa.stock}
                                    onClick={onAgregar} // <--- AÑADIDO: Ejecuta la función al pulsar
                                    style={{
                                        backgroundColor: gafa.stock ? '#000' : '#ccc',
                                        color: '#fff',
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        border: 'none',
                                        cursor: gafa.stock ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    {gafa.stock ? 'Comprar' : 'Sin Stock'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;