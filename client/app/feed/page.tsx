"use client";

import React, { useState, useContext} from 'react';

import { jwtDecode } from "jwt-decode";
import {GET_POST} from "../utils/queries";
import {useQuery} from '@apollo/client';




export default function Page() {
  //extract the author id from the query and compare it with the user id in the token 
//if the id's match then filter and map those posts under feed 
//grab the id from the token 
const token = localStorage.getItem('id_token');
//save the user _id  from the token to userId variable
var userId =0; 
//decode the token
if(token){
  const decodedToken:any = jwtDecode(token);
  userId = decodedToken.data._id; 
}

//get post 
const { loading, data } = useQuery(GET_POST);
    return <> <div className='list-group'>
   
  
     
      {/* filter the blogpost by user id  */}
     {data?.blogPosts?.filter((item: any)=>item.author._id === userId)
     .map((item: any ) => (
      <a className="list-group-item list-group-item-action" key={item._id}>
      <div className='d-flex w-100 justify-content-between'>
      <h5 className="mb-1">{item.title}</h5>
      <small>3 days ago</small>

      </div>
      <p className="mb-1">{item.content}</p>
  
      
      </a>
    ))}
  
  </div></> 
  }