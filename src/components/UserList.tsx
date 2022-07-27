import React, {useEffect, useState} from 'react';
import {IUser} from "../models/IUser";
import {UserService} from "../services/UserService";

interface IState{
    loading : boolean;
    users : IUser[];
    errorMessage : string;
}
interface IProps{}

let UserList:React.FC<IProps> = () => {
    let [state , setState] = useState<IState>({
        loading : false,
        users : [] as IUser[],
        errorMessage : ''
    });

    useEffect(() => {
        setState({...state, loading : true});
        UserService.getAll().then((response) => {
            setState({
                ...state,
                loading : false,
                users : response.data
            })
        }).catch((error) => {
            setState({
                ...state,
                loading : false,
                errorMessage : error.message
            })
            console.log("error")
        });
    } , []);

    let {loading , users , errorMessage} = state;
    return(
        <React.Fragment>
            <button type="button" className="btn btn-danger float-right" onClick={() => UserService.deleteAll()}>Delete all rows</button>
            <a type="button" className="btn btn-info float-right" href="add">Add user</a>
            <div className="container">
                <div className="row">
                    <div className="col">
                    
                    
                   
                        <table className="table table-hover text-center table-striped">
                            <thead className="bg-success text-white">
                                <tr>
                                    <th>SNO</th>
                                    <th>first name</th>
                                    <th>last name</th>
                                    <th>email</th>
                                    <div className="bg-danger">🗑</div>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.length > 0 && users.map(user => {
                                        return(
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <button className="bg-danger" onClick={() => UserService.delete(user.id)}>Delete</button>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default UserList;