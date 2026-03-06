import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = ({ onVolver }) => {
    const { cart, eliminarDelCarrito, vaciarCarrito } = useCart();
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState('');

    const total = cart.reduce((acc, item) => acc + item.precioTotal, 0);

    const handleCheckout = () => {
        const generatedId = 'AXV-' + Math.floor(100000 + Math.random() * 900000);
        setOrderId(generatedId);
        setOrderComplete(true);
    };

    const handleVolverATienda = () => {
        vaciarCarrito();
        setOrderComplete(false);
        onVolver();
    };

    if (orderComplete) {
        return (
            <div className="cart-container">
                <div className="order-ticket">
                    <div className="ticket-header">
                        <h2>¡Pedido Confirmado!</h2>
                        <p>Gracias por confiar en Aurion X Vision.</p>
                        <div className="ticket-id">Orden #{orderId}</div>
                    </div>

                    <div className="ticket-body">
                        {cart.map((item) => (
                            <div key={item.cartId} className="ticket-item">
                                <div>
                                    <strong>{item.nombre}</strong> {item.cantidad > 1 && `(x${item.cantidad})`}
                                    <br />
                                    <small style={{ color: '#888' }}>
                                        {item.tipoLente} {item.receta ? `- Receta: ${item.receta}` : ''}
                                    </small>
                                </div>
                                <div>{item.precioTotal}€</div>
                            </div>
                        ))}
                    </div>

                    <div className="ticket-total">
                        <span>TOTAL ABONADO</span>
                        <span>{total}€</span>
                    </div>

                    <button
                        onClick={handleVolverATienda}
                        className="btn-checkout"
                        style={{ marginTop: '40px', width: '100%' }}
                    >
                        Volver a Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <button onClick={onVolver} className="btn-back">
                ← Seguir comprando
            </button>

            <h1 className="cart-title">Tu Carrito</h1>

            {cart.length === 0 ? (
                <p className="cart-empty-message">El carrito está vacío. ¡Descubre nuestra colección fotocromática!</p>
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
                        <button onClick={handleCheckout} className="btn-checkout">
                            Completar Pedido
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;