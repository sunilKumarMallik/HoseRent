import React from 'react'
import Footer from "../components/global-components/footer";
import Navbar from '../components/global-components/navbar'
import LoginOwner from './login';
// import LogIn from '../components/login';

function OwnerLogin() {
  return (
    <div>
        <Navbar /> 
      <LoginOwner/>
        <Footer />
    </div>
  )
}

export default OwnerLogin

// ./global-components/footer