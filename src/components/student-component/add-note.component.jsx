import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./student.css";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";

const AddNote = () => {

    //define navigation
    let navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    //submit details
    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            const note = {
                title,
                description,
            }
            // console.log(note);

            const response = await axios.post("http://localhost:5000/note/add", note)

            if (response.status === 200) {
                alert("Note Added!!!");
                navigate("/student-home");
            }

        } catch (error) {
            if (error.response.status === 409) {
                alert(error.response.data.message);
            }
            else
                alert(error);
        }

    }

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div style={{ marginTop: '50px' }} className='list-title'>
                    <hr />
                    <center>
                        <h2> Add Note </h2>
                    </center>
                    <hr />
                    <br /><br /><br />
                </div>


                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form onSubmit={(e) => submitDetails(e)} className="body-content-add" >
                            <Row style={{ marginTop: '20px' }}>
                                <Col>

                                    <div>
                                        <Form.Group >
                                            <label >Title:</label> <br />
                                            <input type="text"
                                                placeholder="Title"
                                                className="form-control"
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }} required={true} />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Description:</label> <br />
                                            <textarea
                                                placeholder="Description"
                                                className="form-control"
                                                onChange={(e) => {
                                                    setDescription(e.target.value);
                                                }} required={true} />
                                        </Form.Group><br />

                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit'>Add</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/student-home") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form >
                    </div></div>
            </Container >
        </ThemeProvider>
    )
}

export default AddNote;
