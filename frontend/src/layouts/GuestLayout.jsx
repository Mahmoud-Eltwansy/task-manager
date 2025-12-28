import './GuestLayout.css';

function GuestLayout({children}) {
    return (
        <div className="guest-layout">
            <div className="guest-layout-container">
                {children}
            </div>
        </div>
    );
}

export default GuestLayout;
