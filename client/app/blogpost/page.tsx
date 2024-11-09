//this is the code that will output on the page, you can also import the blogpost component here 
//make a post
"use client";
import React, { useState} from 'react';
import './style.css';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
export default function Page(){

  const [formState, setFormState]  = useState({title:"", content:""});
  const [addBlogPost, {error, data}] = useMutation(CREATE_POST);
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
  

    return <div className='form-container'>
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
   
}