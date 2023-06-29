import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ApiUrl } from '../../src/config';
import { useAlert } from 'react-alert'
import sectiondata from "../../src/data/sections.json"
import storage from '../apiServices.js/storage';
import { GetBaseUrl } from '../apiServices.js/configUrl';
function LoginOwner() {
    
    const { 
        register:signupRegister, 
        handleSubmit:handleSignUpSubmit,errors } = useForm();
        const {  register:LoginRegiser,
            handleSubmit:hanldeLoginSubmit} =useForm()
    const [register,setRegister]=useState(true);
    
    const history =useHistory()
    console.log("errors",errors)
    // const [login,setLogin]=useState({rotateY:"180deg"});
        let publicUrl = process.env.REACT_APP_PUBLIC_URL ;;
    let imagealt = "image";
    let data = sectiondata.searchlist;
    const openRegister = ()=>{

        setRegister(false)
    }
    const openLogin = ()=>{
        console.log('helo')
        setRegister(true)
    }

     // signup Api Integration
        const onSignUp =(data)=>{
            console.log("signup data",data)
            axios.post(`${GetBaseUrl()}/signup`,data).then((resdata)=>{
                console.log(resdata.data)
                alert(resdata.data.message)
            // history.push('/tenant')
            }).catch(err=>{
                console.log(err)
                //alert(err.response)
            })
                }


     // signIn Api Integration
    const onSignIn =(data)=>{
        console.log("signin data",data)
        axios.post(`${GetBaseUrl()}/signin`,data).then((resdata)=>{
            storage.storeJsonData('user',resdata.data)
        history.push('/owner')
        }).catch(err=>{
            console.log(err)
            // alert(err.response.data.error)
        })
            }

            const VarifyOtp = (data)=>{
                console.log('otp Verify' , data)
                axios.post(`${GetBaseUrl()}/otp` , data). then((resdata)=>{
                    console.log(resdata.data)
                    alert(resdata.data.message)
                    history.push('./owner')
                }).catch(err=>{
                    console.log(err)
                })
            }
            
  return (
    <div>
           <div className="Owcontainer">
        <div className="Owcard">
            <div className={register?"innerbox":"outerbox"} id="card">
                <div className="card-front">
                    <h2 className='Ohead'>Login</h2>
                    <form  onSubmit={hanldeLoginSubmit(onSignIn , VarifyOtp )}>
                        <input type="number" className="input-box" placeholder="Mobile Number" {...LoginRegiser('number',{required:true})} />
                        <input type="email" className="input-box" placeholder="Enter Your Email" {...LoginRegiser('email',{required:true})} />
                        <input type="password" className="input-box" placeholder="Enter Your password" {...LoginRegiser('password',{required:true})}/>
                        <button type="submit" className="submitbtn">SUBMIT</button>
                        <input type="checkbox" /> <span>Remember Me</span>
                    </form>
                    <button type="button" className="Obtn" onClick={openLogin}>I'm New Here !!!</button>
                    <Link to="" className='Owa'>Forgot Password</Link>
                </div>
                <div className="card-back">

                    <h2 className='Ohead'>Register</h2>
                    <form onSubmit={handleSignUpSubmit(onSignUp)}>
                        <input type="text" className="input-box" placeholder="Enter Your name" {...signupRegister('name',{required:true})}/>
                        <input type="email" className="input-box" placeholder="Enter Your Email" {...signupRegister('email',{required:true})} />
                        <input type="password" className="input-box" placeholder="Enter Your password" {...signupRegister('password',{required:true})} />
                        <button type="submit" className="submitbtn">SUBMIT</button>
                        <input type="checkbox" /> <span>Remember Me</span>
                    </form>
                    <button type="button" className="Obtn" onClick={openRegister}>i've an Account !!!</button>
                    <Link to="" className='Owa'>Forgot Password</Link>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default LoginOwner