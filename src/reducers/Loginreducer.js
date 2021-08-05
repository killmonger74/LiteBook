export default (state={logininfo:null,email_password_error:false},action)=>
{
    switch(action.type)
    {
        case 'LOGIN_APP':
            localStorage.setItem('memoriesuserprofile',JSON.stringify({...action?.payload}))
            return {...state,logininfo:action?.payload};
       
        case 'IS_LOGIN':

            const data=JSON.parse(localStorage.getItem('memoriesuserprofile'));
            if(data?.res?.exp*1000 < new Date().getTime())
            {
                localStorage.removeItem('memoriesuserprofile');
                return {...state,logininfo:null}
            }
            console.log(data)
            return {...state,logininfo:data}
        case 'LOGOUT':
            localStorage.removeItem('memoriesuserprofile');
            return {...state,logininfo:null}

        case 'EMAIL_PASSWORD_MATCH_FAIL':
            return {...state,email_password_error:true}
        default:
            return state;
    }
}
