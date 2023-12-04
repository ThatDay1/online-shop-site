import {useState, useEffect} from 'react';
import axios from 'axios';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);

    const getAll = async () => {
        const response  = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }

    useEffect(async () => {
        await getAll();
    }, [])

    const remove = async (_id) => {
        let model = {_id: _id};
        let response = await axios.post("http://localhost:5000/products/remove", model);
        alert( response.data.message);
        await getAll();
    }

    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h1>Product List</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Picture</th>
                                        <th>Product Name</th>
                                        <th>Cathegory Name</th>
                                        <th>Unit</th>
                                        <th>Price</th>
                                        <th>Transactions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img src={'http://localhost:5000/' + product.imageUrl}/>
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.cathegoryName}</td>
                                            <td>{products.stock}</td>
                                            <td>{products.price}</td>
                                            <td>
                                                <button onClick={() => remove(product._id)} className='btn btn-outline-danger btn-sm'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;