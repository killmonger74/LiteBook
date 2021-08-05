export default (isloading=null,action)=>{
	switch(action.type)
	{
		case "LOADING":
			return true;

		case "DONELOADING":
			return false;
		default:
			return null
	}

}