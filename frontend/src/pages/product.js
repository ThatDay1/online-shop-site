import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);

    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }

    useEffect(() => {
        getAll();
    }, [])

    const remove = async (_id) => {
        let model = { _id: _id };
        let response = await axios.post("http://localhost:5000/products/remove", model);
        alert(response.data.message);
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
                            <button data-bs-toggle="modal" data-bs-target="#addModal" className='btn btn-outline-primary'>
                                Add
                            </button>
                            <table className="table table-bordered table-hover mt-2">
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
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img style={{ width: "50px" }} src={'http://localhost:5000/' + product.imageUrl} />
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

            <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialocentered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addModalLabel">Add Product</h1>
                            <button type="button" class="btn-close" id='addModelCloseBtn' data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='form-group'>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;