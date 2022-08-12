import React, { useState } from "react";
import { useRef } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom'
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";

const CreateUser = () => {

    function Random() {
        var maxNumber = 100;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        return randomNumber;
    }

    const form = useRef();
    const [id] = useState(Random);
    const [firstName] = useState("");
    const [lastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth] = useState("");
    const [mobile] = useState("");
    const [password, setPassword] = useState("");
    const [status] = useState(false);
    const [accountType] = useState("Student");

    const navigate = useNavigate();

    function addData(e) {
        e.preventDefault();

        const newStudent = {
            id,
            firstName,
            lastName,
            email,
            dateOfBirth,
            mobile,
            password,
            status,
            accountType,
        }

        console.log(newStudent);

        axios.post("http://localhost:5000/user/", newStudent).then((res) => {
            alert(res.data)

            emailjs.sendForm('service_8bhabuf', 'template_bf3727s', form.current, 'GRR9bFBa7NcPWyN66')
                .then((result) => {
                    console.log("good", result.text);
                }, (error) => {
                    console.log("bad", error.text);
                });
            e.target.reset()

            navigate("/login");
        }).catch((err) => {
            alert("Registration failed. This email already have an account!")
        })

    };

    return (


        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div style={{ marginTop: '50px' }} className='list-title'>
                    <hr />
                    <center>
                        <h2> Add User </h2>
                    </center>
                    <hr />
                    <br /><br /><br />
                </div>


                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form ref={form} onSubmit={(e) => addData(e)} className="body-content-add" >
                            <Row style={{ marginTop: '20px' }}>
                                <Col>

                                    <div>
                                        <Form.Group >
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
                                        </Form.Group><br />

                                        <Form.Group >
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
                                        </Form.Group><br />

                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit' style={{ width: '150px' }}>Create User</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/admin-home") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form >
                    </div></div>
            </Container >
        </ThemeProvider>

        // <section>

        //     <h3>Create New User</h3>

        //     <form ref={form} onSubmit={addData} >

        //         <div className="form-group">
        //             <label>Email: </label>
        //             <input type="email"
        //                 placeholder="Enter email"
        //                 required={true}
        //                 className="form-control"
        //                 name='user_email'
        //                 onChange={(e) => {
        //                     setEmail(e.target.value);
        //                 }}
        //             />
        //         </div>

        //         <div className="form-group">
        //             <label>Password: </label>
        //             <input type="password"
        //                 required={true}
        //                 className="form-control"
        //                 name='message'
        //                 placeholder="Enter password"
        //                 pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
        //                 title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        //                 onChange={(e) => {
        //                     setPassword(e.target.value);
        //                 }}
        //             />
        //         </div>

        //         <div className="form-group">
        //             <input type="submit" value="Create User" className="btn btn-primary" />
        //         </div>
        //     </form>
        // </section>
    )

}

export default CreateUser