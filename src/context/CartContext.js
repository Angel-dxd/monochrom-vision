import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('aurionCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('aurionCart', JSON.stringify(cart));
    }, [cart]);

    const agregarAlCarrito = (gafa, tipoLente, precioFinal, receta = "") => {
        setCart(prevCart => {
            // Find if the exact same item (same id, lens type, and prescription) is already in the cart
            const itemExistente = prevCart.find(
                item => item.id === gafa.id && item.tipoLente === tipoLente && item.receta === receta
            );

            if (itemExistente) {
                // If exists, just increment quantity
                return prevCart.map(item =>
                    item.cartId === itemExistente.cartId
                        ? { ...item, cantidad: item.cantidad + 1, precioTotal: item.precioFinal * (item.cantidad + 1) }
                        : item
                );
            }

            // If not, add as new item
            const nuevoItem = {
                ...gafa,
                tipoLente,
                precioFinal,
                precioTotal: precioFinal, // Store total price for this row
                receta,
                cantidad: 1,
                cartId: Date.now().toString()
            };
            return [...prevCart, nuevoItem];
        });
    };

    const eliminarDelCarrito = (cartId) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
    };

    const vaciarCarrito = () => {
        setCart([]);
    };

    // Calcula la cantidad total de artículos para el badge del Navbar
    const cantidadTotal = cart.reduce((total, item) => total + item.cantidad, 0);

    return (
        <CartContext.Provider value={{
            cart,
            cantidadTotal,
            agregarAlCarrito,
            eliminarDelCarrito,
            vaciarCarrito
        }}>
            {children}
        </CartContext.Provider>
    );
};
