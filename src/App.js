import React,{lazy,Suspense,useRef} from 'react'
import {getpost,onepost} from './action/post';
import {useEffect,useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch , useLocation as useMylocation,useHistory} from 'react-router-dom'
import {connect } from 'react-redux';
import Loader from './component/Post/Loader'
import Header from './component/Header/Header';

import Footer from './component/Footer/Footer';
import Confirm from './component/confirm/confirm';
const Login=lazy(()=>import('./component/Login/login')) //lazy components 
const Home =lazy(()=>import('./component/Main/home'))
const Fout =lazy(()=>import('./component/FourOFour/Fout'))

const Resetpasscode =lazy(()=>import('./component/Reset/ResetPasscode'))
const Changepassword=lazy(()=>import('./component/Changepassword/Changepasscode'))
const Signup=lazy(()=>import('./component/SignUp/Signup'))
function useOnIntersection(options,postlength,onepost){

  const ref=useRef();
  const [onscreen,setonscreen]=useState(false);
  useEffect(()=>{

      const observer=new IntersectionObserver(([items])=>{
          setonscreen(items.isIntersecting);
         
      },options)

      if(ref.current)
      {
        observer.observe(ref.current);
        
      }
      return ()=>{
        if(ref.current)
        {
          observer.unobserve(ref.current);
        }
      }

  },[ref,options])

   

  return [ref,onscreen]
}

function App({user,getpost,updateuser,mainerror,clearInfo,postadded,clearInfo1,postlength,onepost}) {

    const [currentid,setcurrentid]=useState(null);
    const [ref,onscreen]=useOnIntersection({rootMargin:"200px"},postlength,onepost);
    useEffect(()=>{
        getpost(0);
        updateuser();
        console.log(mainerror?.payload)
    },[]);
    
   useEffect(()=>{
    if(mainerror.payload!=undefined || mainerror.payload!=null)
    {
      setTimeout(()=>{
         clearInfo()
      },10000)
      
    }
    if(postadded!=undefined || postadded!=null)
    {
      setTimeout(()=>{
         clearInfo1()
      },10000)
    }

   },[mainerror,postadded])

    useEffect(()=>{
        if(onscreen==false ||  postlength&1 || postlength==0)return;
         onepost(postlength)
    },[onscreen]);


    return (
        <BrowserRouter>
          <div className='Toast-Container'>
              {(mainerror.payload !==undefined || mainerror.payload!=null)&&<div className='Notify-Container-danger'>{mainerror.payload}</div>}
              {(postadded!=undefined || postadded!=null)&&<div className='Notify-Container-success'>{postadded}</div>}
          </div>
          <Header  currentid={currentid} setcurrentid={setcurrentid}/>
            <div className='Container'>
              
                <Suspense fallback={<Loader/>}>
                  <Switch >
                    <Route path='/' render={props=><Home currentid={currentid} setcurrentid={setcurrentid}></Home> } exact/>
                    
                    <Route exact path='/login'>
                      {(user.logininfo!==null)?<Redirect to='/'/>:<Login/>}
                    </Route>
                       <Route exact path='/signup'>
                        {(user.logininfo!==null)?<Redirect to='/'/>:<Signup/>}
                    </Route>
                     <Route exact path='/confirm/:code' component={Confirm}>
                     </Route>
                  
                     <Route excat path='/reset/forget' component={Resetpasscode}></Route>


                     <Route excat path='/reset/change/:token' component={Changepassword}></Route>
                     <Route path='*' component={Fout} />
                    </Switch>
                  </Suspense>
                    
                  
              
            

            </div>
            <Footer user={user}  keyref={ref}/>
         </BrowserRouter>
       
    )
}
const mapStateToProps=state=>{
    console.log(state)
    return{
      user:state.loginreducer,
      mainerror:state.mainerror,
      postadded:state.postsucess,
      postlength:state.posts.length
    }
}
const mapDispatchToProps=dispatch=>{
    
    return {
        getpost:(png)=>dispatch(getpost(png)),
        updateuser:()=>dispatch({type:'IS_LOGIN'}),
        clearInfo:()=>dispatch({type:'CLEAR'}),
        clearInfo1:()=>dispatch({type:'CLEAR_ACTION'}),
        onepost:(png)=>dispatch(onepost(png))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
