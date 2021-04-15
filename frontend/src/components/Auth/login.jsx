import "../style.css";
import PropTypes from 'prop-types';
import { useState } from "react";


function Login({ handle_login, setDisplayForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const set_username = e => {
        const value = e.target.value;
        setUsername(value);
    }
    const set_password = (e) => {
        const value = e.target.value;
        setPassword(value);

    };


    return (
        <div className='login-screen'>
            <form>
                <div className='heading'>
                    <h3>Sign In</h3>

                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        placeholder="Enter email"
                        value={username}
                        onChange={set_username}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        placeholder="Enter password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={set_password}
                    />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-dark btn-block mb-3"
                    onClick={(e) => handle_login(e, { username, password })}>Login</button>

            </form>
            <p className="forgot-password text-right">
                Not registered?  <button className='btn btn-outline-info' onClick={() => setDisplayForm(false)}>
                    Register
          </button>
            </p>

        </div>
    )
}

export default Login;



Login.propTypes = {
    handle_login: PropTypes.func.isRequired
};
