import { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import { authApis } from "../../axiosClient";
import GuestLayout from "../../layouts/GuestLayout";

function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true)

        try{
            const response= await authApis.register({name,email,password});
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            navigate('/tasks');
        }catch(error){
            setError(error.response?.data?.message || 'Registration Failed');
        }finally{
            setLoading(false);
        }

    };

    return (
        <GuestLayout>
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

                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder='test@email.com' value={email} onChange={(e)=> setEmail(e.target.value)} required className='login-input' />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)} required className='login-input'/>
                    </div>

                    <button 
                    type="submit" 
                    disabled={loading}
                    className="register-button">
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
    )
}
export default Register;
