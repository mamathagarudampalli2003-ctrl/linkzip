import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function AcceptInvite() {

 const { token } =
  useParams();

 const [loading,setLoading] =
  useState(false);

 const acceptInvite =
 async ()=>{

  try{

   setLoading(true);

   const jwt =
    localStorage.getItem(
      "token"
    );

   const res =
    await axios.post(

     `http://localhost:8000/api/team/invite/accept/${token}`,

     {},

     {
      headers:{
       Authorization:
       `Bearer ${jwt}`
      }
     }

    );

   alert(
    res.data.message
   );

  }catch(err){

   alert(
    err.response?.data?.message
   );

  }finally{

   setLoading(false);

  }

 };

 return (

  <div className="p-10">

   <h1 className="text-3xl font-bold">

    Team Invitation

   </h1>

   <button

    onClick={acceptInvite}

    className="
     bg-green-500
     px-6
     py-3
     rounded
     mt-5
    "

   >

    {
      loading
      ? "Joining..."
      : "Accept Invite"
    }

   </button>

  </div>

 );

}