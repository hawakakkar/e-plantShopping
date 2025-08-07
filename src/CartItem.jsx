import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Calculate subtotal for a single plant
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    // Calculate total for all items
    const calculateTotalAmount = () => {
        let total = 0;
        cartItems.forEach((item) => {
            const price = parseFloat(item.cost.substring(1));
            total += price * item.quantity;
        });
        return total.toFixed(2);
    };

    // Continue shopping
    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    // Placeholder for checkout
    const handleCheckoutShopping = (e) => {
        e.preventDefault();
        alert('Functionality to be added for future reference');
    };

    // Increment item quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    // Decrement item quantity or remove if zero
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Remove item completely
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Plant</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.cost}</td>
                                    <td>
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item)}>+</button>
                                    </td>
                                    <td>${calculateTotalCost(item)}</td>
                                    <td>
                                        <button onClick={() => handleRemove(item)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="cart-summary">
                        <h3>Total: ${calculateTotalAmount()}</h3>
                        <button onClick={handleContinueShopping}>Continue Shopping</button>
                        <button onClick={handleCheckoutShopping}>Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;