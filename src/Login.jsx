import { useForm } from 'react-hook-form'
import './Login.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Loader from './Loader'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Login(){

    const {register, handleSubmit, formState:{errors},setValue}=useForm()
    const [isLoading, setLoading]=useState(false)
    const navigate=useNavigate()
    const onFormSubmit1=(data)=>{
        setLoading(true)
        setTimeout(async()=>{
            const res= await axios.post('https://node-mongodb-backend-kappa.vercel.app/login',data)
            const resData=res.data
            setLoading(false)
            if(resData.status){
                toast.success('User logged in successfully')
                Cookies.set('app-user',data.userName,{expires:7})
                setTimeout(()=>{
                    navigate('/dashboard')

                },3500)
            }
            else{
                if(resData.message==="User not found"){
                    setValue('userName','')
                    setValue('password','')
                }else if(resData.message==='Wrong password'){
                    setValue('password','')

                }
                toast.error(resData.message)
            }


        },1000)
    }

    useEffect(()=>{
        if(Cookies.get('app-user')){
            navigate('./dashboard')
        }
    },[])

    return(
        <>
        {isLoading && <Loader/>}
        <div className="login-container">
            <form onSubmit={handleSubmit(onFormSubmit1)} >
                <h2>Login Here</h2>
                <div className="input-field1">
                <label>Username</label>
                    <input type='email' {...register('userName',{required:'Username is required',
                        pattern:{
                            value:/^\S+@\S+$/i , message:'Invalid email'
                        }
                    })}></input>
                    {errors.userName && <p>{errors.userName.message}</p>}
                </div>
                <div className="input-field1">
                <label>Password</label>
                    <input type='password' {...register('password',{required:'Password is requird',
                        minLength:{
                            value:6,
                            message:'Password length should be greater than 6 character'
                        }
                    })}></input>
                    {errors.password && <p>{errors.password.message}</p>}

                </div>
                <NavLink to='/forget' className='forget' >Forget Password</NavLink>
                <button>Login</button>
                <Link to='/register' className='register'> Register Here</Link>

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