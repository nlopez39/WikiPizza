import './style.css'
import Link from 'next/link'
export default function Page(){
    return <div className='form-container'>
    <form className="form-horizontal"  role="form">
    <div className="mb-3"> <h1>Log In</h1>
        </div>  
<div className="mb-3">
<label className="form-label">Email address</label>
  <input type="email" className="form-control" name="email" placeholder="name@example.com"/>
</div>
<div className="mb-3">
 <label className="form-label">Password</label>
 <input type="password" name="password" className="form-control" placeholder='*********' />
</div>

<button type="submit" className="btn btn-primary">Log In</button>
<p className="mt-2">
                  Don't have an account? <Link href="/signup">Register</Link>
                </p>
</form>
</div>

}