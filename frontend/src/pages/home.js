import {useEffect, useState} from 'react';
import axios from 'axios';

const HomeComponent = () => {
    const [products, setProducts] = useState([]);

    const getAll = async () => {
        var response = await axios.get("http//localhost:5000/products");
        setProducts(response.data);
    }

    useEffect(() => {
        getAll();
    }, [])
    return (
        <>
            <div className='container'>
                <div className='row'>
                    {
                        products.map((product, index) => (
                            <div key={index} className='col-md-3'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4>{product.name}</h4>
                                    </div>
                                    <div className='card-body'>
                                        <img style={{width: "180px", height: "150px"}} src={'http://localhost:5000/' + product.imageUrl}/>
                                        <h4 className='text-center mt-1' style={{border: "1px solid #ccc", padding:"10px"}}>Stock: {product.stock}</h4>
                                        <h4 className='text-center text-danger mt-1' style={{border: "1px solid #ccc", padding:"10px"}}>Price: {product.price}</h4>
                                        <button className='btn btn-outline-success w-100'>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default HomeComponent;