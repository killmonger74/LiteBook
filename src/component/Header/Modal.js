import React from 'react'
import {createPortal} from 'react-dom'
import Form from '../Form/form'
function Modal({isvisible,setfalse,currentid,setcurrentid,setvisible}) {
 
    
    if((currentid!=null && parseInt(window.innerWidth)<=800) || isvisible){
        
        return(
            createPortal(
                <div className='overlay'>
                    <div className='contain'>
                        <Form  currentid={currentid} setcurrentid={setcurrentid} />
                        <button className='modalbutton' onClick={()=>{setfalse()}}>X</button>
                    </div>
                </div>

                ,document.getElementById('rootportal')

            )
        )
    }
    else{
      
        return null;}
}

export default Modal
