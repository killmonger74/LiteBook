import React,{useEffect} from 'react'
import Posts from './../Post/Post'
import Form from './../Form/form'
import {connect} from 'react-redux'


function Home({setcurrentid,currentid,state}) {
    
  
    return (
        <>
        
             <Posts setcurrentid={setcurrentid} ></Posts>

             <Form currentid={currentid} setcurrentid={setcurrentid}/>
        
       </>
    
     )
    }

const mapStateToProps=state=>{
    
    return {
        state:state
    }
}

export default connect(mapStateToProps)(Home)
