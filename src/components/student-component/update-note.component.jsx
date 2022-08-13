import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./student.css";

const UpdateNotes = () => {

    let navigate = useNavigate();
    const { id } = useParams();

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")

    const fetchData = useCallback(async () => {
        try {
            const NoteData = await axios({
                method: 'GET',
                url: `http://localhost:5000/note/byId/${id}`
            })
            let IData = NoteData.data;
            setTitle(IData.title)
            setDescription(IData.description)
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
                title: Title,
                description: Description,
            }

            const response = await axios.post(`http://localhost:5000/note/update/${id}`, data)

            if (response.status === 200) {
                alert("Note Updated!!!");
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
                    <hr />
                    <center>
                        <h2> Update Note </h2>
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
                                            <b> <label >Title:</label> <br /></b>
                                            <input type="text" value={Title} onChange={(e) => {
                                                setTitle(e.target.value);
                                            }} required /> <br /><br />
                                        </Form.Group>

                                        <Form.Group >
                                            <b>  <label >Description:</label> <br /></b>
                                            <textarea value={Description} onChange={(e) => {
                                                setDescription(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit'>Update</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/student-home") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form >
                    </div></div>
            </Container >
        </ThemeProvider >
    )
}

export default UpdateNotes;
