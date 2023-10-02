import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebase/firebase.config";
import { useState } from "react";


const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShaowPassword] = useState(false);


    const handleRegister = e => {
        e.preventDefault();
        console.log("yes");
       const email = e.target.email.value;
       const password = e.target.password.value;
       console.log(email, password);

            //reset error
            setRegisterError('');
            setSuccess('');
     
       
      if(password.length < 6) {
        setRegisterError('Password should be at least 6 characters');
         return;
      }
      else if(!/[A-Z]/.test(password)){
        setRegisterError('Your password should have at least one upper case characters.');
        return;
      }
  
           //create user 
   createUserWithEmailAndPassword(auth, email, password)
   .then(result => {
    console.log(result.user);
    setSuccess('User Created Successfully');
   })
   .catch(error => {
    console.error(error);
    setRegisterError(error.message);
   })
    }



    return (
       
   
    <div>
    <div className="mx-auto md:w-1/2">
        
    <h2 className="text-xl text-green-900 font-bold">Register Please</h2> 
    <form onSubmit={handleRegister}>

    <input className="bg-slate-100 w-3/4 py-2 px-4 mt-2"  
    type="email" 
    placeholder="Email Address" 
    id="" required 
    name="email"/>

    <br/>
    <input  
    className="bg-slate-100 w-3/4 py-2 px-4 mt-2" 
    type="password" 
    placeholder="Password" 
    id="" required 
    name="password" />

    <span>Show</span>
    
    <br/>

    <input  className="btn bg-green-900 text-white px-9 rounded-md mt-2" 
    type="submit" value="Register" id=""/>

   </form>
   {
    registerError && <p className="text-red-700">{registerError}</p>
   }
   {
    success && <p className="text-green-700">{success}</p>
   }

   </div>
   </div>

    );
};

export default Register;