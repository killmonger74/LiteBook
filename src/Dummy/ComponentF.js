import React, { useContext } from 'react'
import {Usercontext} from '../App'
function ComponentF() {
    console.log("Componet F");
    const context = useContext(Usercontext)
    return (
        <div>
            COmponent F --{context.state}
            <button  onClick={()=>context.setstate(context.state+1)} >Press </button>
        </div>
    )
}

export default (ComponentF)
