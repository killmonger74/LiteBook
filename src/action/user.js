import * as api from '../api';
import jwt from 'jwt-decode';
export const signup=(signupdata,history)=>async(dispatch,state)=>{
    try
    {
        
       
      
       if(signupdata.firstname==="" || signupdata.lastname==="" || signupdata.email===""|| signupdata.confirmpassword==="")
       {
        throw new Error('Please fill out all the fields')
       }
       if(signupdata.password.length<6 )
       {
           throw new Error('Password Must be 6 Character long' );
       }
       let {data}=await api.signup(signupdata)
       
       dispatch({type:'POSTACTION',payload:data?.message})
   } 
   catch (error) {
       let errm={error}
       console.log(errm)
       let data=(errm.error.response?.data?.message)
       
      if(data===undefined)
          {
            data=errm.error.message;
          }
       console.log(data)
       dispatch({type:'ERROR',payload:data});
   }
}
export const signin=(signindata,history)=>async(dispatch,state)=>{   ///Email Validatation
    
    try
     {
         
        if(signindata.password.length<6 )
        {
            throw new Error('Password Must be 6 Character long' );
        }
        
        let {data}=await api.signin(signindata)
        let tok=jwt(data.token);
         data={...data,res:tok}
        dispatch({type:'LOGIN_APP',payload:data})
        history.push('/');
    } 
    catch (error) {
         let errm={error}
         console.log(errm);
         let data=(errm?.error?.response?.data?.message)
           console.log(data)
           if(data===undefined)
          {
            data=errm.error.message;
          }
          console.log(data)
         dispatch({type:'ERROR',payload:data});
         console.log(state);
       
    }

}
export const confirmmail=(token,history)=>async(dispatch)=>{
    try{
      let {data}=await api.confirmmail(token);
      console.log(data.message);
      dispatch({type:'POSTACTION',payload:data.message})
      history.replace('/login');
    }
    catch(error)
    { 
        let errm={error}
        console.log(errm)
        let data=(errm?.error?.response?.data?.message);
        if(data===undefined || data==null)
        {
        data=errm?.error?.message;
        }
        dispatch({type:"ERROR",payload:data})
        history.replace('/login');
    }
}

export const sendlink=(data1)=>async(dispatch)=>{
    try
    {
        console.log(data1)
        let {data}=await api.forgetpasscode(data1);
        console.log(data);
        dispatch({type:'POSTACTION',payload:data.message})
    }
    catch(error)
    {
        let errm={error}
        console.log(errm)
        let data=(errm?.error?.response?.data?.message);
        if(data===undefined || data==null)
        {
        data=errm?.error?.message;
        }
        dispatch({type:"ERROR",payload:data})
    }
}
export const changepassword=(data1,history)=>async(dispatch)=>{
    try
    {
        console.log(data1)
        let {data}=await api.changepasscode(data1);
        console.log(data);
        dispatch({type:'POSTACTION',payload:data.message})
        history.replace('/login')
    }
    catch(error)
    {
        let errm={error}
        console.log(errm)
        let data=(errm?.error?.response?.data?.message);
        if(data===undefined || data==null)
        {
        data=errm?.error?.message;
        }
        dispatch({type:"ERROR",payload:data})
    }
}