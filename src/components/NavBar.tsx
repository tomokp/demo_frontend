import React from 'react';
import { Link } from 'react-router-dom';

interface IState{}
interface IProps{}

let NavBar:React.FC<IProps> = () => {
    return(
        <React.Fragment>
            <div className="container mt-3">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <a className="h3 fw-bold text-success" href='/'>Werknemers</a>
                            <p className="fst-italic">In deze applicatie kan je werknemers documenteren.</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default NavBar;