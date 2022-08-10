import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeProvider, Container, Table, Row, Col } from "react-bootstrap";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./admin.css";
import Pagination from './Pagination';
// import moment from 'moment'

const AdminHome = () => {

    const [Users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfFirstItem, setindexOfFirstItem] = useState(0);
    const [indexOfLastItem, setindexOfLastItem] = useState(3);
    const [recordsPerPage] = useState(4);
    // const [retrievedData, setretrievedData] = useState([])

    //fetch and set retrived data 
    const fetchData = useCallback(async () => {
        try {
            const UsersData = await axios({
                method: 'GET',
                url: `http://localhost:5000/user`
            })
            setUsers(UsersData.data)
            // setretrievedData(UsersData.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    //slice retrieved data for the pagination
    const SlicedUsers = Users.slice(indexOfFirstItem, indexOfLastItem);



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

                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h1>  Admin Home  </h1> </div>

                <Row className="list-title">
                    <Col>
                        <h2 style={{ fontWeight: '600' }}>Users List</h2>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Link className='btn btn-outline-primary' to={("/create-user")} >Create New User</Link>
                    </Col>
                </Row>

                <Row style={{ marginTop: '50px', marginBottom: '50px' }} className='body-content'>
                    {SlicedUsers.length > 0 ?
                        <Table responsive hover>

                            <thead>
                                <tr>
                                    <th>ID </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    SlicedUsers && SlicedUsers.map((user) => (
                                        <tr>
                                            <td key="itemId">{user.id}</td>
                                            <td key="itemName">{user.firstName} {user.lastName}</td>
                                            <td key="emailId">{user.email}</td>
                                            <td>  <Link to={`/student-update-user/${user._id}`} ><FontAwesomeIcon icon={faPenToSquare} /></Link>
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
                        itemsCount={Users.length}
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

export default AdminHome;