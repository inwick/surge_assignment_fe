import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "../student-component/student.css";

const UpdateUsers = () => {

    let navigate = useNavigate();
    const { id } = useParams();

    const [Id, setId] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [DateOfBirth, setDateOfBirth] = useState("")
    const [Mobile, setMobile] = useState("")
    const [Status, setStatus] = useState(true)
    const [Password, setPassword] = useState("")

    const fetchData = useCallback(async () => {
        try {
            const UserData = await axios({
                method: 'GET',
                url: `http://localhost:5000/note/${id}`
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
        } catch (error) {
            alert(error);
        };

    }, [id]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: Id,
                firstName: FirstName,
                lastName: LastName,
                email: Email,
                dateOfBirth: DateOfBirth,
                mobile: Mobile,
                status: Status,
                password: Password,
            }
            console.log(data);

            const response = await axios.post(`http://localhost:5000/user/update/${id}`, data)

            if (response.status === 200) {
                alert("User Updated!!!");
                navigate("/login");
            }

        } catch (error) {
            alert(error);
        }

    }

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div style={{ marginTop: '50px' }} className='list-title'>
                    <hr />
                    <center>
                        <h2> Set Your User Profile </h2>
                    </center>
                    <hr />
                    <br /><br /><br />
                </div>


                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form onSubmit={(e) => submitDetails(e)} className="body-content">
                            <Row style={{ marginTop: '20px' }}>
                                <Col>

                                    <div>

                                        <Form.Group  >
                                            <label >ID:</label> <br />
                                            <input type="text" value={Id} disabled />
                                        </Form.Group>

                                        <Form.Group  >
                                            <label >Email:</label> <br />
                                            <input type="text" value={Email} disabled />
                                        </Form.Group>

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
                                            <input type="text" value={DateOfBirth} onChange={(e) => {
                                                setDateOfBirth(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Mobile:</label> <br />
                                            <input type="text" value={Mobile} onChange={(e) => {
                                                setMobile(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Password:</label> <br />
                                            <input type="password" value={Password} onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} required />
                                        </Form.Group><br />


                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit'>Update Profile</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/login") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form >
                    </div></div>
            </Container >
        </ThemeProvider >
    )
}

export default UpdateUsers;
