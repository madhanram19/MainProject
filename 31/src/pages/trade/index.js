import React, { useEffect, useState } from 'react';
import Header from '../../component/header2';
import MultiRangeSlider from "multi-range-slider-react";

import './trade.scss';

import trade_graph from '../../assets/images/trade_graph.png';
import searchIcon from '../../assets/images/searchIcon.png';
import tabIcon1 from '../../assets/images/tabIcon1.png';
import tabIcon2 from '../../assets/images/tabIcon2.png';
import tabIcon3 from '../../assets/images/tabIcon3.png';

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';


const TradePage = () => {
    const[activeTab, setActiveTab] = useState('3');
    const[activeTab2, setActiveTab2] = useState('1');
    const[activeTab3, setActiveTab3] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab)
    }

    const toggle2 = tab => {
        if(activeTab2 !== tab) setActiveTab2(tab)
    }
    const toggle3 = tab => {
        if(activeTab3 !== tab) setActiveTab3(tab)
    }

    const persentageval = ["0%", "25%", "50%", "75%", "100%"];
  
    // useEffect(() => {
    //     document.body.classList.add('dark-theme');
    // }, []);

    return ( 
        <>
        <Header />
        <div className="mainAppcontent tradepagemain">
    <div className="px-3">
        <div className="row form-row">
            <div className="col-xl-7">
                <div className="graph mb-2">
                    <img src={trade_graph} className="img-fluid w-100" style={{height: "494px"}} alt="" />
                </div>

                <div className="card tradecard leftsidetable">
                    <div className="card-body p-2">
                        <div className="row justify-content-end">
                            <div className="col-md-4">
                                <div className="form-group formInputs mb-2">
                                    <div className="input-group iconinput">
                                        <input className="form-control py-0 border-0" type="text" name="" placeholder="Enter Your Name" />
                                        <div className="input-group-append">
                                        <span className="input-group-text">
                                            <img src={searchIcon} alt="" />
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mytabs lefttabsec1'>
                        <Nav pills>
                            <NavItem>
                            <NavLink className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}>
                                Open Orders
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}>
                                Order History
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}>
                                Trade History
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                            <div className="h-100 tablesectiondiv">
                                    <div className="gridhead column10">
                                        <div className="item1">Time</div>
                                        <div className="item2">Pair</div>
                                        <div>Type</div>
                                        <div>Side</div>
                                        <div>Price(USDT)</div>
                                        <div>Amount(BTC)</div>
                                        <div>Total(USDT)</div>
                                        <div>Executed</div>
                                        <div>Unexecuted </div>
                                        <div>Action</div>
                                    </div>
                                    <div className="gridbody tableleft scroller">
                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>
                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                    </div>

                                </div>
                            </TabPane>
                            <TabPane tabId="2">
                            <div className="h-100 tablesectiondiv">
                                    <div className="gridhead column10">
                                        <div className="item1">Time</div>
                                        <div className="item2">Pair</div>
                                        <div>Type</div>
                                        <div>Side</div>
                                        <div>Price(USDT)</div>
                                        <div>Amount(BTC)</div>
                                        <div>Total(USDT)</div>
                                        <div>Executed</div>
                                        <div>Unexecuted </div>
                                        <div>Action</div>
                                    </div>
                                    <div className="gridbody tableleft scroller">
                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>
                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                    </div>

                                </div>
                            </TabPane>
                            <TabPane tabId="3">
                            <div className="h-100 tablesectiondiv">
                                    <div className="gridhead column10">
                                        <div className="item1">Time</div>
                                        <div className="item2">Pair</div>
                                        <div>Type</div>
                                        <div>Side</div>
                                        <div>Price(USDT)</div>
                                        <div>Amount(BTC)</div>
                                        <div>Total(USDT)</div>
                                        <div>Executed</div>
                                        <div>Unexecuted </div>
                                        <div>Action</div>
                                    </div>
                                    <div className="gridbody tableleft scroller">
                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>
                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-green">Completed </div>
                                        </div>

                                        <div className="gridrow column10">
                                            <div className="item1">22-07-2021</div>
                                            <div className="item2"> BTC/USDT</div>
                                            <div className="text-green">Buy</div>
                                            <div>Left</div>
                                            <div>147.02589 </div>
                                            <div>0.064886 </div>
                                            <div>1792.02556 </div>
                                            <div>Approved </div>
                                            <div>Normal </div>
                                            <div className="text-red">Cancelled </div>
                                        </div>

                                    </div>

                                </div>
                            </TabPane>
                        </TabContent>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="col-xl-5">
                <div className="row form-row">
                    <div className="col-md-6">
                        <div className="card tradecard rightsideHeight">
                            <div className="card-body p-2 h-100">
                                <div className="d-flex">
                                    <div className="fs-14 fw-400">
                                        Order Book
                                    </div>
                                </div>
                                <div className="mt-2 h-100">
                                    <div className='mytradetabsIcon'>
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink className={classnames({active: activeTab2 === '1'})} onClick={() => {toggle2('1');}}>
                                                    <img src={tabIcon1} alt="" />
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({active: activeTab2 === '2'})} onClick={() => {toggle2('2');}}>
                                                <img src={tabIcon2} alt="" />
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({active: activeTab2 === '3'})} onClick={() => {toggle2('3');}}>
                                                <img src={tabIcon3} alt="" />
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={activeTab2}>
                                            <TabPane tabId='1'>
                                            <div className="h-100">
                                                <div className="gridhead">
                                                    <div>Price(USDT)</div>
                                                    <div>Amount(BTC)</div>
                                                    <div>Total(BTC)</div>
                                                </div>
                                                <div className="gridbody tablefirst scroller">
                                                    <div className="gridrow">
                                                        <div className="text-red">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-red">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-red">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-red">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-red">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div>62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                </div>
                                                <div className="px-2">
                                                    <span className="text-red fs-16 fw-600">62,972.45</span>
                                                </div>
                                                <div className="gridbody tablesecond scroller">
                                                    <div className="gridrow">
                                                        <div className="text-green">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-green">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-green">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-green">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-green">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                    <div className="gridrow">
                                                        <div className="text-green">62,974.85</div>
                                                        <div>0.001186 </div>
                                                        <div>0.00324</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </TabPane>
                                            <TabPane tabId='2'>
                                                tab 2 content here
                                            </TabPane>
                                            <TabPane tabId='3'>
                                                tab 3 content here
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                    

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card tradecard rightsideHeight">
                            <div className="card-body p-2 h-100">
                                <div className="h-100">
                                    <div className="gridhead">
                                        <div>Price(USDT)</div>
                                        <div>Amount(BTC)</div>
                                        <div>Total(BTC)</div>
                                    </div>
                                    <div className="gridbody scroller tablethird">
                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>

                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-green">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                        <div className="gridrow">
                                            <div className="text-red">62,974.85</div>
                                            <div>0.001186 </div>
                                            <div>0.00324</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <div className="card tradecard">
                            <div className="card-body p-2">
                                <div className="mytabs mytabsright">
                                    <Nav pills>
                                        <NavItem>
                                            <NavLink className={classnames({active: activeTab3 === '1'})} onClick={()=>{toggle3('1');}}>Limit</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={classnames({active: activeTab3 === '2'})} onClick={()=>{toggle3('2');}}>Market</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={classnames({active: activeTab3 === '3'})} onClick={()=>{toggle3('3');}}>Sport-Limit</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab3}>
                                        <TabPane tabId='1'>
                                            <div className="position-relative pt-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <div className="btn btn-buy btn-block lh-26" type="button">Buy</div>

                                                            <div className="d-flex justify-content-between mt-1 mb-3">
                                                                <div>Buy BTC</div>
                                                                <div>-- USDT</div>
                                                            </div>
                                                        </div>

                                                        {/* <div className="form-group formInputs mb-2">
                                                            <div className="input-group iconinput">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                                            <span className="text-gray2">Stop</span>
                                                                    </span>
                                                                </div>
                                                                <input className="form-control py-0 border-0 text-right" type="text" name="" placeholder="" />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">
                                                                                        <span className="text-gray2">&nbsp;&nbsp;BTC</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        <div className="form-group formInputs mb-2">
                                                            <div className="input-group iconinput">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                                            <span className="text-gray2">Price</span>
                                                                    </span>
                                                                </div>
                                                                <input className="form-control py-0 border-0 text-right" type="text" name="" placeholder="" />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text ">
                                                                                        <span className="text-gray2">USDT</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group formInputs mb-2">
                                                            <div className="input-group iconinput">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text ">
                                                                                            <span className="text-gray2">Amount</span>
                                                                    </span>
                                                                </div>
                                                                <input className="form-control py-0 border-0 text-right" type="text" name="" placeholder="" /> 
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">
                                                                                        <span className="text-gray2">&nbsp;&nbsp;BTC</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <div className="custom-slider">
                                                            <ngx-slider [(value)]="minValue" [(highValue)]="maxValue" [options]="options"></ngx-slider>
                                                        </div> */}

                                                        <div className='custom-slider'>
                                                            <MultiRangeSlider 
                                                                className='customslider'
                                                                labels={persentageval}
                                                                ruler= {false}
                                                                min={1}
                                                                max={5}
                                                                minValue={1}
                                                                maxValue={5}
                                                                step={1}
                                                                stepOnly={true}
                                                                barLeftColor= '#E8E1FF'
                                                                barRightColor= '#E8E1FF'
                                                                barInnerColor= '#805CFF'>                                                                    
                                                            </MultiRangeSlider>
                                                        </div>

                                                        <div className="fs-12 fw-500 text-center my-2">Fee : 0.000214 USDT</div>
                                                        <div>
                                                            <button className="btn btn-green btn-block rounded-pill" type="button">Buy</button>
                                                        </div>



                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <div className="btn btn-sell btn-block lh-26" type="button">Sell</div>
                                                            <div className="d-flex justify-content-between mt-1 mb-3">
                                                                <div>Sell BTC</div>
                                                                <div>-- USDT</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="form-group formInputs mb-2">
                                                            <div className="input-group iconinput">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                                            <span className="text-gray2">Stop</span>
                                                                    </span>
                                                                </div>
                                                                <input className="form-control py-0 border-0 text-right" type="text" name="" placeholder="" />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">
                                                                                        <span className="text-gray2">&nbsp;&nbsp;BTC</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        <div className="form-group formInputs mb-2">
                                                            <div className="input-group iconinput">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                         <span className="text-gray2">Price</span>
                                                                    </span>
                                                                </div>
                                                                <input className="form-control py-0 border-0 text-right" type="text" name="" placeholder="" />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text ">
                                                                                        <span className="text-gray2">USDT</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group formInputs mb-2">
                                                            <div className="input-group iconinput">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text ">
                                                                                            <span className="text-gray2">Amount</span>
                                                                    </span>
                                                                </div>
                                                                <input className="form-control py-0 border-0 text-right" type="text" name="" placeholder="" />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">
                                                                                        <span className="text-gray2">&nbsp;&nbsp;BTC</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='custom-slider'>
                                                            <MultiRangeSlider 
                                                                className='customslider'
                                                                labels={persentageval}
                                                                ruler= {false}
                                                                min={1}
                                                                max={5}
                                                                minValue={1}
                                                                maxValue={5}
                                                                step={1}
                                                                stepOnly={true}
                                                                barLeftColor= '#E8E1FF'
                                                                barRightColor= '#E8E1FF'
                                                                barInnerColor= '#805CFF'>                                                                    
                                                            </MultiRangeSlider>
                                                        </div>

                                                        <div className="fs-12 fw-500 text-center my-2">Fee : 0.000214 USDT</div>
                                                        <div>
                                                            <button className="btn btn-red btn-block rounded-pill" type="button">Sell</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId='2'></TabPane>
                                        <TabPane tabId='3'></TabPane>
                                    </TabContent>                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
<footer className="footerbottom1">
    <div className="text-center mx-auto pt-1 pb-2 text-lightblue">
        &copy; Copyright 2023 - Exchange
    </div>
</footer>
        </>
     );
}
 
export default TradePage;