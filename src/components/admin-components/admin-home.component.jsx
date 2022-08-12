import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            id: '',
            email: '',
            _id: '',
        }
        this.columns = [
            {
                key: "id",
                text: "User ID",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "firstName",
                text: "First Name",
                className: "address",
                align: "left",
                sortable: true
            },
            {
                key: "lastName",
                text: "Last Name",
                className: "address",
                align: "left",
                sortable: true
            },
            {
                key: "email",
                text: "Email",
                className: "address",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "View",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (

                        <Fragment>
                            <Link to={`/student-view-user/${record._id}`} > <button
                                className="btn btn-primary btn-sm"
                                style={{ marginRight: '5px' }}>
                                View
                            </button></Link>
                        </Fragment >
                    );
                }
            },

        ];
        this.config = {
            page_size: 5,
            length_menu: [10, 20, 50],
            button: {
                excel: false,
                print: false,
                extra: false,
            },
        }
        this.extraButtons = [
            {
                className: "btn btn-primary buttons-pdf",
                title: "Export TEst",
                children: [
                    <span>
                        <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
                    </span>
                ],
                onClick: (event) => {
                    console.log(event);
                },
            },
            {
                className: "btn btn-primary buttons-pdf",
                title: "Export TEst",
                children: [
                    <span>
                        <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
                    </span>
                ],
                onClick: (event) => {
                    console.log(event);
                },
                onDoubleClick: (event) => {
                    console.log("doubleClick")
                }
            },
        ]
    }

    componentDidMount(props) {
        axios.get("http://localhost:5000/user")
            .then(res => {
                this.setState({ records: res.data });
            }
            )
    }

    setErrorMsg(err) {
        this.setState = {
            errorMsg: err
        }
    }

    render() {
        return (
            <div>
                <hr />
                <h4>User accounts</h4>
                <Link style={{ float: "right", marginTop: "-43px" }} className='btn btn-outline-primary' to={("/create-user")} >Create New User</Link>
                <hr />
                <br />
                <ReactDatatable
                    config={this.config}
                    records={this.state.records}
                    columns={this.columns}
                    extraButtons={this.extraButtons}
                />
            </div>
        )
    }
}

