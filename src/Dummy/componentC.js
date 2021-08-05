import React,{useContext} from 'react'
import {Usercontext} from '../App'
function ComponentC() {
    
    console.log("Componet C");
    const context = useContext(Usercontext)
    return (
        <div>
            Component C - {context.state}
        </div>
    )
}

export default React.memo(ComponentC)
