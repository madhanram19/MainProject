import React, { useState, useEffect } from 'react';
import './header.scss';
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
import { Link } from 'react-router-dom';


function Header() {
    // header scroll start
    const [scroll, setScroll] = useState(false)
    const [isConnected, setIsConnected] = useState(true)

    
    
    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 50)
      })
    }, [])
    // header scroll end

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    
        return (
            <>
            <header className={scroll ? "navbgset" : ""}>
             <Navbar color="light" light expand="xl" className="mynavbar px-xl-0" fixed='top'>
                <div className='container'>
              <NavbarBrand href="/">
                <img src={brandlogo} class="logo" alt="brandlogo" />
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
                    <NavbarText>
                        <Link to="/login" class="btn btn-primary btnheader rounded-pill ml-2" role="button"> <span class="px-0">Login</span> </Link>
                    </NavbarText>
                    <NavbarText className={isConnected ? 'd-none': ''}>
                    <Link to="/" class="btn btn-primary btnheaderIcon" role="button"> <span class="px-0"><img src={notification} /></span></Link>           
                    <Link to="/" class="btn btn-primary btnheaderIcon ml-2" role="button"> <span class="px-0"><img src={wallet} /></span> </Link>                
    
                    <UncontrolledDropdown className="position-relative d-inline-block ml-2">
                        <DropdownToggle className="btn btn-primary btnheaderIcon dropdown-toggle w-auto">
                            <img class="usernav" src={user_nav} />  <i class="bi bi-caret-down-fill ml-1 text-black"></i>
                        </DropdownToggle>
                        <DropdownMenu right className="animate__animated animate__slideInRight">
                            <ul id="usermenu" class="" role="menu">
                                <li role="menuitem"><a class="dropdown-item" href="#">user option1</a></li>
                                <li role="menuitem"><a class="dropdown-item" href="#">user option2</a></li>
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