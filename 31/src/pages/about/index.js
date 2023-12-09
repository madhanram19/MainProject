import React from 'react';
import { Link } from 'react-router-dom';


import user from '../../assets/images/user.png'
import lock from '../../assets/images/lock.png'
import login_bg from '../../assets/images/login_bg.png'
import message from '../../assets/images/message.png'

const Registerpage = () => {
    return (
        <div className="maincontent">
            <div className="pageContent">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mycard">
                                <div className="card-body p-md-5 p-3">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center fs-36 fw-700 mb-4">About Us</div>
                                                <div className="cmsCnt pt-4">
                                                    <h2>Our mission</h2>
                                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                                        unknown
                                                        printer took a galley of type and scrambled it to make a type specimen book. It has
                                                        survived
                                                        not only five centuries, but also the leap into electronic typesetting, remaining
                                                        essentially unchanged. It is a long established fact that a reader will be
                                                        distracted by the
                                                        readable content of a page when looking at its layout. The point of using Lorem
                                                        Ipsum is
                                                        that it has a more-or-less normal distribution of letters, as opposed to using
                                                        'Content
                                                        here, content here', making it look like readable English. Many desktop publishing
                                                        packages
                                                        and web page editors now use Lorem Ipsum as their default model text, and a search
                                                        for
                                                        'lorem ipsum' will uncover many web sites still in their infancy. Various versions
                                                        have
                                                        evolved over the years, sometimes by accident, sometimes on purpose (injected humour
                                                        and the
                                                        like</p>
                                                    <h2>Our Vision</h2>
                                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                                                        printer took a galley of type and scrambled it to make a type specimen book. It has survived
                                                        not only five centuries, but also the leap into electronic typesetting, remaining
                                                        essentially unchanged. It is a long established fact that a reader will be distracted by the
                                                        readable content of a page when looking at its layout. The point of using Lorem Ipsum is
                                                        that it has a more-or-less normal distribution of letters, as opposed to using 'Content
                                                        here, content here', making it look like readable English. Many desktop publishing packages
                                                        and web page editors now use Lorem Ipsum as their default model text, and a search for
                                                        'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                                                        evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the
                                                        like</p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registerpage;