import { Component, ChangeEvent } from "react";
import { UserService } from "../services/UserService";
import { IUser } from "../models/IUser";
type Props = {};
type State = IUser & {
    submitted: boolean
    };
export default class AddEmployee extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.newEmployee = this.newEmployee.bind(this);
        this.state = {
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            submitted: false
        };
    }
    onChangeFirstName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: e.target.value
        });
    }
    saveEmployee() {
        const data: IUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        };
        UserService.create(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    newEmployee() {
        this.setState({
            id: null,
            firstName: "",
            lastName: "",
            submitted : false
        });
    }
    render() {
        const { submitted, firstName, lastName, email } = this.state;
    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={firstName}
                onChange={this.onChangeFirstName}
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
    }
}