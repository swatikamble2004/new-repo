import { data, useNavigate } from 'react-router-dom'
import './style.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Loader from './Loader'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


export default function Dashboard() {

    const navigate = useNavigate()

    const onLogoutClick = () => {
        Cookies.remove('app-user')
        navigate('/')
    }
    const { register, handleSubmit, formState: { errors }, setValue, setFocus } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const [updateObj, setUpdateObj]=useState({})
    const [action, setAction]=useState(true)

    const  getUpdateInfo=(currentObj)=>{
        setAction(false)
        setUpdateObj(currentObj)
        setValue('productName', currentObj.productName)
        setValue('productPrice', currentObj.productPrice)
        setValue('productUnit', currentObj.productUnit)
        setValue('productDescription', currentObj.productDescription)

    }
    const onSubmit = (data) => {
        if(action){
            setLoading(true)
            setTimeout(async () => {
                const res = await axios.post('https://node-mongodb-backend-kappa.vercel.app/product/add', data)
                const resData = res.data
                setLoading(false)
                if (resData.status) {
                    toast.success("Product added successfully !!")
                    setValue("productName", '')
                    setValue("productPrice", '')
                    setValue("productUnit", '')
                    setValue("productDescription", '')
                    getProduct()
                }
                else {
                    toast.error(resData.message)
                }
    
    
    
            }, 1000)
    
    
        }
        else{
            setLoading(true)
            setTimeout(async () => {
                const res = await axios.put(`https://node-mongodb-backend-kappa.vercel.app/product/update/${updateObj._id}`, data)
                const resData = res.data
                setLoading(false)
                if (resData.status) {
                    toast.success("Product added successfully !!")
                    setValue("productName", '')
                    setValue("productPrice", '')
                    setValue("productUnit", '')
                    setValue("productDescription", '')
                    getProduct()
                    setAction(true)
                }
                else {
                    toast.error(resData.message)
                }
    
    
    
            }, 1000)
    
    
        }
    }

    const deleteProduct=async(id)=>{
        const res = await axios.delete(`https://node-mongodb-backend-kappa.vercel.app/product/delete/${id}`)
        const resData=res.data
        if(resData.status){
            toast.success(resData.message)
            getProduct()
        }
    }
    const getProduct = async () => {
        const res = await axios.get('https://node-mongodb-backend-kappa.vercel.app/product/get')
        const resData = res.data
        if (resData.status) {
            setProduct(resData.message)
        }

    }

    useEffect(() => {
        if (!Cookies.get('app-user')) {
            navigate('/')
           
        }
        getProduct()
    })
    return (
        <>
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
                        background: 'white',
                        color: 'black',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'white',
                        },
                    },
                }}
            />
            {isLoading && <Loader />}
            <div className="box-container">

                <div className="header">
                    <h2>Welcome,User</h2>
                    <button onClick={onLogoutClick}>Logout</button>
                </div>
                <div className="container">
                    <div className="add-product">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="title">
                                <h2>{action ? 'Add Product':'Update Product'}</h2>
                            </div>
                            <div className="input-field">
                                <label >Productname</label>
                                <input type="text" {...register('productName', { required: 'Product Name is required' })} />
                                {errors.productName && <p>{errors.productName.message}</p>}
                            </div>
                            <div className="input-field">
                                <label >Product Price</label>
                                <input type="number" {...register('productPrice', { required: 'Username is required' })} />
                                {errors.productPrice && <p>{errors.productPrice.message}</p>}
                            </div>
                            <div className="input-field">
                                <label >Product Unit</label>
                                <select {...register('productUnit', { required: 'Product Unit is required' })} >
                                    <option selected value=''>Select</option>
                                    <option value='kg'>KG</option>
                                    <option value='dozzens'>Dozzens</option>
                                    <option value='tons'>Tons</option>


                                </select>
                                {errors.productUnit && <p>{errors.productUnit.message}</p>}
                            </div>
                            <div className="input-field">
                                <label >Product Description</label>
                                <input type="text" {...register('productDescription', { required: 'Product Description  is required' })} />
                                {errors.productDescription && <p>{errors.productDescription.message}</p>}
                            </div>
                            <button type='submit'>{action ? 'Add Product':'Update Product'}</button>
                        </form>

                    </div>
                    <div className="view-product">
                        <table>
                            <thead>
                                <tr>

                                    <th>Name</th>
                                    <th>Price(Rs.)</th>
                                    <th>Unit</th>
                                    <th>Description</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    product.length === 0 ? (
                                        <tr>
                                            <td colSpan="6">No Products are available..</td>
                                        </tr>

                                    ) :
                                        (
                                            product.map((ele, index) => {
                                                return (
                                                    <tr>
                                                        <td>{ele.productName}</td>
                                                        <td>{Number(ele.productPrice).toFixed(2)}</td>
                                                        <td>{ele.productUnit}</td>
                                                        <td>{ele.productDescription}</td>
                                                        <td><i onClick={() => getUpdateInfo(ele)} className="fa-solid fa-user-pen" title="Update product" ></i></td>
                                                        <td><i onClick={() => deleteProduct(ele._id)} className="fa-solid fa-trash" title="Delete product" ></i></td>
                                                    </tr>
                                                )
                                            })

                                        )
                                }


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}