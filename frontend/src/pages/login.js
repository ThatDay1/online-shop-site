import { useState } from "react";
import { Link } from "react-router-dom";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <>
            <div className="d-flex justify-content-center" style={{marginTop:"70px"}}>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h1>Entry Page</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label htmlFor="email">mail address</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="form-control"/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="email" name="email" className="form-control"/>
                                </div>
                                <div className="form-group mt-2">
                                    <button className="btn btn-outline-primary w-100">Log In</button>
                                    <Link className="mt-2" to="/register" style={{float:"right"}}>Sign In</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent;