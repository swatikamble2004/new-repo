import { set, useForm } from 'react-hook-form'
import './Login.css'
import { Link, NavLink } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import Loader from './Loader'
import axios from 'axios'

export default function Login(){

        const{register,handleSubmit,formState:{errors},watch,setValue}=useForm()
        const [isLoading,setIsLoading]=useState(false)
        const onFormSubmit=(data)=>{
            setIsLoading(true)
            setTimeout(async()=>{
                const res=await axios.post('http://localhost:8500/login',data)

                const resData=res.data
                setIsLoading(false) 

                if(resData.status){
                    toast.success('Login successful')
                }
                else{
                    if(resData.message==='user not found'){
                        setValue('username','')
                        setValue('password','')
                    }
                    else if(resData.message==='password is incorrect'){
                        setValue('password','')
                    }
                    toast.error('Login failed')

                }
            },1000)

        }
        
    
    
    return(
        <>
        {isLoading && <Loader/>}
        <div className="login-container">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="login">
                    <label>Username</label>
                    <input type='text'{...register('username',{required:'username is required'})}></input>
                    { errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className="login">
                    <label>password</label>
                    <input type='text'{...register('password',{required:'password is required'})}></input>
                    { errors.password && <p>{errors.password.message}</p>}
                </div>
                <Link to='/forgot'>forgot password</Link>
                <button type='submit'>Login</button>
                <NavLink to='/register'> register here</NavLink>
        
                
            </form>
        </div>

        <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: '',
                        duration: 5000,
                        removeDelay: 1000,
                        style: {
                        background: '#363636',
                        color: '#fff',
                        },

                        // Default options for specific types
                        success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                        },
                    }}
                    />


        </>

        

        
    )
}
