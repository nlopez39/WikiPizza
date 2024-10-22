"use client";
import './style.css'
import React, {useState} from 'react'

import Link from 'next/link'
//this will import authentication methods from auth.js
import Auth from '../utils/auth'
//add mutation queries from graphQL
import { useMutation } from "@apollo/client"
//import the login mutation from graphql
import {LOGIN_USER} from "../utils/mutations"


export default function Page(){
//email and password are initially set as empty strings
const [formState, setFormState] = useState({email:"", password:""});
//login is used to trigger the mutation and error will contain errors occurred during the mutation and data will store the result of a successful login 
const[login, {error, data}]= useMutation(LOGIN_USER);

//handle the form input changes 
const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
  //event.target contains the input element that triggered the event from which the name and value properties are extracted 
  const {name, value} = event.target;
  //name: name of the input field in this case 'email' or 'password'
  //value: the current value entered in the input field
  //function called to update formState, it keeps the prev. values using the spread operator and updates the specific field "name" that triggered the change 
  setFormState({
    ...formState, 
    [name]:value,
  });
};

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
event.preventDefault(); 
console.log("this worked 1");
try{
  //send the variables to the login mutation function 
  const { data } = await login({
    variables: { ...formState },
  });
  console.log("this worked 2");
  console.log(data);
  //store the login token into localstorage
  Auth.login(data.login.token);
}catch(e){
  console.log(e);
}
};





    return <div className='form-container'>
    <form onSubmit={handleFormSubmit}
    className="form-horizontal"  role="form" >
    <div className="mb-3"> <h1>Log In</h1>
        </div>  
<div className="mb-3">
<label className="form-label">Email address</label>
  <input onChange={handleFormChange} type="email" className="form-control" name="email" placeholder="name@example.com"/>
  <p>Hello this is a test that formstate Works: {formState.email}</p>
</div>
<div className="mb-3">
 <label className="form-label">Password</label>
 <input onChange={handleFormChange}
 type="password" name="password" className="form-control" placeholder='*********' />
</div>

<button type="submit" className="btn btn-primary">Log In</button>
<p className="mt-2">
                  Don't have an account? <Link href="/signup">Register</Link>
                </p>
</form>
</div>

}