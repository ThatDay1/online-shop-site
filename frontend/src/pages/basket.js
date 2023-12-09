import { useEffect, useState } from 'react';
import axios from 'axios';

const BasketComponent = () => {
    const [baskets, setBaskets] = useState([]);
    const [total, setTotal] = useState(0);

    const getAll = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let model = { userId: user._id };
        let response = await axios.post("http://localhost:5000/baskets/getAll", model);
        //console.log(response.data);

        setBaskets(response.data);
        let totalC = 0;
        for (let i = 0; i < baskets.length; i++) {
            totalC += baskets[i].products[0].price;
        }
        setTotal(totalC);
        //console.log(totalC);
    }


    useEffect(() => {
        getAll();
        calc();
    }, [])

    return (
        <>
            <div className='container mt-4'>
                <div className='card'>
                    <div className='card-header'>
                        <h1 className='text-center'>Cart</h1>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <table className='table table-bordered table-hover'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Products Name</th>
                                            <th>Product Image</th>
                                            <th>Product Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Transactions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {baskets.map((basket, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{basket.products[0].name}</td>
                                                <td>
                                                    <img src={"http://localhost:5000/" + basket.products[0].imageUrl} width="75" />
                                                </td>
                                                <td>1</td>
                                                <td>{basket.products[0].price}</td>
                                                <td>
                                                    <button className='btn btn-outline-danger btn-sm'>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4 className='text-center'>Card Sum</h4>
                                        <hr />
                                        <h5 className='text-center'>Sum of Product Quantity: {baskets.length}</h5>
                                        <h5 className='alert alert-danger text-center'>Sum of Price: {total}</h5>
                                        <hr />
                                        <button className='btn btn-outline-danger w-100'>Payment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BasketComponent;