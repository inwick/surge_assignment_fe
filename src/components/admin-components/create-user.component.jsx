import React, { useState } from "react";
import { useRef } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

    const form = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status] = useState(false);
    const [accountType] = useState("student");

    const navigate = useNavigate();

    function addData(e) {
        e.preventDefault();

        const newStudent = {
            email,
            password,
            status,
            accountType,
        }

        axios.post("http://localhost:5000/user/", newStudent).then((res) => {
            alert(res.data)

            emailjs.sendForm('service_8bhabuf', 'template_bf3727s', form.current, 'GRR9bFBa7NcPWyN66')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            e.target.reset()

            navigate("/login");
        }).catch((err) => {
            alert("Registration failed!")
        })


    };

    return (
        <section>

            <h3>Create New User</h3>

            <form ref={form} onSubmit={addData} >

                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        placeholder="Enter email"
                        required={true}
                        className="form-control"
                        name='user_email'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                        required={true}
                        className="form-control"
                        name='message'
                        placeholder="Enter password"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </section>
    )

}

export default CreateUser