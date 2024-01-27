import { Outlet } from 'react-router-dom'
import './App.css'
import { NextUIProvider } from "@nextui-org/react";
import Navbar from './components/Navbar';

function App() {


  return (
   
    <NextUIProvider  >
    <Navbar />
    <Outlet />
  </NextUIProvider>
);
}

export default App
