import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        // this.onChangeFirstName = this.onChangeFirstName.bind(this);
        // this.onChangeLastName = this.onChangeLastName.bind(this);
        // this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
        // this.onChangeMobile = this.onChangeMobile.bind(this);
        // this.onChangeStatus = this.onChangeStatus.bind(this);
        // this.onChangeAccountType = this.onChangeAccountType.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            // firstName: '',
            // lastName: '',
            // dateOfBirth: new Date(),
            // mobile: 0,
            // status: false,
            // accountType: '',
        }
    }

    // onChangeFirstName(e) {
    //     this.setState({
    //         firstName: e.target.value
    //     })
    // }

    // onChangeLastName(e) {
    //     this.setState({
    //         lastName: e.target.value
    //     })
    // }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    // onChangeDateOfBirth(e) {
    //     this.setState({
    //         dateOfBirth: e.target.value
    //     })
    // }

    // onChangeMobile(e) {
    //     this.setState({
    //         mobile: e.target.value
    //     })
    // }

    // onChangeStatus(e) {
    //     this.setState({
    //         status: e.target.value
    //     })
    // }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    // onChangeAccountType(e) {
    //     this.setState({
    //         accountType: e.target.value
    //     })
    // }

    onSubmit(e) {
        e.preventDefault();

        const user = {

            email: this.state.email,
            password: this.state.password,
            // firstName: this.state.firstName,
            // lastName: this.state.lastName,
            // dateOfBirth: this.state.dateOfBirth,
            // mobile: this.state.mobile,
            // status: this.state.status,
            // accountType: this.state.accountType,
        }

        console.log(user);

        axios.post('http://localhost:5000/user/add', user)
            .then(res => console.log(res.data));

    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}