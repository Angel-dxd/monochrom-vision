import React, { useState } from 'react';
import datosGafas from '../data/gafas.json';

const ProductList = ({ onAgregar }) => {
    const [productos] = useState(datosGafas);
    const [seleccion, setSeleccion] = useState({});
    const [graduacionElegida, setGraduacionElegida] = useState({});
    const [notificacion, setNotificacion] = useState(null);

    const dioptriasEstandar = ["-4.00", "-2.00", "0.00", "+2.00", "+4.00"];

    const manejarCompra = (gafa) => {
        const extra = seleccion[gafa.id] || 0;
        const precioFinal = gafa.precioBase + extra;
        const tipoLente = extra === 220 ? "Graduada Fotocromática" : "Fotocromática Estándar";
        const receta = graduacionElegida[gafa.id] || "Neutro";

        onAgregar(gafa, tipoLente, precioFinal, receta);
        setNotificacion(`${gafa.nombre} añadida con éxito`);
        setTimeout(() => setNotificacion(null), 3000);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            {notificacion && (
                <div style={{
                    position: 'fixed', top: '100px', right: '20px', backgroundColor: '#000',
                    color: '#fff', padding: '15px 30px', borderRadius: '50px', zIndex: 2000
                }}>
                    ✓ {notificacion}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                {productos.map((gafa) => {
                    const extra = seleccion[gafa.id] || 0;
                    const precioFinal = gafa.precioBase + extra;

                    return (
                        <div key={gafa.id} style={{
                            backgroundColor: '#fff', borderRadius: '0px', padding: '25px',
                            border: '1px solid #eee', textAlign: 'center'
                        }}>
                            <div style={{ height: '250px', overflow: 'hidden', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
                                <img src={gafa.imagen} alt={gafa.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <h2 style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>{gafa.nombre}</h2>
                            <p style={{ color: '#666', fontSize: '0.85rem' }}>{gafa.descripcion}</p>

                            <div style={{ margin: '20px 0' }}>
                                <select
                                    onChange={(e) => setSeleccion({ ...seleccion, [gafa.id]: parseInt(e.target.value) })}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #000', borderRadius: '0px' }}
                                >
                                    <option value="0">Fotocromática Estándar - {gafa.precioBase}€</option>
                                    <option value="220">Fotocromática Graduada - {gafa.precioBase + 220}€</option>
                                </select>
                            </div>

                            {(seleccion[gafa.id] === 220) && (
                                <select
                                    onChange={(e) => setGraduacionElegida({ ...graduacionElegida, [gafa.id]: e.target.value })}
                                    style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px dashed #000' }}
                                >
                                    <option value="">Selecciona Graduación...</option>
                                    {dioptriasEstandar.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{precioFinal}€</span>
                                <button onClick={() => manejarCompra(gafa)} style={{ backgroundColor: '#000', color: '#fff', padding: '12px 30px', border: 'none', cursor: 'pointer' }}>
                                    COMPRAR
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