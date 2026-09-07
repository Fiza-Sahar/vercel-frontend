import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initial state: localStorage se cart items load karna
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Jab bhi cartItems change hon, unhe localStorage mein save karein
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // 1. Add item to cart
    const addToCart = (product, quantity = 1) => {
        const qty = Number(quantity);
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((item) => item._id === product._id);

            if (existingItemIndex > -1) {
                // Agar item pehle se cart mein hai, quantity increase karein
                const updatedItems = [...prevItems];
                const newQuantity = updatedItems[existingItemIndex].quantity + qty;
                const maxStock = product.stock || 100;
                updatedItems[existingItemIndex].quantity = Math.min(newQuantity, maxStock);
                return updatedItems;
            } else {
                // Naya item cart mein add karein
                return [
                    ...prevItems,
                    {
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        stock: product.stock,
                        quantity: qty,
                    },
                ];
            }
        });
    };

    // 2. Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    };

    // 3. Update item quantity directly
    const updateQuantity = (productId, quantity) => {
        const qty = Number(quantity);
        if (qty <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item._id === productId) {
                    const maxStock = item.stock || 100;
                    return { ...item, quantity: Math.min(qty, maxStock) };
                }
                return item;
            })
        );
    };

    // 4. Clear all items from cart
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    // Calculations
    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    // Free shipping if order > $100, otherwise $10 shipping
    const shippingPrice = subtotal > 100 || subtotal === 0 ? 0 : 10;

    const totalPrice = subtotal + shippingPrice;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItemsCount,
                subtotal,
                shippingPrice,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
