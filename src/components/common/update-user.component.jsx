import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "../student-component/student.css";

const UpdateUsers = () => {

    let navigate = useNavigate();

    const [Id, setId] = useState()
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [DateOfBirth, setDateOfBirth] = useState()
    const [Mobile, setMobile] = useState()
    const [Status, setStatus] = useState(true)
    const [Password, setPassword] = useState("")
    const [AccountType, setAccountType] = useState("")
    const temp = sessionStorage.getItem("loggeduser")

    const fetchData = async () => {

        try {
            const UserData = await axios({
                method: 'GET',
                url: `http://localhost:5000/user/${temp}`
            })
            let IData = UserData.data;
            setId(IData.id)
            setFirstName(IData.firstName)
            setLastName(IData.lastName)
            setEmail(IData.email)
            setDateOfBirth(IData.dateOfBirth)
            setMobile(IData.mobile)
            setStatus(IData.status)
            setPassword(IData.password)
            setAccountType(IData.accountType)

        } catch (error) {
            alert(error);
        };

    };

    useEffect(() => {
        fetchData()
    }, [])

    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                id: Id,
                firstName: FirstName,
                lastName: LastName,
                email: Email,
                dateOfBirth: DateOfBirth,
                mobile: Mobile,
                status: true,
                password: Password,
                accountType: "Student",
            }

            const response = await axios.put(`http://localhost:5000/user/update/${temp}`, updateData)

            if (response.status === 200) {
                alert("User Updated!!!");
                navigate("/student-home");
            }

        } catch (error) {
            alert(error);
        }

    }

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div style={{ marginTop: '50px' }} className='list-title'>
                    <center>
                        <h2> Set Your User Profile </h2>
                        <h6 style={{ color: 'red' }}> Make sure to Add a new password !</h6>
                    </center>
                    <br />
                </div>


                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form onSubmit={(e) => submitDetails(e)} className="body-content">
                            <Row style={{ marginTop: '20px' }}>
                                <Col>

                                    <div>
                                        <Form.Group  >
                                            <b><label >Your User ID is :</label> {Id} <br /></b>
                                        </Form.Group><br />

                                        <Form.Group  >
                                            <b> <label >Email:</label> {Email} <br /></b>
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >First Name:</label> <br />
                                            <input type="text" value={FirstName} onChange={(e) => {
                                                setFirstName(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Last Name:</label> <br />
                                            <input type="text" value={LastName} onChange={(e) => {
                                                setLastName(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Date of Birth:</label> <br />
                                            <input type="date" value={DateOfBirth} onChange={(e) => {
                                                setDateOfBirth(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Mobile:</label> <br />
                                            <input type="text" value={Mobile}
                                                pattern="[0-9]{10}"
                                                title="Must contain 10 numbers for the mobile number"
                                                onChange={(e) => {
                                                    setMobile(e.target.value);
                                                }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Add New Password:</label> <br />
                                            <input type="password" onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit' style={{ width: '200px' }}>Update Profile</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/login") }}>Cancel</Button>
                                    <br /><br />
                                </Col>

                            </Row>
                        </form >
                        <br />
                    </div></div>
            </Container >
        </ThemeProvider >
    )
}

export default UpdateUsers;
