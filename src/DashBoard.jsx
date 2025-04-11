import { useNavigate } from 'react-router-dom'
import './Style.css'

export default function DashBoard(){

    const navigate=useNavigate()
    const onClick=()=>{
        navigate('/')
    }

    

    const onLogoutclick=()=>{
        navigate('/')
    }
    
    return(

        <>
                        <div className="page">
                    <div className="header">
                        <h2>Welcome, Fullname</h2>
                        <button onClick={onLogoutclick}>Logout</button>
                    </div>
                                        <div className="content">
                        {/* Left Side Form */}
                        <div className="product-container">
                        <form>
                            <div className="input-field">
                            <label>Product Name</label>
                            <input type="text" name="productName" {...register('Productname',{required:'Productname is required'})}/>
                           { error.productName &&<p>{error.productName.message}</p>}
                            </div>
                            <div className="input-field">
                            <label>Product Price</label>
                            <input type="number" name="productPrice" />
                            </div>
                            <div className="input-field">
                            <label>Product Unit</label>
                            <input type="text" name="productUnit" />
                            </div>
                            <div className="input-field">
                            <label>Product Description</label>
                            <input type="text" name="productDescription" />
                            </div>
                            <button type="submit">Add Product</button>
                        </form>
                        </div>

                        {/* Right Side Table */}
                        <div className="product-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Unit</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Sample Product</td>
                                <td>$20</td>
                                <td>kg</td>
                              
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>

        </>
        
    )
}