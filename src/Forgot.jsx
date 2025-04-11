import { useForm } from 'react-hook-form'
import './Forgot.css'

export default function Forgot(){

    //  const{register,handleSubmit,formState:{errors},watch}=useForm()
    const{register,handleSubmit,formState:{errors},watch}=useForm()
        const onFormSubmit=(data)=>{
            console.log(data)
        }
    
        const password=watch('password')
    return(
        <>
        <div className="forgot-container">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Forgot Password</h2>
                <div className="input-field1">
                <label>email</label>
                <input type='email' {...register('email',{required:'email is required',pattern:{value:/^\S+@\S+$/i, message:'invalid email'}})}></input>
                { errors.email && <p>{errors.email.message}</p>}

            </div>
            <button type='submit'>Forgot Password</button>
            </form>
        </div>
        </>
    )
}
