import React, { useState } from 'react';
import './DefaultLayout.css';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';


function DefaultLayout({ children, user }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            try {
                setLoading(true);
                await authAPI.logout();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } catch (err) {
                console.error('Logout failed', err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="default-layout">
            <header className="default-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1 className="app-title"> Task Manager</h1>
                    </div>

                    <div className="header-right">
                        {user && (
                            <div className="user-info">
                                <span className="user-name"> {user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="logout-btn"
                        >
                            {loading ? 'Logging out...' : 'Logout'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="default-main">
                {children}
            </main>

            <footer className="default-footer">
                <p>&copy; 2025 Task Management Application. Made By Mahmoud Eltwansy</p>
            </footer>
        </div>
    );

}

export default DefaultLayout;

