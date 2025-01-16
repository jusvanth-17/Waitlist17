import React from 'react'
import './profile.css'
export default function Profile() {

  const handleLogout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("user")
    window.location.href='/login';
  }
  return (
    <div className='prof'>
      <br></br>

      <h1>Welcome </h1><br></br>
      <h2>User Name: {localStorage.getItem("name")}</h2><br></br>
      <button className='butn' onClick={handleLogout}>Log Out</button>
    </div>
  )
}