import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
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
    const [AccountType, setAccountType] = useState("")

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
            setAccountType(IData.accountType)

        } catch (error) {
            alert(error);
        };

    }, [id]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div>

            <header class="section">
                <section class="full-width ">
                    <div className="row">

                        <div className="headingViewMods" style={{ marginBottom: "20px" }}> <h4> Details of the User</h4> </div>

                        <div class="containerViewADM" >

                            <div class="containerViewHeadingADM ">
                                <div class="containerViewH1ADM ">
                                    {FirstName} {LastName}
                                </div>
                                <div class="pViewADM">

                                    <div className="view">

                                        <p>   <b>User Id :-</b>   {Id} </p>
                                        <p>   <b>Email :-</b>  {Email} </p>
                                        <p>   <b>Date of Birth :-</b>  {DateOfBirth} </p>
                                        <p>   <b>Mobile Number :-</b>  {Mobile} </p>
                                        <p>   <b>Account Type :-</b>  {AccountType}</p>

                                    </div>
                                    <div className="btnBack">
                                        <button onClick={() => { navigate("/admin-home") }} style={{ marginLeft: "50px" }}>Back</button>
                                    </div>
                                    <br /><br />
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </div>
    )
}

export default ViewUser;
