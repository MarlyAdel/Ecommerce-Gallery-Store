import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Gallery from './Components/Gallery/Gallery'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'

function App() {
  
  const routes = createBrowserRouter([
    {path:"" , element:<Layout/> , children: [
      {index:true , element:<Home/>},
      {path:"gallery" , element:<Gallery/>},
      {path:"cart" , element:<Cart/>},
      {path:"productdetails/:id" , element:<ProductDetails/>},
      {path:"*" , element:<NotFound/>
      }
    ]}
  ])

  return (
    <>
      <RouterProvider router={routes} />

      <ToastContainer />
    </>
  );
}

export default App
