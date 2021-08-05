import React, { useEffect, useState } from 'react'
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Header from './../Header/Header'
import {signin,signup as usersignup} from '../../action/user';
import {Link } from 'react-router-dom'
function Signup() {

    const history=useHistory();
    const dispatch=useDispatch();
    const inititalState={
        firstname:'',
        lastname:'',
        password:'',
        confirmpassword:'',
        email:''    
    }
    const [logindata,setlogindata]=useState(inititalState);
    const handlechange=(e)=>{
        
        setlogindata({...logindata,[e.target.name]:e.target.value})
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        
        dispatch(usersignup(logindata,history))
        
    }
    const emailerrors=dispatch((state)=>{
        return state?.loginreducer?.email_password_error
    })

   const init={
    password:false,
    confirmpassword:false
   }
    const [show,setshow]=useState(init);

    return (
        <>
        
       
        <div className='f-width'>
        <div className='Login-Form'>
            <div className="Circle"><h1>S</h1></div>
            <h5 className='variant'>SignUp</h5>
            <form className='Login-form' onSubmit={handlesubmit}>
           
                <div className='form-div'>
                    <label className='form-label'>First Name</label>
                    <input  name="firstname" autoFocus className='form-input' onChange={handlechange}autoFocus placeholder='jhon' ></input>
                    
                </div>
                <div className='form-div'>
                    <label className='form-label'>Last Name</label>
                    <input name="lastname"className='form-input'onChange={handlechange} placeholder='Doe'></input>
                    
                </div>
            
            <div className='form-div'>
                    <label className='form-label'>Email</label>
                    <input name="email"className='form-input' type='email'onChange={handlechange} placeholder='jhondeo@example.com' ></input>
                    
            </div>
            <div className='form-div'>
                    <label className='form-label'>Password</label>
                    <input name="password" className='form-input' type={!show.password?'password':'text'} onChange={handlechange}placeholder='*********' ></input>
                    {logindata.password.length>0?<span  className='passwordMarker'onClick={(e)=>{setshow({...show,password:!show.password})}} style={{position:'absolute'}}>{!show.password?'show':'hide'}</span>:null}
            </div>
            
            <div className='form-div'>
                <label className='form-label'>Repeat Password</label>
                <input name="confirmpassword" type={!show.confirmpassword?'password':'text'} className='form-input' onChange ={handlechange}placeholder='*********'></input>
                 {logindata.confirmpassword.length>0?<span  className='passwordMarker'onClick={(e)=>{setshow({...show,confirmpassword:!show.confirmpassword})}} style={{position:'absolute'}}>{!show.confirmpassword?'show':'hide'}</span>:null}
            </div>
            
            <div className='form-div submitbutton'>
              <input type='submit' className='form_button' value='Signup'></input>
                    
            </div>
            
            </form>
            <div className='links'>
           
            <Link to ='/login'>Login</Link>
            
            </div>
        </div>  
        </div>
        </>
        
    )
}

export default React.memo(Signup)