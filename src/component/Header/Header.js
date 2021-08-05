import React,{useState,useEffect,lazy,Suspense} from 'react'

import {Link,useLocation,useHistory} from 'react-router-dom'
import {opendomportal} from '../../action/post'
import {useDispatch} from 'react-redux';
const Modal=lazy(()=>import('./Modal'))
function Header({currentid,setcurrentid,screenLoading}) {
  
    const [visible,setvisible]=useState(false);
    const setfalse=()=>{
        setcurrentid(null)
        setvisible(false);
    }
    const location=useLocation();
    const dispatch=useDispatch();
    const history=useHistory()
    const [sizeof,setsizeof]=useState(window.innerWidth);
    window.addEventListener('resize',()=>{
        setsizeof(window.innerWidth);
    })

    const [user,setuser]=useState(JSON.parse(localStorage.getItem('memoriesuserprofile')));
    
    useEffect(()=>{
        const token=JSON.parse(localStorage.getItem('memoriesuserprofile'))?.token;

        if(token){
         let d=JSON.parse(localStorage.getItem('memoriesuserprofile'))?.res?.exp;

         if(d*1000< new Date().getTime())
         {
            dispatch({type:'LOGOUT'})
            setuser(null);
            history.push('/');
         }
         else
         setuser(JSON.parse(localStorage.getItem('memoriesuserprofile')))}
    },[location])
    
    const [showtoggle,setshowtoggle]=useState(false)
    return (
        <>
             <header>
             
               <nav>
                   <ul>
                       <li className='desktop'><Link to ='/'>LiteBook</Link></li>
                       {
                                user===null ? <ul className={sizeof<=500 ?'bottom-nav':'top-nav'}style={{gridTemplateColumns:'repeat(2,1fr)'}}>{sizeof<=500&&<li>Home</li>}<li className='Login '><Link to ='/login'>Log In</Link></li></ul>
                                :
                                <ul className={sizeof<=500 ?'bottom-nav':'top-nav'}>
                                    {sizeof<=500&&<li>Home</li>}
                                    <li onClick={()=>{dispatch(opendomportal)}}>Create Post</li>
                                    <li>{user?.res?.name}</li>
                                    <li onClick={()=>{
                                        dispatch({type:'LOGOUT'})
                                        setuser(null);
                                        setshowtoggle(false)
                                    }}>Logout</li>
                                </ul>
                       }

                   </ul>
               </nav>
           </header>

            {/* <Suspense fallback={''}>
                    <Modal isvisible={visible} setfalse={setfalse} setvisible={setvisible}  currentid={currentid} setcurrentid={setcurrentid}>
                    </Modal>
                            
            </Suspense> */}
           
        </>
    )
}

export default Header
