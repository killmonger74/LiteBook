
import React,{useState,useEffect} from 'react'
import { createPortal } from 'react-dom';
import FileBase from 'react-file-base64';
import{ useDispatch,useSelector }from 'react-redux'
import {createpost,updatepost} from '../../action/post'
import {connect} from 'react-redux'

function Form({ currentid,setcurrentid}) {
    // console.log(`post via connect ${postadd}`);
    const [isvisible,setvisible]=useState(true);
    
    const dispatch=useDispatch();
    const posts=useSelector((state)=>currentid?state.posts.find((p)=>p._id===currentid):null);
    const Add_done=useSelector((state)=>state.postsucess);
    console.log(Add_done);
    const clear=()=>{
        setcurrentid(null)
        setpost(initstate)}
    const username=useSelector((state)=>state.loginreducer?.logininfo?.res?.name)
    

    const initstate={
        title:"",
        message:'',
        tags:'',
        selectedfile:'',
        selectedfilename:''
    };
    if(Add_done===true)
    {
        setTimeout(()=>{
            setvisible(false)
        },10000)
    }
    const [post, setpost] = useState(initstate);


    useEffect(()=>{
        if(posts)setpost(posts)
    },[posts])
    
    
    const [error, seterror] = useState(false)
    const handlesubmit=(e)=>{
        e.preventDefault();

        if(currentid)
        {
            
           
            if(!post.title  ||!post.message || !post.tags ||!post.selectedfile)
            {
                seterror(true);
            }
            else
            {
                dispatch(updatepost(currentid,{...post,name:username}));
                clear();
            }
            
        }
        else{

            if(!post.title ||!post.message || !post.tags ||!post.selectedfile)
            {
                seterror(true);
            }
            else
            {
                dispatch(createpost({...post,name:username}));
                clear();
            }
        }
    }
    const removeerror=()=>{
        seterror(false)
    }
    const handlemessage=(e)=>
    {
        setpost({...post,message:e.target.value});
    }
    const handletags=(e)=>
    {
        
       let newarr=e.target.value.split(',');
        setpost({...post,tags:newarr});
    }
    const handletitle=(e)=>
    {
        setpost({...post,title:e.target.value});
    }
    const rootportalclose=()=>{
        let p=document.getElementById('rootportal');
        let p1=p.classList;
        p1.remove('my-class');
    }
    
    
    const Formheader=()=>{
        return(
            <div>
                <h4>{currentid?'Edit':'Create'} a Post</h4>
                
            </div>
        )
    }
    return (
        createPortal(
        <>
        <h4 onClick={()=>{rootportalclose()}}>Click This Area to Dismiss</h4>
        <div className='editable'>
            <div className='form'>
                <Formheader />
                <form onSubmit={handlesubmit}>
                    
                    <div className='form-div'>
                        <label className='form-label'>Title</label>
                        <input className='form-input' placeholder='Title' value={post.title} onFocus={removeerror} onChange={(handletitle)}></input>
                        
                    </div>
                    
                    <div className='form-div'>
                        <label className='form-label'>Message</label>
                        <textarea className='form-input 'placeholder='eg:something you like' value={post.message} onFocus={removeerror}  onChange={handlemessage}></textarea>
                        
                    </div>
                    <div className='form-div'>
                        <label className='form-label'>Tags</label>
                        <input className='form-input'placeholder='eg:games,party' value={post.tags} onFocus={removeerror}   onChange={handletags}></input>
                        
                    </div>
                    <div className='form-div'>
                        
                        <FileBase type='file' onFocus={removeerror}   multiple={false} onDone={({base64})=>setpost({...post,selectedfile:base64})}/>
                        {/* <FileBase type='file'   multiple={false} onDone={(k)=>setpost({...post,selectedfilename:k.name,selectedfile:k.base64})}/> */}
                    </div>
                    <div className='form-div'>
                          <input type='submit' className='form_button' value='Submit'></input>
                          <input type='button' className='form_button clear' value='Clear' onClick={clear}></input>
                    </div>

                       {error && <div className='form-div' id='error'> Please Fill all the Fields</div> } 
                   
               </form>
            </div>
        </div>
        </>
    ,

    document.getElementById('rootportal')) )
}
const mapStateToProps=state=>{
    return {
        postadd:state.postsuccess
    }
}
export default connect(mapStateToProps)(Form)
