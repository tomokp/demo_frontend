import { getValue } from '@testing-library/user-event/dist/utils';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IUser } from "../models/IUser";
import { UserService } from "../services/UserService";

interface IState {
    loading: boolean;
    users: IUser[];
    errorMessage: string;
    generateAmount: string;
    show: boolean;
    selectedData: IUser;

}
interface IProps {
}

var newFirstName: string;
var newLastName: string;
var newEmail: string;

let UserList: React.FC<IProps> = () => {
    let [state, setState] = useState<IState>({
        loading: false,
        users: [] as IUser[],
        errorMessage: '',
        generateAmount: "3",
        show: false,
        selectedData: {
            firstName: "",
            lastName: "",
            email: ""
        }
    });

    const onFirstNameChange = (firstname: string) => {
        newFirstName = firstname;
    }

    const onLastNameChange = (lastname: string) => {
        newLastName = lastname;
    }

    const onEmailChange = (email: string) => {
        newEmail = email;
        console.log(newEmail);
        
    }

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
                generateAmount: state.generateAmount,
                show: false,
                selectedData: {
                    firstName: "",
                    lastName: "",
                    email: ""
                }

            });
        }
    }

    const deleteAllUsers = () => {
        UserService.deleteAll();

        setState({
            loading: state.loading,
            users: [],
            errorMessage: state.errorMessage,
            generateAmount: state.generateAmount,
            show: false,
            selectedData: {
                firstName: "",
                lastName: "",
                email: ""
            }
        });
    }

    const hideModal = () => {
        setState({
            loading: state.loading,
            users: [...users],
            errorMessage: state.errorMessage,
            generateAmount: state.generateAmount,
            show: false,
            selectedData: {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail
            }
        });
        console.log({...state})
        UserService.update(state.selectedData)
    }

    const handleClick = (selectedRec: IUser) => {
        setState({
            loading: state.loading,
            users: [...users],
            errorMessage: state.errorMessage,
            generateAmount: state.generateAmount,
            show: true,
            selectedData: selectedRec
        });
    }

    const Modal = ({ handleClose, details }: { handleClose: any, details: IUser }) => {
        return (
            <div className="modal display-block">
                <section className="modal-main">
                    <div className="App">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">SNO</th>
                                    <th scope="col">first name</th>
                                    <th scope="col">last name</th>
                                    <th scope="col">email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{details?.id}</td>
                                    <td><input className="form-control" id="firstName" name="firstName" required type="text" defaultValue={state.selectedData.firstName} onChange={(e) => onFirstNameChange(e.target.value)}></input></td>
                                    <td><input type="text" defaultValue={state.selectedData.lastName} onChange={(e) => onLastNameChange(e.target.value)}></input></td>
                                    <td><input type="text" defaultValue={details?.email} onChange={(e : any) => onEmailChange(e.target.value)}></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className='bg-danger' onClick={handleClose}>close without saving</button>
                </section>
            </div>
        );
    };

    const generateUsers = (amount: number) => {
        const userIndex = UserService.generate(amount);
        if (userIndex !== undefined) {
            userIndex.then(function (result) {
                setState({
                    loading: state.loading,
                    users: [...users, ...result.data],
                    errorMessage: state.errorMessage,
                    generateAmount: state.generateAmount,
                    show: false,
                    selectedData: {
                        firstName: "",
                        lastName: "",
                        email: ""
                    }
                });
            })
        } else {
            console.log("No valid amount of generated users")
            setState({
                loading: state.loading,
                users: [...users],
                errorMessage: state.errorMessage,
                generateAmount: state.generateAmount,
                show: false,
                selectedData: {
                    firstName: "",
                    lastName: "",
                    email: ""
                }
            });
        }



        const updatedUsers = [...state.users];
        //console.log(updatedUsers)

    }

    const handleChange = (amount: string) => {
        setState({
            loading: state.loading,
            users: [...users],
            errorMessage: state.errorMessage,
            generateAmount: amount,
            show: false,
            selectedData: {
                firstName: "",
                lastName: "",
                email: ""
            }
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
                onChange={(e) => handleChange(e.target.value)}
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
                                    <th className="bg-info">edit</th>
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
                                                <td><button className="bg-info" onClick={() => handleClick(user)}>🔎</button></td>
                                                <td><button className="bg-danger" onClick={() => deleteUser(user)}>Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div>
                            {state.show && <Modal handleClose={hideModal} details={state.selectedData} />}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default UserList;