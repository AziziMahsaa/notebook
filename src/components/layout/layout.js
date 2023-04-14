import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar>Header</Navbar>
      {children}
      <Footer>Footer</Footer>
    </div>
  );
}

export default Layout;
