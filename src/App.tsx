import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserList from "./components/UserList";
import AddEmployee from './components/AddEmployee';
import AppRoutes from "./AppRoutes";
import NavBar from './components/NavBar';

function App() {
    return (
        <React.Fragment>
            <NavBar/>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
