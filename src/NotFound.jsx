import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound(){
    const navigate=useNavigate()
    const onButtonCLick=()=>{
        navigate('/')
    }
    return(
        <>
        <div className="not-found-container">
            <div className="box">
            <h2>404 Page Not Found</h2>
            <p>Click here to Login</p>
            <button onClick={onButtonCLick}>Login</button>
            </div>
        </div>
        
        </>
    )
}