import React, { useEffect, useState } from 'react';
import {sendlink} from '../../action/user'
import {connect} from 'react-redux'
function ResetPasscode({sendlink})
{
    const [email,setemail]=useState(null)
    const handleSubmit=(e)=>{
        e.preventDefault()
        sendlink({email:email});
    }
    return(
        <div className='f-width'>
            <div className='Login-Form' style={{height:'60vh',justifyContent:'center'}}>
            <div className="Circle"><h1>P</h1></div>
            <h5 className='variant'>Enter Your Mail</h5>
            <form className='Login-form' onSubmit={handleSubmit}>
                <div className='form-div'>
                        <label className='form-label'>Email</label>
                        <input name="email"className='form-input' type='email'onChange={(e)=>{setemail(e.target.value)}} autoFocus placeholder='jhondeo@example.com ' />

                </div>
                <div className='form-div submitbutton'>
                     <input type='submit' className='form_button' value='Send Link'/>
                    
            </div>
            </form>
            </div>
        </div>
    )
}
const mapDispatchToProps=(dispatch)=>{
    return{
        sendlink:(data)=>dispatch(sendlink(data))
    }
}
export default connect(null,mapDispatchToProps)(ResetPasscode)