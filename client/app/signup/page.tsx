import Link from "next/link"
export default function Page(){
    return <div className='form-container'>
        
    <form className="form-horizontal"  role="form">
      <div className="mb-3"> <h1>Create an Account</h1>
        </div>  
   
    <div className="mb-3">
<label className="form-label">First Name</label>
  <input type="firstname" className="form-control" name="firstname"/>
</div>
<div className="mb-3">
<label className="form-label">Last Name</label>
  <input type="lastname" className="form-control" name="lastname"/>
</div>
<div className="mb-3">
<label className="form-label">Email address</label>
  <input type="email" className="form-control" name="email" placeholder="name@example.com"/>
</div>
<div className="mb-3">
 <label className="form-label">Password</label>
 <input type="password" id="inputPassword5" className="form-control" />
<div id="passwordHelpBlock" className="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>

</div>

<button type="submit" className="btn btn-primary">Register</button>
<p className="mt-2">Already have an account? <Link href="/login">Login</Link></p>
</form>
</div>
}