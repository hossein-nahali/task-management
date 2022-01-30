import React, {useContext} from "react";
import './css/Dashboard.scss'

// import image
import HomeIcon from './img/home.png';
import AccountIcon from './img/user.png';
import Info from './img/info.png';

import {NavLink} from 'react-router-dom'
import ThingsContext from "../../Context/ContextA";

function Dashboard(props) {

    return (
        <div className={`head-dashboard ${props.MenuToggle ? 'active' : ''}`}>
            <div className="body-dashboard">
                <h3>Pages</h3>
                <ul>
                    <li>
                        <NavLink to="/">
                            <img src={HomeIcon} alt="HomeIcon"/>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Account">
                            <img src={AccountIcon} alt="AccountIcon"/>
                            Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/About">
                            <img src={Info} alt="Info"/>
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="developer">
                <p className="text-center">
                    Made by <span><a href="https://zil.ink/developer" target="_blank"
                                     rel="noreferrer">Hossein Nahali</a></span>
                </p>
            </div>
        </div>
    )
}

export default Dashboard;