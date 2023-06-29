import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import storage from "../apiServices.js/storage";
let publicUrl = process.env.REACT_APP_PUBLIC_URL ;;

function Sidebar() {
  const history = useHistory();
  return (

<div>
<nav role="navigation">
    <div id="menuToggle">

      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul id="menu">
      <Link to="/admin">  <a href="#"> <li><i className="fas fa-user-circle-o" id='Aicons'></i>Home</li></a></Link>
      <Link to="/owner-Details"> <a href="#"><li><i className="fas fa-home"  id='Aicons'></i>Houses</li></a></Link>
       <Link to="/customer-Details"><a href="#"><li><i className="fas fa-users" id='Aicons'></i>Tenants</li></a></Link> 
       <Link><a href="#"><li onClick={() => { storage.clearAll(); history.push('/login') }}>
       <i className="fas fa-sign-out-alt" id='Aicons'></i>Log out</li></a></Link> 
      </ul>
    </div>
  </nav>
  </div>
  )
}
export default Sidebar