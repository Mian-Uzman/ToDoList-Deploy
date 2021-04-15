import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react';


function Register({ handle_signup, setDisplayForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const set_username = e => {
        const value = e.target.value;
        setUsername(value);
    }
    const set_password = (e) => {
        const value = e.target.value;
        setPassword(value);

    };
    const set_password_again = (e) => {
        const value = e.target.value;
        setPasswordAgain(value);

    };


    const handleWrongPass = (e) => {
        e.preventDefault();
        console.log("Passwords Dont Match");
    }

    return (
        <div className='register-screen'>
            <form>
                <div className='heading'>
                    <h3>Sign Up</h3>

                </div>

                <div className="form-group">
                    <label>First name</label>
                    <input
                        className="form-control"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={set_username}
                    />                            </div>


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
                    <label>Password</label>
                    <input
                        className="form-control"
                        placeholder="Re-Enter password"
                        type="password"
                        name="passwordAgain"
                        value={passwordAgain}
                        onChange={set_password_again}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-dark btn-block mb-3"
                    onClick={(e) => {
                        (password === passwordAgain)
                            ? handle_signup(e, { username, password, passwordAgain })
                            : handleWrongPass(e)
                    }}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <button className='btn btn-outline-info' onClick={() => setDisplayForm(true)}>Sign In</button>
                </p>
            </form>
        </div>
    )
}

export default Register


Register.propTypes = {
    handle_signup: PropTypes.func.isRequired
};