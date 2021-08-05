import React from 'react'
import Post from './post/Post'
import {useSelector} from 'react-redux';
import {connect}from 'react-redux'
import Loader from './Loader'
function Posts({currentid,setcurrentid,isloading,postlength}) {
    
    const posts=useSelector((state)=>{  return state.posts})
      console.log(isloading)
       return (
              <>
              
              <div className='SmallContainers'>
                  {posts?.map((post)=>(
                      <div className='smallinside' key={post._id}>
                          <Post post={post} setcurrentid={setcurrentid} loading={true}/>
                      </div >
                  ))}
                  {isloading && <Loader />}
                {/* <div className='smallinside Error-Controls danger'><h5>No More Post Found!</h5></div> */}
                {!isloading && postlength===0 &&<Loader notfound={true}/>}
                </div>
              </>
    )
}
const mapStateToProps=state=>{
    return{
     isloading:state.isloading,
     postlength:state.posts.length
    }
}
export default connect(mapStateToProps) (Posts)
