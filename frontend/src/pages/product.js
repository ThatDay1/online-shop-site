import {useState} from 'react';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
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
                                        <th>Product Name</th>
                                        <th>Cathegory Name</th>
                                        <th>Unit</th>
                                        <th>Price</th>
                                        <th>Transactions</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;