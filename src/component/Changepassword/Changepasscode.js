import React, { useEffect, useState } from 'react';
import {changepassword} from '../../action/user'
import {connect} from 'react-redux'
import {useHistory} from 'react-router';
function ChangePasscode(props)
{
    const [email,setemail]=useState(null)
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(state?.password!==state?.confirmpassword)
        {
            props.passworderror();
        }
        else
        {
            if(token==null || token===undefined)
            {
                props.tokenerror();
            }
            else
            {
                  setstate({...state,token:token})
                  props.changepassword(state,history);
            }
        }
    }


    const history=useHistory();
    const initialstate={
        password:'',
        confirmpassword:''
    }
    const [token,settoken]=useState(null);
    useEffect(() => {
       if(props.match.path=='/reset/change/:token')
       {
             settoken(props.match.params.token)    
       }
    }, [])
    const [state,setstate]=useState(initialstate);
    const handlechange=(e)=>{
        setstate({...state,[e.target.name]:e.target.value})
    }
    return(
        <div className='f-width'>
            <div className='Login-Form'>
            <div className="Circle"><h1>P</h1></div>
            <h5 className='variant'>Reset Password</h5>
            <form className='Login-form' onSubmit={handleSubmit}>
                <div className='form-div'>
                    <label className='form-label'>Password</label>
                    <input name="password" className='form-input' type='password' onChange={handlechange}placeholder=' ' ></input>
                    
            </div>
            <div className='form-div'>
                <label className='form-label'>Repeat Password</label>
                <input name="confirmpassword" type='password' className='form-input' onChange ={handlechange}placeholder=' '></input>
                
            </div>
            
                <div className='form-div submitbutton'>
                     <input type='submit' className='form_button' value='Change Password'/>
                    
            </div>
            </form>
            </div>
        </div>
    )
}
const mapDispatchToProps=(dispatch)=>{
    return{
        changepassword:(data,history)=>dispatch(changepassword(data,history)),
        passworderror:()=>dispatch({type:'ERROR',payload:'Password didnt match'}),
        tokenerror:()=>dispatch({type:'ERROR',payload:'Please Check the mail and click link'}),
           
    }
}
export default connect(null,mapDispatchToProps)(ChangePasscode)