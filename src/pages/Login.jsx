import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  // Get function from auth context to sign in user with gmail 
  const { signUpWithGmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    signUpWithGmail()
      .then(_result => {
       // If user credetails are valid then take user to home page
        navigate('/');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
          <h3 className="text-xl font-semibold mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h3>
          <div className="flex justify-center">
          <Button
      auto
      onClick={handleGoogleAuth}
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
      }}
      >
      Google
    </Button>
          </div>
          <div className="mt-8 text-center">
            <button
              className="text-blue-500 hover:text-blue-800 text-sm"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
          </div>
       </div>
      </div>
    </div>
  );
};


export default Login;
