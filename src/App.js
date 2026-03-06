import React, { useState } from 'react';
import Navbar from './layout/Navbar';
import ProductList from './views/ProductList';
import Cart from './views/Cart';
import './styles/App.css';

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
        <div className="app-container" style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
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
                            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                                <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#333' }}>
                                    Ingeniería fotocromática avanzada diseñada desde nuestra matriz en <strong>Sagunto, Valencia</strong>. <br />
                                    Transiciones inteligentes de estado sólido que garantizan precisión nanométrica y nitidez absoluta frente a cualquier espectro UV.
                                </p>
                            </div>
                        </section>

                        <section style={{ backgroundColor: '#fcfcfc', padding: '60px 20px', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '1.8rem', letterSpacing: '2px', marginBottom: '20px' }}>NUESTRO EJE LOGÍSTICO (2025)</h2>
                                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1.05rem' }}>
                                    Nacida de la necesidad de fusionar un rendimiento ocular extremo con el diseño europeo de vanguardia, Aurion X Optics S.L. concentra sus operaciones internacionales en el Polígono Industrial de <strong>Sagunto</strong>. Esta localización estratégica nos permite una cadena de distribución ultrarrápida para integrar la inigualable precisión y el pulido avanzado de la <strong>Óptica Danyang</strong> en cada una de nuestras monturas.
                                </p>
                            </div>
                        </section>
                        <ProductList onAgregar={agregarAlCarrito} />
                    </>
                ) : (
                    <Cart items={cart} onEliminar={eliminarDelCarrito} onVolver={() => setView('shop')} />
                )}
            </main>

            <footer style={{ padding: '50px 20px', textAlign: 'center', borderTop: '1px solid #eee', marginTop: '50px', backgroundColor: '#111', color: '#fff' }}>
                <p style={{ fontWeight: 'bold', letterSpacing: '2px', marginBottom: '15px' }}>AURION X OPTICS, S.L.</p>
                <div style={{ color: '#aaa', fontSize: '0.8rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                    <p>N.I.F. B98765432</p>
                    <p>Sede Social: Av. de Europa nº 12, Valencia, España</p>
                    <p>Nave Industrial: Polígono Industrial de Sagunto, Calle Talleres, nave 43</p>
                    <p style={{ marginTop: '15px' }}>
                        Síguenos en Instagram |{' '}
                        <a
                            href="https://instagram.com/aurion.x.optics"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
                            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                        >
                            @aurion.x.optics
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;