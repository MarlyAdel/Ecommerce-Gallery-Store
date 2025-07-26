import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
