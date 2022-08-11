import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./admin.css";

const ViewUser = () => {

    let navigate = useNavigate();
    const { id } = useParams();

    const [Id, setId] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [DateOfBirth, setDateOfBirth] = useState("")
    const [Mobile, setMobile] = useState("")
    const [Status, setStatus] = useState("")

    const fetchData = useCallback(async () => {
        try {
            const NoteData = await axios({
                method: 'GET',
                url: `http://localhost:5000/user/${id}`
            })
            let IData = NoteData.data;
            setId(IData.id)
            setFirstName(IData.firstName)
            setLastName(IData.lastName)
            setEmail(IData.email)
            setDateOfBirth(IData.dateOfBirth)
            setMobile(IData.mobile)
            setStatus(IData.status)

        } catch (error) {
            alert(error);
        };

    }, [id]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div className='list-title'>

                    <center>
                        <h2> Student Profile </h2>
                    </center>

                    <br /><br /><br />
                </div>


                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form className="body-content">
                            <Row style={{ marginTop: '20px' }}>
                                <Col>

                                    <div>

                                        <Form.Group  >
                                            <label >ID:</label> <br />
                                            <input type="text" value={Id} disabled />
                                        </Form.Group>

                                        <Form.Group >
                                            <label >First Name:</label> <br />
                                            <input type="text" value={FirstName} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Last Name:</label> <br />
                                            <input type="text" value={LastName} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Email:</label> <br />
                                            <input type="text" value={Email} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Date of Birth:</label> <br />
                                            <input type="text" value={DateOfBirth} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Mobile:</label> <br />
                                            <input type="text" value={Mobile} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Status:</label> <br />
                                            <input type="text" value={Status} disabled />
                                        </Form.Group><br />

                                    </div>

                                    <br />
                                    <Button variant="outline-secondary" onClick={() => { navigate("/admin-home") }}>Back</Button>

                                </Col>

                            </Row>
                        </form >
                    </div></div>
            </Container >
        </ThemeProvider >
    )
}

export default ViewUser;
