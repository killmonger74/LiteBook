import React, { useEffect, useState } from 'react'
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Header from './../Header/Header'
import {signin,signup as usersignup} from '../../action/user';
import {Link } from 'react-router-dom'
function Login() {

    const history=useHistory();
    const dispatch=useDispatch();
    const [googlefailure,setgooglefailure]=useState(false);
    const inititalState={
        
        password:'',
        email:''    
    }
    const [logindata,setlogindata]=useState(inititalState);
    const handlechange=(e)=>{
        
        setlogindata({...logindata,[e.target.name]:e.target.value})
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        
            dispatch(signin(logindata,history));
       
    }
    const emailerrors=dispatch((state)=>{
        return state?.loginreducer?.email_password_error
    })

    const successgoogle=(data)=>{
        const res=data?.profileObj;
        const token=data?.tokenId;
        try {
            dispatch({type:"LOGIN_APP",payload:{res,token}})
            history.push('/');
        } catch (error) {
            alert("error Occured    ")
        }
        console.log(data);
    }
    const failuregoogle=()=>{
        setgooglefailure(true);
        console.log("Failed")
    }
    const [show,setshow]=useState(false);
    return (
        <>
        
        
        <div className='f-width'>
        <div className='Login-Form'>
            <div className="Circle"><h1>S</h1></div>
            <h5 className='variant'>Sign In</h5>
            <form className='Login-form' onSubmit={handlesubmit}>
           
            <div className='form-div'>
                    <label className='form-label'>Email</label>
                    <input name="email"className='form-input' type='email'onChange={handlechange} autoFocus placeholder='jhondeo@example.com' ></input>
                    
            </div>
            <div className='form-div'>
                    <label className='form-label'>Password</label>
                    <input name="password" className='form-input' type={!show?'password':'text'} onChange={handlechange}placeholder='password' ></input>
                    {logindata.password.length>0?<span  className='passwordMarker'onClick={()=>{setshow(!show)}} style={{position:'absolute'}}>{!show?'show':'hide'}</span>:null}
            </div>
            
            <div className='form-div submitbutton'>
              <input type='submit' className='form_button' value='Signin'></input>
                    
            </div>
            <GoogleLogin 
                clientId="742968091499-t6ve1l3grf4tc4l45j22docjpr9gf8hh.apps.googleusercontent.com"
                render={(renderprops)=>(
                    <div className='form-div submitbutton'>
                      <input type='button' className='form_button'  value='Google Sign In'  onClick={renderprops.onClick} ></input>
                   </div>
                )}
                onSuccess={successgoogle}
                onFailure={failuregoogle}
                cookiePolicy="single_host_origin"
            />
            </form>
            <div className='links'>
           
            <Link to ='/signup'>Get a account! </Link>
             <Link to='/reset/forget'>forget password ?</Link> 
            </div>
        </div>  
        </div>
        </>
        
    )
}

export default React.memo(Login)
