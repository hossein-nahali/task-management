import React, {useReducer, useState} from "react";
// import loadable
import loadable from '@loadable/component';
// import style
import './css/App.scss';
// import components
import HeaderApp from "../Header/HeaderApp";
import Dashboard from "../Dashboard/Dashboard";
// import Context
import Context from '../../Context/Tasks';
import {ThingsProvider} from '../../Context/ContextA';
// import Reducer
import AppReducer from '../../Reducers/AppReducer';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {auth} from "../../firebase";

// import Routs
const Home = loadable(() => import('../../Routes/Home/Home'))
const Account = loadable(() => import('../../Routes/Account/Account'))
const About = loadable(() => import('../../Routes/About/About'))

function App() {
    const [menu, SetMenu] = useState(true);
    const [uid, SetUid] = useState('');

    const [state, dispatch] = useReducer(AppReducer, {
        Tasks: []
    });

    const MenuToggle = () => {
        SetMenu(!menu)
    }

    return (
        <BrowserRouter>
            <ThingsProvider value={{
                uid,
                SetUid,
            }}>
                <Context.Provider value={{
                    Tasks: state.Tasks,
                    dispatch: dispatch
                }}>
                    <HeaderApp MenuToggle={() => MenuToggle()}/>
                    <Dashboard MenuToggle={menu}/>
                    <div className={'d-flex content'}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Routes>
                                        <Route path={'/'} exact element={<Home/>}/>
                                        <Route path={'/Account'} element={<Account/>}/>
                                        <Route path={'/About'} element={<About/>}/>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </Context.Provider>
            </ThingsProvider>
        </BrowserRouter>
    );
}

export default App;
