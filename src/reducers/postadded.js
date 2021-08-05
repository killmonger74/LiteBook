const funname= (postadded=null,action)=>{
    switch(action.type)
    {
        case 'POSTACTION':
                return action.payload
        case 'CLEAR_ACTION':
            return null;
        default:
            return null;
    }
}

export default funname