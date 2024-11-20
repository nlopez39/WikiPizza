'use client';
import React, {MouseEvent,useState, useEffect} from 'react';
import { usePathname } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
//this will import authentication methods from auth.js
import Auth from '../utils/auth'


export  function NavLinks(){
 const pathname = usePathname(); 
  // got a hydration error: Text content does not match server-rendered HTML, needed to add a useEffect 
  const [isClient, setIsClient] = useState(false);
  useEffect(()=>{
    setIsClient(true);
  }, [])
   // Check if we're on the client (since window is not available server-side)
  const isLoggedIn = typeof window !== 'undefined' ? Auth.loggedIn() : false;
  console.log("Is user logged in? ", isLoggedIn);

 const logout = (event: MouseEvent) =>{
  event.preventDefault(); 
  console.log("User is logging out..."); // Log the logout action
  if (typeof window !== 'undefined') {
    Auth.logout();
  }
 
 }

 return (
    // <nav>
    //   <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
    //     Home
    //   </Link>
 
    //   <Link
    //     className={`link ${pathname === '/dashboard' ? 'active' : ''}`}
    //     href="/dashboard"
    //   >
    //     Dashboard
    //   </Link>
    // </nav>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Image src="/images/pizzaMain.png" className="rounded mx-auto d-block" alt="logo" width={80} height={80}/>
  <Link className="navbar-brand" href="/">WikiPizza</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
     
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
        <Link className={`nav-link ${pathname === '/create' ? 'active' : ''}`} href="/create">
       Create
      </Link>
        </li>
        <li className="nav-item">
        <Link className={`nav-link ${pathname === '/feed' ? 'active' : ''}`} href="/feed">
      Feed
      </Link>
        </li>
        <li className="nav-item">
        <Link className={`nav-link ${pathname === '/popular' ? 'active' : ''}`} href="/popular">
      Popular
      </Link>
        </li>
      
      </ul>
     
      
      {/* <form className="d-flex me-auto" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
      {isLoggedIn && isClient ? 
       <Link onClick={logout} className={`nav-link ${pathname === '/' ? 'active' : ''}`}href="/">
    Logout
      </Link> :   <Link className={`nav-link ${pathname === '/login' ? 'active' : ''}`} href="/login">
    Sign Up / Log In
      </Link>}
    </li>
   
      </ul>
    </div>
  </div>
</nav>
 )
}
