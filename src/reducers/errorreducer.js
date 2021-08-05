export default (mainerror={},action)=>{
    switch(action.type)
    {
        case 'ERROR':
            let {payload}=action
            return {...mainerror,payload}
        case 'CLEAR':
            return {}
        default:
            return mainerror
    }
}