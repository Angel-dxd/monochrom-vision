import React, { useState } from 'react';
import datosGafas from '../data/gafas.json';
import '../styles/Product.css';

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
        <div className="product-list-container">
            {notificacion && (
                <div style={{
                    position: 'fixed', top: '100px', right: '20px', backgroundColor: '#000',
                    color: '#fff', padding: '15px 30px', borderRadius: '50px', zIndex: 2000
                }}>
                    ✓ {notificacion}
                </div>
            )}

            <div className="product-grid">
                {productos.map((gafa) => {
                    const extra = seleccion[gafa.id] || 0;
                    const precioFinal = gafa.precioBase + extra;

                    return (
                        <div key={gafa.id} className={`product-card ${!gafa.stock ? 'out-of-stock' : ''}`}>
                            <div className="product-image-container">
                                <img
                                    src={gafa.imagen}
                                    alt={gafa.nombre}
                                    className="product-image"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x300?text=Cargando+Imagen...";
                                    }}
                                />
                            </div>

                            <h2 className="product-title">{gafa.nombre}</h2>
                            <p className="product-description">{gafa.descripcion}</p>

                            <div style={{ marginBottom: '20px', fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                🛡️ DANYANG OPTICS®️ <br />
                                <span style={{ fontSize: '0.65rem' }}>Cumplimiento Normativa Int. Importación</span>
                            </div>

                            <div className="product-select-container">
                                <select
                                    onChange={(e) => setSeleccion({ ...seleccion, [gafa.id]: parseInt(e.target.value) })}
                                    className="product-select"
                                >
                                    <option value="0">Fotocromática Estándar - {gafa.precioBase}€</option>
                                    <option value="220">Fotocromática Graduada - {gafa.precioBase + 220}€</option>
                                </select>
                            </div>

                            {(seleccion[gafa.id] === 220) && (
                                <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fcfcfc', borderRadius: '10px', border: '1px solid #000' }}>
                                    <select
                                        onChange={(e) => setGraduacionElegida({ ...graduacionElegida, [gafa.id]: e.target.value })}
                                        className="product-select"
                                        style={{ border: '1px solid #ddd' }}
                                    >
                                        <option value="">Selecciona Graduación...</option>
                                        {dioptriasEstandar.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            )}

                            <div className="product-action-row">
                                <span className="product-price">{precioFinal}€</span>
                                <button
                                    onClick={() => manejarCompra(gafa)}
                                    className="btn-buy"
                                >
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