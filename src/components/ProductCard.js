import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Product.css';

const ProductCard = ({ gafa }) => {
    const { agregarAlCarrito } = useCart();
    const [extraLente, setExtraLente] = useState(0);
    const [receta, setReceta] = useState("");

    const manejarCambioLente = (e) => {
        setExtraLente(parseInt(e.target.value));
    };

    const getTipoLenteString = (valorExtra) => {
        if (valorExtra === 30) return "Fotocromática";
        if (valorExtra === 50) return "Graduada";
        return "Lente Estándar";
    };

    const precioFinal = gafa.precioBase + extraLente;
    const tipoLenteStr = getTipoLenteString(extraLente);
    const requiereReceta = extraLente === 50;

    return (
        <div className={`product-card ${!gafa.stock ? 'out-of-stock' : ''}`}>
            <div className="product-image-container">
                <img
                    src={gafa.imagen}
                    alt={gafa.nombre}
                    className="product-image"
                />
            </div>

            <h2 className="product-title">{gafa.nombre}</h2>
            <p className="product-description">{gafa.descripcion}</p>

            <div className="product-select-container">
                <select
                    disabled={!gafa.stock}
                    onChange={manejarCambioLente}
                    value={extraLente}
                    className="product-select"
                >
                    <option value="0">Lente Estándar +0€</option>
                    <option value="30">Fotocromática +30€</option>
                    <option value="50">Graduada +50€</option>
                </select>
            </div>

            {requiereReceta && (
                <input
                    type="text"
                    placeholder="Datos de tu receta médica..."
                    value={receta}
                    onChange={(e) => setReceta(e.target.value)}
                    className="product-input"
                />
            )}

            <div className="product-action-row">
                <span className="product-price">{precioFinal}€</span>
                <button
                    disabled={!gafa.stock}
                    onClick={() => agregarAlCarrito(gafa, tipoLenteStr, precioFinal, receta)}
                    className="btn-buy"
                >
                    {gafa.stock ? 'COMPRAR' : 'AGOTADO'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
