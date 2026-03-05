import React from 'react';

const Navbar = ({ cartCount }) => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 50px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #eee',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                MONOCHROM <span style={{ fontWeight: '300' }}>VISION</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span>🌐 Global / ES</span>
                <div style={{ position: 'relative', cursor: 'pointer', fontSize: '1.2rem' }}>
                    🛒 <span style={{
                        backgroundColor: '#ff4757',
                        color: '#fff',
                        borderRadius: '50%',
                        padding: '2px 7px',
                        fontSize: '0.7rem',
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        fontWeight: 'bold'
                    }}>
                        {cartCount}
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;