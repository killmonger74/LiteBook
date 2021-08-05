import React, {useContext} from 'react'
import {Usercontext } from '../App'
function ComponentA() {
    console.log("COMPINET A")
    const context = useContext(Usercontext)
    console.log(context);
    return (
        <div>HEllO --- {context.state}</div>
    )
    }
export default React.memo(ComponentA)
