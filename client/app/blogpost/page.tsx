//this is the code that will output on the page, you can also import the blogpost component here 
//make a post
"use client";
import { jwtDecode } from "jwt-decode";
import React, { useState, useContext} from 'react';
import './style.css';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
import {GET_POST} from '../utils/queries';
export default function Page(){


// Decode the token to retrieve userId
const token = localStorage.getItem('id_token'); // Retrieve the token from local storage or wherever you store it
var userId =0; 
if(token){
    const decodedToken: any = jwtDecode(token);
  console.log("decodedToken", decodedToken);
  userId = decodedToken.data._id; // Access the 'userId' claim from the decoded token
  console.log("usr", userId);
}
  const [formState, setFormState]  = useState({title:"", content:""});
  //the refetchquery is an Apollo Client method that will help the UI reload with the new query that was just created- it refetches queries from the server
  const [addBlogPost, {error}] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POST]
  });
  //this will allow us to map the new post under the create new post box
  const { loading, data } = useQuery(GET_POST);
    console.log("usrId", userId);
  const handleFormChange =(event: React.ChangeEvent<HTMLTextAreaElement>) =>{
    const {name, value} = event.target; 
    setFormState({
      ...formState,
      [name]: value,
    })
  }
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault(); 
    try{
      //send the variables to the addBlogPost mutation function 
      const { data } = await addBlogPost({
        variables: { ...formState },
      });
    
      console.log("DATA", data);
      
    }catch(e){
      console.log(e);
    }
  };
  

    return<>
    <div className='form-container'>
         <form onSubmit={handleFormSubmit} className="form-horizontal"  role="form">
    <div className="mb-3">
      <label className="form-label">Title</label>
      <textarea onChange={handleFormChange} name="title" className="form-control" id="titleInput" aria-describedby="titleHelp"/>
      <p>Hello this is a test that formstate Works: {formState.title}</p>
     
    </div>
    <div className="mb-3">
      <label className="form-label">Content</label>
      <textarea onChange={handleFormChange} name="content" className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
    </div>
    
    <button type="submit" className="btn btn-primary">Post</button>
  </form>
    </div>
    <div>
      <h2>Hello </h2>
       <ul>
        <li>yum</li>
        {/* filter the blogpost by user id  */}
       {data?.blogPosts?.filter((item: any)=>item.author._id === userId)
       .map((item: any ) => (
        <li key={item._id}>{item.title}</li>
      ))}
    </ul>
    </div>
   
    </>
    
    

   
}