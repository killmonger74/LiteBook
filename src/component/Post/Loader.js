import React from 'react';
const Loader=({notfound})=>{
	return (
	<div className='Loader'>
	  <div className="Dots">
	  		{notfound
	  			?
	  			<h5> No Post Found !</h5>
	  			:
    			<h5>Loading...</h5>
	  		}
       </div>
    </div>
    )
}
export default Loader