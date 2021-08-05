import React, { useState,useEffect } from 'react';
import { useLocation,useHistory} from 'react-router';
import { Link } from 'react-router-dom';
import Login from '../Login/login';
import { confirmmail } from '../../action/user';
import { connect } from 'react-redux';
import Loader from '../Post/Loader';
const Confirm = (props)=>{
  
    const history=useHistory();
    useEffect(() => {
       if(props.match.path=='/confirm/:code')
       {
            props.confirm(props.match.params.code,history)
            
       }
    }, [])

    return (
        <div className='SmallContainers confirm' >
            <div>
                <h4>Please wait while we are confirming your token</h4>
                
            </div>
       </div>
    )
}
const mapDispatchToProps=(dispatch)=>{
   return{ confirm:(token,history)=>dispatch(confirmmail(token,history))}
}
export default connect(null,mapDispatchToProps)(Confirm);