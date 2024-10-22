"use client";
import Link from "next/link"
import './style.css'
import React, {useState} from 'react'
import Auth from '../utils/auth'
import {useMutation} from '@apollo/client'
import { SIGNUP_USER } from "../utils/mutations";


export default function Page(){
  //set form state 
const [formState, setFormState] = useState({firstname:"", lastname:"", email:"", password:""});
//set mutation state
const[signup, {error, data}] = useMutation(SIGNUP_USER);

//handle form state, save those variables 
const handleFormChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
  const {name, value} = event.target;

  setFormState({
    ...formState, 
    [name]:value,
  })
};

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault(); 
  try{
 const {data} = await signup({
  variables:{...formState},

 });
 console.log(data);
 //store signup token into localstorage
 Auth.login(data.signup.token);
  }catch(e){
    console.log(e);
  }
};
    return <div className='form-container'>
        
    <form onSubmit={handleFormSubmit} className="form-horizontal"  role="form">
      <div className="mb-3"> <h1>Create an Account</h1>
        </div>  
   
    <div className="mb-3">
<label className="form-label">First Name</label>
  <input onChange={handleFormChange} type="firstname" className="form-control" name="firstname"/>
</div>
<div className="mb-3">
<label className="form-label">Last Name</label>
  <input onChange={handleFormChange} type="lastname" className="form-control" name="lastname"/>
</div>
<div className="mb-3">
<label className="form-label">Email address</label>
  <input onChange={handleFormChange} type="email" className="form-control" name="email" placeholder="name@example.com"/>
</div>
<div className="mb-3">
 <label className="form-label">Password</label>
 <input onChange={handleFormChange} type="password" id="inputPassword5" name="password" className="form-control" />
<div id="passwordHelpBlock" className="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>

</div>

<button type="submit" className="btn btn-primary">Register</button>
<p className="mt-2">Already have an account? <Link href="/login">Login</Link></p>
</form>
</div>
}