import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { authApis } from '../../axiosClient';
import GuestLayout from '../../layouts/GuestLayout';


function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response= await authApis.login({email,password});
            localStorage.setItem('token',response.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            navigate('/tasks');
        }catch(error){
            setError(error.response?.data?.message || 'Login Failed');
        }finally {
            setLoading(false);
        }
    };

    return (
        <GuestLayout>
            <div className='login-form'>
                <h2>Login</h2>
                <p className='login-subtitle'>
                    Login to your account
                </p>
                {error && <div className='login-error'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder='test@email.com' value={email} onChange={(e)=> setEmail(e.target.value)} required className='login-input' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)} required className='login-input'/>
                    </div>

                    <button type='submit' disabled={loading} className='login-button'>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className='login-footer'>
                    <p>Don't have an account?
                        <a href='/register' className='login-link'>Register</a>
                    </p>
                </div>
            </div>
        </GuestLayout>
    )
}

export default Login;