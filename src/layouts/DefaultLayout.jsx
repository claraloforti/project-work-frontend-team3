import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";

function DefaultLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <MainFooter />
        </>
    );
}

export default DefaultLayout;