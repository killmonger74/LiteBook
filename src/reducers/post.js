export default (posts=[],action)=>{
    
    switch(action.type)
    {
        case 'FETCH_ALL':
                return action.payload
       
        case 'FETCH_SUB':
            return [...posts,...action.payload];

        case 'CREATE':
            return [action.payload,...posts]
        
        case 'UPDATE':
        case 'LIKE':
            return posts.map((post)=>post._id===action.payload._id?action.payload:post);  
        
        case 'DELETE':
            return posts.filter((post)=>post._id!==action.payload)  
            
        case 'FAILURE':
            return action.payload
        
        
        default:
            return posts
    }
}
