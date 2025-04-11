import { useForm } from 'react-hook-form'
import './Forget.css'

export default function Forget(){
     const {register, handleSubmit, formState:{errors}}=useForm()
        const onFormSubmit=(data)=>{
            console.log(data)
        }
    return(
        <>
        <div className="forget-container">
            <form onSubmit={handleSubmit(onFormSubmit)}>
            <h2>Forgot Password</h2>
            <div className="input-field2">
                    <label>Email Address</label>
                    <input type='email' {...register('emailAddress',{required:'Email is required',
                        pattern:{
                            value:/^\S+@\S+$/i , message:'Invalid email'
                        }
                    })}></input>
                    {errors.emailAddress && <p>{errors.emailAddress.message}</p>}
            </div>
            <button>Forget Password</button>
            </form>
        </div>
        
        </>
    )
}