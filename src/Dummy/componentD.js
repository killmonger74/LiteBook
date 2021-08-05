import React from 'react'
import CompontnetE from './componentE'
function componentD() {
    
    console.log("Componet D");
    return (
        <div>
            <CompontnetE   />
        </div>
    )
}

export default React.memo(componentD)
