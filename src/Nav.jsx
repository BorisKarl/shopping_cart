import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./nav.css";

const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="nav">
      <div>
        {currentPath !== "/" && <RouterLink to="/">Home</RouterLink>}

        {currentPath === "/products" && (
          <>
            <ScrollLink
              className="scroll-link"
              to="women"
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
            >
              Women
            </ScrollLink>
            <ScrollLink
              className="scroll-link"
              to="men"
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
            >
              Men
            </ScrollLink>
            <ScrollLink
              className="scroll-link"
              to="electronics"
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
            >
              Electronics
            </ScrollLink>
            <ScrollLink
              className="scroll-link"
              to="jewels"
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
            >
              Jewelery
            </ScrollLink>
          </>
        )}

        {currentPath !== "/products" && (
          <RouterLink to="/products">Products</RouterLink>
        )}
      </div>
    </nav>
  );
};

export default Nav;
