
import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import Form from './Form';


const Login=()=>{
    const navigate=useNavigate();
    const [appError,setError]=useState('');
     async function formSubmit(value){
        await fetch("https://cbtserver-7gfq.onrender.com/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(value)
    }).then(async(response)=>{
        
        const msg=await response.json();
    
         navigate('/exams',{state:{msg}});
        

    }).catch(error=>{
        setError('Unable to Start Exam at the moment try again',
                
    )
    console.error(error)
    })

    }
const validateForm=(value)=>{
 if( !/[a-zA-Z]{6,12}/i.test(value.displayname)|value.displayname.length > 12){
    setError("Invalid Display Name")
}
else if(!/[0-9]{6}/.test(value.regId) | value.regId.length > 6){
    setError("Invalid Reg ID")
}
else{
    formSubmit(value)
}

}
const errorOn={
    display:"block"
}
const errorOff={
    display:"none"
}
return(
   <>

    <h2 className="login">Login to Get Started</h2>
    
    <div id="login" className="login-container">
    <div className="fa-user"><FaUserCircle /></div>
    <div className="error" style={appError ?errorOn:errorOff}> <p>{appError }</p></div>
    
    <section className="display-container">
       <p className="display-instruction">Display Name must contain Alphabet and must be of length 6-12  </p>
       <p className="reg-instruction">Reg ID  must be number of length 6</p>
    </section>
   <Form validate={validateForm}/>
   
</div>
</>
)
    }

export default Login;
