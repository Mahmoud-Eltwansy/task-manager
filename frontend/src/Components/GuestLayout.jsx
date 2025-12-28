import {Outlet} from "react-router-dom";

export default function GuestLayout() {
    return (
        <div>
            Guest
            <div>
            <Outlet/>
            </div>
        </div>
    )
}