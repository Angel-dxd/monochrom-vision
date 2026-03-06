import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = ({ onVolver }) => {
    const { cart, eliminarDelCarrito } = useCart();
    const total = cart.reduce((acc, item) => acc + item.precioTotal, 0);

    return (
        <div className="cart-container">
            <button onClick={onVolver} className="btn-back">
                ← Volver a la tienda
            </button>

            <h1 className="cart-title">Tu Carrito</h1>

            {cart.length === 0 ? (
                <p className="cart-empty-message">El carrito está vacío. ¡Empieza a comprar!</p>
            ) : (
                <>
                    <div className="cart-items-container">
                        {cart.map((item) => (
                            <div key={item.cartId} className="cart-item">
                                <div>
                                    <h3 className="cart-item-title">
                                        {item.nombre}
                                        {item.cantidad > 1 && <span className="cart-item-quantity">x{item.cantidad}</span>}
                                    </h3>
                                    <p className="cart-item-details">
                                        Lente: <strong>{item.tipoLente}</strong>
                                        {item.receta && ` | Receta: ${item.receta}`}
                                    </p>
                                </div>
                                <div className="cart-item-price-container">
                                    <span className="cart-item-price">{item.precioTotal}€</span>
                                    <button
                                        onClick={() => eliminarDelCarrito(item.cartId)}
                                        className="btn-remove"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2 className="cart-total-title">Total: {total}€</h2>
                        <button className="btn-checkout">
                            Proceder al Pago Seguro
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;