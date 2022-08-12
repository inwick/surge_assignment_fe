import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         user: sessionStorage.getItem("loggeduser"),
    //     }
    // }

    // logOut() {

    //     sessionStorage.clear();
    //     window.location = '/login';

    // }


    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="#" className="navbar-brand" style={{ marginLeft: '20px' }}>Surge Assignment</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            {/* <Link onClick={this.logOut.bind(this)} className="nav-link">Log out</Link> */}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}