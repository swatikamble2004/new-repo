import { set, useForm } from 'react-hook-form'
import './Register.css'
import { useState } from 'react'
import Loader from './Loader'
import toast, { Toaster } from 'react-hot-toast'

export default function Register(){

    const{register,handleSubmit,formState:{errors},watch}=useForm()
const [isLoading,setIsLoading]=useState(false)

    const onFormSubmit=(data)=>{
        setIsLoading(true)
        setTimeout(async()=>{
            // const res =awa
            const resData=res.data
            setIsLoading(false)
            if(resData.status){
                toast.success('Registration successful')
            }
            else{
                toast.error('Registration failed')
            }
        },2000)
    }

    
    return(


        <>
        {isLoading && <Loader/>}
        <div className="register-container">
            <h2>Register form</h2>
            <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-field">
                <label>Username</label>
                <input  type='text' {...register('fullname',{required:'fullname is required'})}></input>
                { errors.fullname && <p>{errors.fullname.message}</p>}
            </div>
            <div className="input-field">
                <label>email</label>
                <input type='email' {...register('email',{required:'email is required',pattern:{value:/^\S+@\S+$/i, message:'invalid email'}})}></input>
                { errors.email && <p>{errors.email.message}</p>}

            </div>
            <div className="input-field">
                <label>age</label>
                <input type='number' {...register('age',{required:'age is required',
                    min:{
                        value:18,
                        message:'tenegers are not allowed'
                    }
                })}></input>
                { errors.age && <p>{errors.age.message}</p>}

            </div>

            <div className="input-field">
                <label>password</label>
                <input  type='password' {...register('password',{required:'password is required'})}></input>
                { errors.password && <p>{errors.password.message}</p>}

            </div>
            <div className="input-field">
                <label>confirm password</label>
                <input type='password'{...register('cnf',{
                    validate:(value)=>
                        value===password || "password does't match"
                })}></input>
                {errors.cnf &&<p>{errors.cnf.message}</p>}
            </div>
            <button type='submit'>Submit</button>
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