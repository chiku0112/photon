import React from "react";
import AppBar from "./AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import NavigationDrawer from "./NavigationDrawer";
const Layout = ({ children }) => {
  return (
    <>
      <div>
        <AppBar />
      </div>
      <div className="menu-icon">
        {/* <MenuIcon /> */}
        <NavigationDrawer />
      </div>
      <main>{children}</main>
      <footer>
        <span>
          {" "}
          Created with ♥ by{" "}
          <a
            href="https://github.com/chiku0112"
            target="blank"
            style={{ color: "black", textDecoration: "underline" }}
          >
            {" "}
            Ayushi Dubey{" "}
          </a>
        </span>
      </footer>
    </>
  );
};

export default Layout;
