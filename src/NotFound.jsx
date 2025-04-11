import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound(){

    const navigate=useNavigate()
    const onButtonClick=()=>{
        navigate('/')
    }
    return(

        <>
          <div className="notFound-container">
            <div className="box">
                <h2>404 Page not found</h2>
                <p>click here for login</p>
                <button onClick={onButtonClick}> Login</button>
            </div>
          </div>
        </>
    )
}