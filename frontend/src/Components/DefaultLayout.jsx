import {Outlet} from "react-router-dom";
export default function DefaultLayout() {
    return (
        <div>
            Default
            <div>
            <Outlet/>
            </div>
        </div>
    )
}