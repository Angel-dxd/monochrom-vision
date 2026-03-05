import React, { useState } from 'react';
import Navbar from './layout/Navbar';
import ProductList from './views/ProductList';

function App() {
    // Estado global para el conteo del carrito
    const [cartCount, setCartCount] = useState(0);

    const agregarAlCarrito = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <div className="App">
            {/* Pasamos el número al Navbar */}
            <Navbar cartCount={cartCount} />

            <main style={{ backgroundColor: '#fdfdfd' }}>
                <section style={{
                    padding: '60px 20px',
                    textAlign: 'center',
                    background: 'linear-gradient(to bottom, #fff, #f9f9f9)'
                }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Mira el mundo en un solo tono</h2>
                    <p style={{ color: '#555', fontSize: '1.2rem' }}>Gafas terapéuticas y de diseño con envío a todo el mundo.</p>
                </section>

                {/* Pasamos la función de agregar al ProductList */}
                <ProductList onAgregar={agregarAlCarrito} />
            </main>

            <footer style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                © 2026 Monochrom Vision International.
            </footer>
        </div>
    );
}

export default App;