//this is the code that will output on the page, you can also import the blogpost component here 
//make a post
import {useState} from 'react';
import './style.css';
export default function Page(){

    return <div className='form-container'>
         <form className="form-horizontal"  role="form">
    <div className="mb-3">
      <label className="form-label">Title</label>
      <input type="title" className="form-control" id="titleInput" aria-describedby="titleHelp"/>
     
    </div>
    <div className="mb-3">
      <label className="form-label">Content</label>
      <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
    </div>
    
    <button type="submit" className="btn btn-primary">Post</button>
  </form>
    </div>
   
}