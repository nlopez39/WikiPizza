'use client'
import { usePathname } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'

export  function NavLinks(){
 const pathname = usePathname(); 

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
        <Link className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard">
      Dashboard
      </Link>
        </li>
        <li className="nav-item">
        <Link className={`nav-link ${pathname === '/blogpost' ? 'active' : ''}`} href="/blogpost">
      Posts
      </Link>
        </li>
    
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
 )
}
