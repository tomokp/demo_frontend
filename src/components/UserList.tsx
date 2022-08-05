import { getValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';
import { IUser } from "../models/IUser";
import { UserService } from "../services/UserService";

interface IState {
    loading: boolean;
    users: IUser[];
    errorMessage: string;
    generateAmount: string;
}
interface IProps { }

let UserList: React.FC<IProps> = () => {
    let [state, setState] = useState<IState>({
        loading: false,
        users: [] as IUser[],
        errorMessage: '',
        generateAmount: "3"
    });

    const deleteUser = (user: IUser) => {
        try {
            UserService.delete(user.id);
        } catch (error) {
            console.log("test")
            return;
        }
        const userIndex = state.users.indexOf(user);
        if (userIndex !== undefined) {
            const updatedUsers = [...state.users];
            updatedUsers.splice(userIndex, 1)

            setState({
                loading: state.loading,
                users: updatedUsers,
                errorMessage: state.errorMessage,
                generateAmount: state.generateAmount
            
            });
        }
    }

    const deleteAllUsers = () => {
        UserService.deleteAll();

        setState({
            loading: state.loading,
            users: [],
            errorMessage: state.errorMessage,
            generateAmount: state.generateAmount
        });
    }

    const generateUsers = (amount: number) => {
        const userIndex = UserService.generate(amount);
        if (userIndex !== undefined) {
            userIndex.then(function (result) {
                const newGeneratedUsers = result.data
                setState({
                    loading: state.loading,
                    users: [...users, ...result.data],
                    errorMessage: state.errorMessage,
                    generateAmount: state.generateAmount
                });
            })
        } else {
            console.log("No valid amount of generated users")
            setState({
                loading: state.loading,
                users: [...users],
                errorMessage: state.errorMessage,
                generateAmount: state.generateAmount
            });
        }



        const updatedUsers = [...state.users];
        //console.log(updatedUsers)

    }

    const handleChange = (amount : string)=> {
        setState({
            loading: state.loading,
            users: [...users],
            errorMessage: state.errorMessage,
            generateAmount: "4"
        });
    }

    useEffect(() => {
        setState({ ...state, loading: true });
        UserService.getAll().then((response) => {
            setState({
                ...state,
                loading: false,
                users: response.data
            })
        }).catch((error) => {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
            console.log("error")
        });
    }, []);

    let { loading, users, errorMessage } = state;
    return (
        <React.Fragment>
            <button className="btn btn-neutral float-right background-red">randomized users:<input type="text"
                className="form-control"
                id="firstName"
                required
                defaultValue={state.generateAmount}
                onChange={() => handleChange("2")}
                name="firstName" /><a className="btn btn-success text-white" onClick={() => generateUsers(Number(state.generateAmount))}>Generate</a></button>
            <a type="button" className="btn btn-info float-right" href="add">Add custom user</a>
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
                                    <th className="bg-danger" style={{
                                            cursor: 'pointer',
                                        }} onClick={() => deleteAllUsers()}>🗑</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.length > 0 && users.map(user => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td><button className="bg-danger" onClick={() => deleteUser(user)}>Delete</button></td>
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