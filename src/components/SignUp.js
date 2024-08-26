import { useEffect } from 'react';
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';


const SignUp =()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // register api call
    const handleSubmit = async () => {
        console.warn(name,email,password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json()
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/")
    }

     // Check if user is already logged in and redirect to home page if true
     useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
          navigate("/")
        }
      })
    return (
        <div className="mt-20">
            <h3 className="text-center text-3xl font-customSemiBold">Register</h3>
            <div className="w-2/5 mx-auto shadow rounded-md p-10 mt-5">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded-md p-3 border-blue-300 mb-3" placeholder="enter name" />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded-md p-3 border-blue-300 mb-3" placeholder="enter email" />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border rounded-md p-3 border-blue-300 mb-3" placeholder="enter password" />
                <button type="submit" onClick={handleSubmit} className="text-center px-20 py-2 bg-blue-700 text-white rounded-md mx-auto block">Register</button>
            </div>
        </div>
    )
}

export default SignUp;
