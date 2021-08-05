import React,{useEffect, useState} from 'react'

import {useDispatch,useSelector} from 'react-redux';
import moment from 'moment';
import {deletePost,likepost,opendomportal} from '../../../action/post'
function Post({post,setcurrentid,loading}) {
    
    const dispatch= useDispatch();
    const state = useSelector(state => state?.loginreducer?.logininfo?.res)
   
    const[image,setImage] =useState(null)
    useEffect(() => {
        
        //You can make a backend request to the api to make the request for the apporiprate image regarding the ID ie post._id
        setImage(post.selectedfile);
    }, [])
    const [islike,setislike]=useState(false);

    const callfun=()=>{
      setcurrentid(post._id);
      dispatch(opendomportal);

    }
    const [isconfirm,setisconfirm]=useState(false)
    const Likes=({setislike})=>{
        
        useEffect(()=>{
            const ispostlike= post.likecount.find((like)=>like===((state?.id)||(state?.googleId)))
               if(ispostlike)setislike(true);
               else
                setislike(false);
        },[])

        if(post.likecount.length>0)
        {
            const ispostlike= post.likecount.find((like)=>like===((state?.id)||(state?.googleId)))
                
                if(ispostlike)
                {
                    
                    return <>{post.likecount.length>2 ?`You and ${post.likecount.length-1} others` :  `${post.likecount.length}  like`} </>
                        
                }
               else
                 
                 return  <>{post.likecount.length>1 ?` ${post.likecount.length} likes `:`${post.likecount.length}  like`}</>
        }
        else{
            
        return <>Like</>
        }
    }



    return (
        <>
        {isconfirm
          &&
          <div className='overlay'>
          <div className='Conformation-container'>
            <div className='Congif-Container'><h4>Are You Sure ? </h4></div>
            <div className='Config-Buttons'><button onClick={()=>setisconfirm(false)}>Cancel</button><button onClick={()=>dispatch(deletePost(post._id))}>Sure</button></div>
          </div>
          </div>
        }
          
            <div className='upperhalf'>
              
              <div className='absolute'>
                  <div className='Info'>
                      <h4>{post.name?post.name:"NONE"}</h4>
                      
                      <h6>{moment(post.createdAt).fromNow()}</h6>
                  </div>
                  <div className='edit'>
                  {(state?.id || state?.googleId)===post?.creator?
                      <button 

                      onClick={()=>{callfun()}}
                      
                      ><i class="fa fa-cog" aria-hidden="true"></i></button>:<></>}
                      
                      
                 </div>
                 
              </div>
             <div className='imageclass'> <img src={image} alt='image'></img></div> 
            </div>
            <div className='lowerhalf'>
                <div className='tags'>
                    {
                        post.tags?.length!=0?post.tags?.map((i,index)=>{
                            return <h6 key={index}>#{i}</h6>
                        }):<h6> # no tag</h6>
                       
                    }
                </div>
                <div className='VisitTitle'><h5>{post.title} </h5></div>
                <div className='Message'>
                    <p>{post.message}</p>
                </div>
                <div className='likes'>
                        <div className='like'><span onClick={()=>dispatch(likepost(post._id))}><i class={islike?'fa fa-heart':'fa fa-heart-o'} aria-hidden="true"></i></span><h6  className='animate_like'><Likes setislike={setislike} /></h6></div>
                         {(state?.id || state?.googleId)===post?.creator?<div className='delete'><h6 onClick={()=>setisconfirm(true)}>Delete</h6></div>:<></>}
                </div>
            </div>
        </>
    )
}

export default React.memo(Post)