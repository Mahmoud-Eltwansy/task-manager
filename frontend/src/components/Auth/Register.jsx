import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from "react-router-dom";
import { authAPI } from '../../api';
import GuestLayout from '../../layouts/GuestLayout';
import { Helmet } from 'react-helmet-async';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.register({ name, email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <GuestLayout>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="register-form">
                <h2>Create Account</h2>
                <p className="register-subtitle">Join us and manage your tasks</p>

                {error && <div className="register-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="register-button"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <div className="register-footer">
                    <p>Already have an account?
                        <a href="/login" className="register-link"> Login here</a>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
export default Register;
