import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebase/firebase.config";
import { useState } from "react"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShaowPassword] = useState(false);


    const handleRegister = e => {
        e.preventDefault();
        console.log("yes");
       const email = e.target.email.value;
       const password = e.target.password.value;
       const accepted = e.target.terms.checked;
       console.log(email, password, accepted);

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

      else if(!accepted){
        setRegisterError('Please accept our terms and conditions!');
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
     <div className="relative">
        <input  
          className="bg-slate-100 w-3/4 py-2 px-4 mt-2" 
          type={showPassword ? "text" : "password"}
          placeholder="Password" 
          id="" required 
          name="password" />

          <span className="absolute top-4 right-48" onClick={() => setShaowPassword(!showPassword)}>
          {
            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
          }
          </span>
    
     </div>

    <br/>

    <input className="ml-40 mr-2 " type="checkbox" name="terms" id="terms"/>
    <label className="textarea" htmlFor="terms">Accept our <a href="#">Terms and Condition</a></label>

    <br/>

    <input  className="btn bg-green-900 text-white px-9 rounded-md mt-2 w-3/4" 
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