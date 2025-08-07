import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../CartSlice";
import "./CartItem.css"; // Optional styling file

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleQuantityChange = (name, amount) => {
    if (amount > 0) {
      dispatch(updateQuantity({ name, amount }));
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.name} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: {item.cost}</p>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.name, Number(e.target.value))
                    }
                  />
                </label>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="continue-btn" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
