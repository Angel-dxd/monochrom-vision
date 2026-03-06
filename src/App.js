import React, { useState } from 'react';
import Navbar from './layout/Navbar';
import ProductList from './views/ProductList';
import Cart from './views/Cart';

function App() {
    const [cart, setCart] = useState([]);
    const [view, setView] = useState('shop');

    const agregarAlCarrito = (gafa, tipoLente, precioFinal, receta = "") => {
        const nuevoItem = { ...gafa, tipoLente, precioFinal, receta, cartId: Date.now() };
        setCart([...cart, nuevoItem]);
    };

    const eliminarDelCarrito = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    return (
        <div className="App" style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
            <Navbar
                cartCount={cart.length}
                onCartClick={() => setView('cart')}
                onLogoClick={() => setView('shop')}
            />

            <main style={{ minHeight: '80vh' }}>
                {view === 'shop' ? (
                    <>
                        <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#fff' }}>
                            <h1 style={{ fontSize: '3rem', letterSpacing: '5px', marginBottom: '20px' }}>AURION X VISION</h1>
                            <div style={{ maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
                                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#555' }}>
                                    Desde <strong>Sagunto, Valencia</strong>, redefinimos la óptica con tecnología fotocromática avanzada.
                                    Lentes que cambian a negro al contacto con la luz.
                                </p>
                            </div>
                        </section>
                        <ProductList onAgregar={agregarAlCarrito} />
                    </>
                ) : (
                    <Cart items={cart} onEliminar={eliminarDelCarrito} onVolver={() => setView('shop')} />
                )}
            </main>

            <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #eee', marginTop: '50px' }}>
                <p style={{ fontWeight: 'bold' }}>AURION X OPTICS</p>
                <p style={{ color: '#888', fontSize: '0.8rem' }}>Sagunto, Valencia | @aurion.x.optics</p>
            </footer>
        </div>
    );
}

export default App;