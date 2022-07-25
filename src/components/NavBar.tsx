import React from 'react';
import { Link } from 'react-router-dom';

interface IState{}
interface IProps{}

let NavBar:React.FC<IProps> = () => {
    return(
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">React Router</Link>
                </div>
            </nav>
        </React.Fragment>
    )
};
export default NavBar;