import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login =()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const handleLogin = async ()=>{
        console.warn("email,password", email.password)

        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/")
        }else{
            alert("Invalid email or password");
        }
        
        
    }

    return (
        <div className="mt-20">
        <h3 className="text-center text-3xl font-customSemiBold">Login</h3>
        <div className="w-2/5 mx-auto shadow rounded-md p-10 mt-5">
          
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded-md p-3 border-blue-300 mb-3" placeholder="enter email" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border rounded-md p-3 border-blue-300 mb-3" placeholder="enter password" />
            <button type="submit" onClick={handleLogin} className="text-center px-20 py-2 bg-blue-700 text-white rounded-md mx-auto block">Login</button>
        </div>
    </div>
    )
}

export default Login;