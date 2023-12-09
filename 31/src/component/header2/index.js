import React, { useState, useEffect } from 'react';
import '../header/header.scss';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink,    
    NavbarText,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import brandlogo from '../../assets/images/logo.png';
import notification from '../../assets/images/notification.png';
import wallet from '../../assets/images/wallet.png';
import user_nav from '../../assets/images/user_nav.png';
import { Link, useNavigate } from 'react-router-dom';


function Header() {
    // header scroll start
    const [scroll, setScroll] = useState(false)
    //const [isConnected, setIsConnected] = useState(true)



    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50)
        })
    }, [])
    // header scroll end

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("loggedUserId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("token"); 
        navigate("/");
    };

    return (
        <>
            <header className={scroll ? "navbgset" : ""}>
                <Navbar color="light" light expand="xl" className="mynavbar px-xl-0" fixed='top'>
                    <div className='container-fluid'>
                        <NavbarBrand href="/">
                            <img src={brandlogo} className="logo" alt="brandlogo" />
                        </NavbarBrand>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mx-auto" navbar>
                                <NavItem>
                                    <Link className='nav-link' to="/market">Market</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className='nav-link' to="/trade">Trade</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className='nav-link' to="/aboutus">Aboutus</Link>
                                </NavItem>
                            </Nav>

                            <NavbarText >
                                <Link to="/" className="btn btn-primary btnheaderIcon" role="button"> <span className="px-0"><img src={notification} /></span></Link>
                                <Link to="/" className="btn btn-primary btnheaderIcon ml-2" role="button"> <span className="px-0"><img src={wallet} /></span> </Link>

                                <UncontrolledDropdown className="position-relative d-inline-block ml-2">
                                    <DropdownToggle className="btn btn-primary btnheaderIcon w-auto">
                                        <img className="usernav" src={user_nav} />  <i className="bi bi-caret-down-fill ml-1 text-black"></i>
                                    </DropdownToggle>

                                    <DropdownMenu className="animate__animated animate__slideInRight dropdown-menu dropdown-menu-right">
                                        <ul id="usermenu" className="list-unstyled" >
                                            <button
                                                className="btn BtnPrimry Btn120-42" style={{ color: 'black' }}
                                                onClick={() => logout()}
                                            // Handle logout logic here 
                                            >
                                                Logout
                                            </button>
                                        </ul>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                            </NavbarText>
                        </Collapse>
                    </div>
                </Navbar>
            </header>
        </>
    );

}

export default Header;