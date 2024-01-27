import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { Button } from "@nextui-org/react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().catch((error) => console.log(error));
  };

  const handleMenuToggler = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="max-w-screen-2xl mx-auto px-4 xl:px-24">
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-2 text-2xl">Saleh</Link>

        <ul className={`md:flex gap-12 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <li><NavLink to="/">Start a search</NavLink></li>
          <li><NavLink to="/my-job">My Jobs</NavLink></li>
          {user ? (
            <li className="flex items-center">
              <span className="mr-2">{user.displayName || 'User'}</span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Log out
              </button>
              
            </li>
          ) : (
            <>
              <Button
               style={{
                backgroundColor: 'white', // White background
                color: 'rgba(0, 0, 0, 0.54)', // Google's text color
                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.25)', // Shadow effect
                fontWeight: 'bold', // Font weight as bold
                fontSize: '16px', // Font size
                border: 'none', // No border
                height: '40px', // Height of the button
                padding: '10px 24px', // Padding
                borderRadius: '4px', // Rounded border
              }}><NavLink to="/login">Log in</NavLink></Button>
            </>
          )}
        </ul>

        <button onClick={handleMenuToggler} className="md:hidden">
          {isMenuOpen ? <FaXmark className="w-5 h-5" /> : <FaBarsStaggered className="w-5 h-5" />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
