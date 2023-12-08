import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProductComponent = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [price, setPrice] = useState("0");
    const [stock, setStock] = useState("0");

    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }

    useEffect(() => {
        getAll();
        checkIsAdmin();
    }, [])

    const remove = async (_id) => {
        let confirm = window.confirm("Do you want to delete the product?");
        if (confirm) {
            let model = { _id: _id };
            let response = await axios.post("http://localhost:5000/products/remove", model);
            alert(response.data.message);
            await getAll();
        }
    }

    const add = async (e) => {
        e.preventDefault();
        //console.log(image);
        var input = document.querySelector("input[type='file']");
        //console.log(input.files[0]);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("categoryName", categoryName);
        formData.append("stock", stock);
        formData.append("price", price);
        formData.append("image", input.files[0], input.files[0].name);

        var response = await axios.post("http://localhost:5000/products/add", formData);

        alert(response.data.message);

        getAll();

        let element = document.getElementById("addModelCloseBtn");
        element.click();

        setName("");
        setPrice(0);
        setStock(0);
        setCategoryName(0);
        input.value = "";

    }

    const checkIsAdmin = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user.isAdmin) {
            navigate("/");
        }
    }


    return (
        <>
            <div classNameName="container mt-4">
                <div classNameName="card">
                    <div classNameName="card-header">
                        <h1>Product List</h1>
                    </div>
                    <div classNameName="card-body">
                        <div classNameName="form-group">
                            <button data-bs-toggle="modal" data-bs-target="#addModal" classNameName='btn btn-outline-primary'>
                                Add
                            </button>
                            <table classNameName="table table-bordered table-hover mt-2">
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
                                                <button onClick={() => remove(product._id)} classNameName='btn btn-outline-danger btn-sm'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialocentered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addModalLabel">Add Product</h1>
                            <button type="button" className="btn-close" id='addModelCloseBtn' data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={add}>
                            <div className="modal-body">
                                <div classNameName='form-group'>
                                    <label htmlFor='name'>Product Name</label>
                                    <input classNameName='form-control' value={name} onChange={(e) => setName(e.target.value)} id='name' name='name' />
                                </div>
                                <div classNameName='form-group'>
                                    <select className='form-control' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} >
                                        <option value="0">Choose...</option>
                                        <option>Vegetable</option>
                                        <option>Fruit</option>
                                        <option>Technology</option>
                                        <option>Others</option>
                                    </select>
                                </div>
                                <div classNameName='form-group mt-2'>
                                    <label htmlFor='stock'>Stock Quantity</label>
                                    <input classNameName='form-control' value={stock} onChange={(e) => setStock(e.target.value)} id='stock' name='stock' />
                                </div>
                                <div classNameName='form-group mt-2'>
                                    <label htmlFor='price'>Unit Price</label>
                                    <input classNameName='form-control' value={price} onChange={(e) => setPrice(e.target.value)} id='price' name='price' />
                                </div>
                                <div classNameName='form-group mt-2'>
                                    <label htmlFor='image'>İmage</label>
                                    <input classNameName='form-control' type='file' id='image' name='image' />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;