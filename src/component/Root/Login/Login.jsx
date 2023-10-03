import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";




const Login = () => {
    const [loginError,setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
   
        //reset error
          setLoginError('');
           setSuccess('');
    
      
     if(password.length < 6) {
      setLoginError('Password should be at least six characters');
        return;
     }
     else if(!/[A-Z]/.test(password)){
      setLoginError('Your password should have at least one upper case characters.');
       return;
     }


  // add validation
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log(result.user)
      if(result.user.emailVerified){
      setSuccess('Login Successfully')
      }
      else{
        alert('Please verify your email')
      }
    })
    .catch(error => {
      console.error(error)
      setLoginError(error.message)
    })

    }
    
    const handleForgetPassword = () => {
      const email = emailRef.current.value;
      if(!email){
        console.log('Please provide an email', emailRef.current.value)
        return;
      }
     else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
     {
      console.log('Please write a valid email')
       return;
     }
     //send validation email
     sendPasswordResetEmail(auth, email)
     .then(()=>{
      alert('Please Check Your Email');
     })
     .catch(error =>{
      console.log(error);
     })
    }


    return (

        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Login Now!</h1>
            <p className="py-6"></p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">

            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>



              <input type="text" 
              placeholder="email" 
              ref={emailRef}
              name="email" required 
              id="" 
              className="input input-bordered" />


              </div>
           <div className="form-control">
             <label className="label">
               <span className="label-text">Password</span>
             </label>


         <input type="password" 
         placeholder="password" 
         name="password" 
         id="" required 
         className="input input-bordered" />


          <label className="label">
             <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>


              </label>
             </div>
             <div className="form-control mt-6">
              <button className="btn text-white bg-green-900">Login</button>
            </div>
            </form>
                    {
         loginError && <p className="text-red-700">{loginError}</p>
                   }
                  {
         success && <p className="text-green-700">{success}</p>
                  } 
                   
                   <p>New, pls visit <Link to="/register">Register</Link></p>


          </div>
          </div>
          </div>
          
        </div>
        ); 

    };
        

export default Login;


