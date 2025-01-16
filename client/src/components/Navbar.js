import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = () => {
    

  return (
    <div> <header className="header">
    <h1> Iphone Waitlist</h1>
    <nav>
      <ul className="nav-links">
        
          <Link to="/">Home</Link>
        {localStorage.getItem("name") &&<Link to='/profile'>Profile</Link>}
        {localStorage.getItem("name") &&<Link to='/leaderboard'>Leaderboard</Link>}
        {!localStorage.getItem("name") &&<Link to='/login'>Login</Link>}
        {!localStorage.getItem("name") &&<Link to='/signup'>SignUp</Link>} 

      </ul>
    </nav>
  </header>
</div>

  )
}
