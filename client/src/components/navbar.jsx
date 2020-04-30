import React from 'react';
import { NavLink } from 'react-router-dom';
import Signout from '../components/auth/signout';

const Navbar = ({ session }) => {
  return (
    <nav>
      { session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}  
    </nav>
  )
}

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Sign In</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Sign Up</NavLink>
    </li>
  </ul>
)

const NavbarAuth = ({ session }) => (
  <>
    <ul>
      <li>
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/recipe/add">Add recipe</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <Signout>Sign Out</Signout>
      </li>
    </ul>
    <h4>Welcome, {session.getCurrentUser.username}</h4>
  </>
)

export default Navbar