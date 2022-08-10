import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeProvider, Container, Table, Row, Col } from "react-bootstrap";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./student.css";
import Pagination from './Pagination';
// import moment from 'moment'

const StudentHome = () => {

    const [Notes, setNotes] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfFirstItem, setindexOfFirstItem] = useState(0);
    const [indexOfLastItem, setindexOfLastItem] = useState(3);
    const [recordsPerPage] = useState(4);
    // const [retrievedData, setretrievedData] = useState([])

    //fetch and set retrived data 
    const fetchData = useCallback(async () => {
        try {
            const NotesData = await axios({
                method: 'GET',
                url: `http://localhost:5000/note`
            })
            setNotes(NotesData.data)
            // setretrievedData(NotesData.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    //slice retrieved data for the pagination
    const SlicedNotes = Notes.slice(indexOfFirstItem, indexOfLastItem);

    //delete Note
    const onDeleteNotes = async (id) => {
        if (window.confirm('Are you sure, you want to delete the selected Note?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `http://localhost:5000/note/${id}`
                })
                alert("Selected Note is Deleted !!")
                fetchData()
            } catch (error) {
                alert(error)
            }
        }
    }

    // //filter data
    // const filterData = (obj, key) => {

    //     const results = obj.filter(o =>
    //         Object.keys(o).some(k => o[k].toString().toLowerCase().includes(key.toLowerCase())));

    //     setSubmissionTypes(results);

    // }

    // //search function
    // const handleSearch = (e) => {

    //     const k = e.target.value.toLowerCase()

    //     filterData(retrievedData, k);


    // }

    // //data conversion
    // function convertDates(date) {
    //     return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    // }


    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container><br /><br />

                {/* <div class="fontuser" style={{ float: 'right' }}>

                    <input className='main-search' placeholder="Search" type="text" name="search" style={{ width: '400px', height: '40px', marginLeft: '100px' }} onChange={(e) => {
                        handleSearch(e);
                    }} />
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>


                </div><br /><br /><br /> */}

                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h1>  Student Home  </h1> </div>

                <Row className="list-title">
                    <Col>
                        <h2 style={{ fontWeight: '600' }}>My Note List</h2>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Link className='btn btn-outline-primary' to={("/student-add-note")} >Create New Note</Link>
                    </Col>
                </Row>

                <Row style={{ marginTop: '50px', marginBottom: '50px' }} className='body-content'>
                    {SlicedNotes.length > 0 ?
                        <Table responsive hover>

                            <thead>
                                <tr>
                                    <th>Title </th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    SlicedNotes && SlicedNotes.map((note) => (
                                        <tr>
                                            <td key="itemTitle">{note.title}</td>
                                            <td key="itemDec">{note.description}</td>
                                            <td>  <Link to={`/student-update-note/${note._id}`} ><FontAwesomeIcon icon={faPenToSquare} /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to={""} onClick={() => onDeleteNotes(note._id)}><FontAwesomeIcon icon={faTrashCan} /></Link>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </Table>
                        : <span style={{ display: 'flex', justifyContent: 'center' }}>
                            Entries Unavailable !
                        </span>
                    }
                    <Pagination
                        itemsCount={Notes.length}
                        itemsPerPage={recordsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setindexOfLastItem={setindexOfLastItem}
                        setindexOfFirstItem={setindexOfFirstItem}
                        alwaysShown={false}
                    />
                </Row>
            </Container>
        </ThemeProvider >

    )
}

export default StudentHome;