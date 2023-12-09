import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/footer";


const Mainlayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
 
export default Mainlayout;