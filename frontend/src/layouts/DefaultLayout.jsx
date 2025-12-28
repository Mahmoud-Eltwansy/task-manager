import { useState } from 'react'
import './DefaultLayout.css'
import { useNavigate } from 'react-router-dom';
import { authApis } from '../axiosClient';


function DefaultLayout({children,user}){
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async() => {
        if(window.confirm('Are you sure you want to logout?')){
            try{
                setLoading(true);
                await authApis.logout();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }catch(error){
                console.error('Logout Failed',error);
            }finally{
                setLoading(true);
            }
        }
    };
    return (
    <div className='default-layout'>
        <header className='default-header'>
            <div className='header-content'>
                <div className='header-left'>
                    <h1 className='app-title'>
                        Task Manager
                    </h1>
                </div>
                <div className='header-right'>
                    {user && (
                        <div className='user-info'>
                            <span className='user-name'>{user.name}</span>
                        </div>
                    )}
                    <button onClick={handleLogout} disabled={loading} className='logout-btn'>
                        {loading?'Logging out..' :'Logout' }
                    </button>
                </div>
            </div>
        </header>
        
        <main className='default-main'>
                {children}
        </main>

        <footer className='default-footer'>
            <p>Task Manager Application. Done By Mahmoud Eltwansy</p>
        </footer>
    </div>
    );
}

export default DefaultLayout;


