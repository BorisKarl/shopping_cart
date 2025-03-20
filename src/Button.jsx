const Button = ({ onClick, text = "Buy", color = "blue", fontSize = 12 }) => {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px",
  };

  return <button onClick={onClick} 
  style={buttonStyle}>{text}</button>;
}

export default Button;
