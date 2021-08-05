import React from 'react';
const Footer=({user,keyref})=>{
	console.log(user)
	return(
		<footer className='footer' ref={keyref}>
			<div><h5>all rights are reserved to LiteBook</h5></div>
			<div>
			<ul>

			<li><h5>Privacy Policy</h5></li>

			{ !(user?.logininfo?.token) &&<li><h5>Signin</h5></li>}


			</ul>

			</div>
		</footer>
	)
}

export default Footer