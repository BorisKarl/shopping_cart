import { useState, useEffect } from 'react';

const Cart = ({ cart, total, onDeleteItem, onUpdateQuantity }) => {

 const showCart = () => {
    document.getElementById("cart_content").classList.toggle("show");
  }
  return (
    <div className="cart-container">
      <button id="cart_button" onClick={showCart}>
        Cart
      </button>
      <div className="hidden" id="cart_content">
        {cart.length === 0 && <p className='empty_message'>Your cart is empty</p>}
        <div className="cart_items">
          <ul>
            {cart.map((item, index) => (
              <li key={`${item.id}-${index}`}>
                <img
                  className="cart-image"
                  src={item.image}
                  alt={item.title}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="item_description">{item.description}</div>

                <div>€{item.price}</div>
                <div>Quantity: {item.quantity}</div>
                <input
                  type="number"
                  id="quantity"
                  min={0}
                  placeholder={item.quantity}
                />
                <button onClick={() => onUpdateQuantity(item.id)}>
                  Update quantity
                </button>
                <br />
                <button onClick={() => onDeleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <p className="total_display">Total: €{total}</p>
        </div>
      </div>
      <button>Checkout</button>
      <br />
    </div>
  );
};

export default Cart;


