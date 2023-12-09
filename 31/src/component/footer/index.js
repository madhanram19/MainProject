
import React from 'react';
import footerlogo from '../../assets/images/logo-light.png';
import { Link } from 'react-router-dom';
import './footer.scss';

function Footer() {
           return (
            <>
                   <footer className='footerMain'>
                       <div class="footerSec">
                           <div class="container">
                               <div class="row">
                                   <div class="col-lg-4 col-md-12">
                                       <div class="footerTitle">
                                           <img src={footerlogo} className="img-fluid logolight" />
                                       </div>
                                       <div class="footerTxt mb-3">
                                           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                       </div>
                                       <div class="Footersocials">
                                           <div>
                                               <a href="#" target="_blank" class="socialmediaLink">
                                                   <i class="fab fa-facebook"></i>
                                               </a>
                                           </div>
                                           <div>
                                               <a href="#" target="_blank" class="socialmediaLink">
                                                   <i class="fab fa-twitter"></i>
                                               </a>
                                           </div>
                                           <div>
                                               <a href="#" target="_blank" class="socialmediaLink">
                                                   <i class="fab fa-telegram"></i>
                                               </a>
                                           </div>
                                           <div>
                                               <a href="#" target="_blank" class="socialmediaLink">
                                                   <i class="fab fa-instagram"></i>
                                               </a>
                                           </div>
                                       </div>
                                   </div>
                                   <div class="col-lg-5 col-md-12">
                                       <div class="row justify-content-center">
                                           <div class="col-md-6 col-lg-6">
                                               <div class="footerTitle">About Us</div>
                                               <div>
                                                   <ul class="footerList">
                                                       <li><Link to="/aboutus">About</Link></li>
                                                       <li><Link to="/">Privacy policy</Link></li>
                                                       <li><Link to="/terms">Terms & Condtions</Link></li>
                                                       <li><Link to="/contactus">Contact us</Link></li>
                                                   </ul>
                                               </div>
                                           </div>

                                           <div class="col-md-6 col-lg-6">
                                               <div class="footerTitle">Services</div>
                                               <div>
                                                   <ul class="footerList">
                                                       <li><Link to="/">Cryptos</Link></li>
                                                       <li><Link to="/">Buy & Sell</Link></li>
                                                       <li><Link to="/faq">FAQ</Link></li>
                                                       <li><Link to="/">Help Center ?</Link></li>
                                                   </ul>
                                               </div>
                                           </div>
                                       </div>

                                   </div>
                                   <div class="col-lg-3 col-md-12">
                                       <div class="footerTitle">Subscribe Newletter</div>

                                       <div class="form-group formInputs">
                                           <input class="form-control footerinput" type="text" placeholder="Enter E-mail Address" />
                                       </div>
                                       <div>
                                           <button class="btn btn-primary fs-14 fw-700 rounded-pill py-1 mw-auto" type="button">Submit</button>
                                       </div>


                                   </div>
                               </div>

                           </div>
                       </div>

                       <div class="Footer-bottom">
                           <div class="container">
                               <div class="row">
                                   <div class="col-12 secondfooter pt-3 pb-4">
                                       <div class="text-center mx-auto">
                                           &copy; Copyright 2023 - Exchange
                                       </div>
                                   </div>
                               </div>

                           </div>
                       </div>
                   </footer>
            </>
        );
    
}
 
export default Footer;