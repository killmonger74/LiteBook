import React from 'react'
import ComponentC from './componentC'
function componentB() {
    
    console.log("Componet B");
    return (
        <div>
            <ComponentC  />
        </div>
    )
}

export default React.memo(componentB)
