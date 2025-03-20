import { useState, useEffect } from 'react';
// import { Link } from "react-scroll";


import './Products.css';
import Button from './Button.jsx';
import Cart from './Cart.jsx';
import Nav from './Nav.jsx';

const Products = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Keine Daten verfügbar");
        }
        const json = await response.json();
        const itemsWithQuantity = json.map((item) => ({
          ...item,
          quantity: 1,
        }));
        setItems(itemsWithQuantity);
      } catch (error) {
        console.error("Fehler beim Laden:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(
      "Cart Update:",
      cart.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
      })) 
    );
    if (cart.length > 0) {
      const newTotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      setTotal(newTotal.toFixed(2));
    }else{
      setTotal(0);
    }
  }, [cart]);

  if (isLoading) return <div>Laden...</div>;
  if (error) return <div>Fehler: {error}</div>;

  const addToCart = (product) => {
    const quantity_id = product.id + "_product_quantity";
    const productQuantity = parseInt(
      document.getElementById(quantity_id).value
    ) || 1;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        
        console.log(productQuantity);
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: productQuantity,
              }
            : item
        );
      } 
      const newTotal = prevCart.reduce((sum, item) => { return sum + item.price * item.quantity; }  , 0);
      setTotal(newTotal.toFixed(2));
      return [...prevCart, { ...product, quantity: productQuantity }];
    });
  };

  const deleteItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const onUpdateQuantity = (id) => {
    const newQuantity = parseInt(document.getElementById("quantity").value);
 
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      
      const newTotal = updatedCart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      
      setTotal(newTotal.toFixed(2));
      return updatedCart;
    });
  }
    
  return (
    <>
      <Nav />

      <div className="app-container">
        <Cart
          cart={cart}
          total={total}
          onDeleteItem={deleteItem}
          onUpdateQuantity={onUpdateQuantity}
        />
        <div className="product-container">
          <h1 className="cat_header" id="women">
            Women&apos;s Clothing
          </h1>
          <ul className="cat_container">
            {items
              .filter((item) => item.category === "women's clothing")
              .map((item) => (
                <li className="product_item" key={item.id} id={item.id}>
                  <img
                    className="product_image"
                    src={item.image}
                    alt={item.title}
                  />
                  <p>€ {item.price}</p>
                  <input
                    className="number_input"
                    type="number"
                    id={item.id + "_product_quantity"}
                    min={1}
                    placeholder={item.quantity}
                  />
                  <Button fontSize="22" onClick={() => addToCart(item)} />
                </li>
              ))}
          </ul>
          <h1 className="cat_header" id="men">
            Mens&apos;s Clothing
          </h1>
          <ul className="cat_container">
            {items
              .filter((item) => item.category === "men's clothing")
              .map((item) => (
                <li className="product_item" key={item.id} id={item.id}>
                  <img
                    className="product_image"
                    src={item.image}
                    alt={item.title}
                  />
                  <p>€{item.price}</p>
                  <input
                    className="number_input"
                    type="number"
                    id={item.id + "_product_quantity"}
                    min={1}
                    placeholder={item.quantity}
                  />
                  <Button fontSize="22" onClick={() => addToCart(item)} />
                </li>
              ))}
          </ul>
          <h1 className="cat_header" id="electronics">
            Electronics
          </h1>
          <ul className="cat_container">
            {items
              .filter((item) => item.category === "electronics")
              .map((item) => (
                <li className="product_item" key={item.id} id={item.id}>
                  <img
                    className="product_image"
                    src={item.image}
                    alt={item.title}
                  />
                  <p>€{item.price}</p>
                  <input
                    className="number_input"
                    type="number"
                    id={item.id + "_product_quantity"}
                    min={1}
                    placeholder={item.quantity}
                  />
                  <Button fontSize="22" onClick={() => addToCart(item)} />
                </li>
              ))}
          </ul>
          <h1 className="cat_header" id="jewels">
            Jewelery
          </h1>
          <ul className="cat_container">
            {items
              .filter((item) => item.category === "jewelery")
              .map((item) => (
                <li className="product_item" key={item.id} id={item.id}>
                  <img
                    className="product_image"
                    src={item.image}
                    alt={item.title}
                  />
                  <p>€{item.price}</p>
                  <input
                    className="number_input"
                    type="number"
                    id={item.id + "_product_quantity"}
                    min={1}
                    placeholder={item.quantity}
                  />
                  <Button fontSize="22" onClick={() => addToCart(item)} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
  
}

export default Products;

/*

category: "men's clothing"​​
description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
id: 1
image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
price: 109.95
 {item.title} 
*/

