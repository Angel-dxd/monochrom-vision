import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = ({ onCartClick, onLogoClick }) => {
    const { cantidadTotal } = useCart();

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={onLogoClick}>
                AURION X VISION
            </div>
            <div className="navbar-cart" onClick={onCartClick}>
                🛒 <span className="navbar-cart-badge">{cantidadTotal}</span>
            </div>
        </nav>
    );
};

export default Navbar;