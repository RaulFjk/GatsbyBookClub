import React from "react"
import { Link } from "gatsby"

const SignedOutLinks = () => {
  
  return (
    <div>
      <Link to="/login" className="text-white hover:underline">Login</Link>
      <span className="text-white mx-1">|</span>
      <Link to="/register" className="text-white hover:underline" >Register</Link>
    </div>
  )
}

export default SignedOutLinks;
