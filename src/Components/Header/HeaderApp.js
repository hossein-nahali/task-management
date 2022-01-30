import React from "react";

// import style
import './css/Header.scss'

// import images
import LogoIcon from './img/checklist.png';
import AccountIcon from '../Dashboard/img/account-icon.svg';
import {NavLink} from "react-router-dom";

import DashboardIcon from './img/dashboard.png';

function HeaderApp(props) {
    return (
        <header>
            <div className="container">
                <div className="col-12 body-header">
                    <div className="menu">
                        <div className="logo">
                            <NavLink to="/">
                                <img src={LogoIcon} alt="logo"/>
                                <p>Task Management</p>
                            </NavLink>
                        </div>
                        {/*${true ? `active` : ''}*/}
                        <div className={`dashboard`} onClick={props.MenuToggle}>
                            <img src={DashboardIcon} alt="logo"/>
                            <p>Dashboard</p>
                        </div>
                    </div>
                    <NavLink to="/Account">
                        <div className="account">
                            <img src={AccountIcon} alt="logo"/>
                            <p>Account</p>
                        </div>
                    </NavLink>

                </div>
            </div>
        </header>
    )
}

export default HeaderApp;