import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../assets/logo.jpeg";
import Menu from "../../assets/menu.png";
import Pic2 from "../../assets/pic2.png";
import { RootState } from "../../app";
import { logout } from "../../helpers/auth";
import { clearUserFromState } from "../../app/userSlice";
import UserLinks from "./UserLinks";
import AdminLinks from "./AdminLinks";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user?.user);
  const dispatch = useDispatch();
  const [menuToggle, setMenuToggle] = useState(false);
  const onResize = () => {
    const menuElement = document.querySelector(
      "#MenuItems"
    ) as HTMLUListElement;
    if (window.innerWidth >= 800) {
      menuElement.style.display = "block";
    }
    if (window.innerWidth <= 800) {
      menuElement.style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    const menuElement = document.querySelector(
      "#MenuItems"
    ) as HTMLUListElement;
    if (window.innerWidth <= 800) {
      if (menuElement) {
        toggleMenu(menuElement);
      }

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, [menuToggle]);

  const toggleMenu = (element: HTMLUListElement) => {
    if (element.style.display === "none") {
      element.style.display = "block";
      element.style.zIndex = "1000";
    } else {
      element.style.display = "none";
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(clearUserFromState());
  };

  return (
    <div className="navbar__background">
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <img src={Logo} width="125px" alt="Hellos" />
          </div>
          <nav>
            <ul id="MenuItems">
              <li>
                <NavLink exact={true} activeClassName="active-link" to="/">
                  Home
                </NavLink>
              </li>
              <AdminLinks />
              <UserLinks />
              {user && (
                <li>
                  <Link
                    // activeClassName="active-link"
                    onClick={handleLogout}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              )}

              {!user && (
                <li>
                  <NavLink activeClassName="active-link" to="/auth">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <img src={Pic2} width="30px" height="30px" alt="Hello" />
          <img
            src={Menu}
            className="menu-icon"
            width="30px"
            height="30px"
            alt="Hello"
            onClick={() => setMenuToggle(!menuToggle)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
