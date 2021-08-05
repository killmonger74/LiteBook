import React from 'react'
import ComponentF from './ComponentF'
function componentE() {
    
    console.log("Componet E");
    return (
        <div>
            <ComponentF  />
        </div>
    )
}

export default React.memo(componentE)
