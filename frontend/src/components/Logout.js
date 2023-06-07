import React from 'react'
import Navbar from './Navbar'

export default function Logout() {
    localStorage.removeItem("token");
    const host = "http://localhost:5000"
    React.useEffect(()=>{
        const func = async()=>{
            const response = await fetch(`${host}/api/auth/logout`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
        }

    })
  return (
    <div>
        
    </div>
  )
}
