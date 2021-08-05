import * as api from '../api';

//action creator the function that return action statess

export const getpost = (png) => async (dispatch,state)=>{
    try {
        
        dispatch({type:'LOADING'});
        
        const post=await api.fetch_data(png);
        dispatch({type:'FETCH_ALL',payload:post.data});
        dispatch({type:'DONELOADING'});
      
    }
     catch (error) 
    {
         let errm={error}
         let data=(errm?.error?.response?.data?.message);
         if(data===undefined || data==null)
         {
            data=errm?.error?.message;
         }
        dispatch({type:'DONELOADING'});
        dispatch({type:'ERROR',payload:data});
         
    }
}
export const opendomportal=()=>
{
      let p=document.getElementById('rootportal');
      let p1=p.classList;
      p1.add('my-class');
}

export const closedomportal=()=>
{
      let p=document.getElementById('rootportal');
      let p1=p.classList;
      p1.remove('my-class');
}




export const onepost=(png) => async (dispatch,state)=>{
    try {
        dispatch({type:'LOADING'});
        const post=await api.fetch_data(png);
        dispatch({type:'FETCH_SUB',payload:post.data});
        dispatch({type:'DONELOADING'});
    }
     catch (error) 
    {
       
        console.log(`${error}`);
    }
}

export const createpost=(post)=>async(dispatch)=>{
    try 
    {
        const {data}=await api.createpost(post);
        dispatch({type:'CREATE',payload:data})
        closedomportal();
        dispatch({type:"POSTACTION",payload:'Post Create Successfully'})

    }
    catch(error)
    {
        ////For Displaying the error in the UI is main moto after the session is  completed
        
        dispatch({type:'DONE'});
        dispatch({type:'ERROR',payload:error});
    }
}
export const updatepost =(id,post)=>async(dispatch)=>{
    try
    {
       const {data}= await api.updatePost(id,post);
        dispatch({type:'UPDATE',payload:data});
         closedomportal();
        dispatch({type:"POSTACTION",payload:'Post Updated Successfully '})
    }
    catch(error){
        dispatch({type:'DONE'});
        dispatch({type:'ERROR',payload:error});
    }
} 
export const deletePost=(id)=>async(dispatch)=>{
    try{
        await api.deletePost(id)
        dispatch({type:'DELETE',payload:id});
        dispatch({type:"POSTACTION",payload:'Post Deleted Successfully '})
    }
    catch(error)
    {   
        dispatch({type:'DONE'});
        dispatch({type:'ERROR',payload:error});
    }
}
export const likepost= (id)=>async(dispatch)=>
{
    try {
    const {data}= await api.likePost(id);
    
    dispatch({type:'LIKE',payload:data});
    } 
    catch (error) {
        let errm={error}
        if(errm.error.response.status===400)
        {
            let data=(errm.error.response.data.message)
            dispatch({type:'ERROR',payload:`${data} Please Login To Continue`})
            dispatch({type:'LOGOUT'})
        }
        else{
            dispatch({type:'ERROR',payload:errm})
        }
    }
}