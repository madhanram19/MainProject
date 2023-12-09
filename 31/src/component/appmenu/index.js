import React from 'react';
import { Link, useLocation } from 'react-router-dom';


import './appmenu.scss';

import dashboard from '../../assets/images/dashboard.png';
import profile from '../../assets/images/profile.png';
import bank from '../../assets/images/bank.png';
import transaction from '../../assets/images/transaction.png';
import exchange from '../../assets/images/exchange.png';
import support from '../../assets/images/support.png';
import security from '../../assets/images/security.png';

const AppMenu = () => {
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    return (
        <div className="top-header">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/dashboard" className={`nav-link ${splitLocation[1] === "dashboard" ? "active" : ""}`}><span><img src={dashboard} /></span> <span className="menu-name">Dashboard</span></Link>                        
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className={`nav-link ${splitLocation[1] === "profile" ? "active" : ""}`}> <span><img src={profile} /></span> <span className="menu-name">Profile</span></Link>                        
                    </li>
                    <li className="nav-item">
                        <Link to="/bank-details" className={`nav-link ${splitLocation[1] === "bank-details" ? "active" : ""}`}> <span><img src={bank} /></span> <span className="menu-name">Bank Details </span></Link>                        
                    </li>
                    <li className="nav-item">
                        <Link to="/transaction" className={`nav-link ${splitLocation[1] === "transaction" ? "active" : ""}`}> <span><img src={transaction} /></span> <span className="menu-name">Transaction</span></Link>                        
                    </li>
                    <li className="nav-item">
                        <Link to="/exchange" className={`nav-link ${splitLocation[1] === "exchange" ? "active" : ""}`}> <span><img src={exchange} /></span> <span className="menu-name">Exchange</span></Link>                        
                    </li>
                    <li className="nav-item">
                        <Link to="/security" className={`nav-link ${splitLocation[1] === "security" ? "active" : ""}`}> <span><img src={security} /></span> <span className="menu-name">Security & 2FA</span></Link>                        
                    </li>
                    <li className="nav-item">
                        <Link to="/support" className={`nav-link ${splitLocation[1] === "support" ? "active" : ""}`}> <span><img src={support} /></span> <span className="menu-name">Support</span></Link>                        
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default AppMenu;