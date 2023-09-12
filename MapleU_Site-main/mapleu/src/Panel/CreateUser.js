import { React, useState } from 'react';
import { createUser } from '../SharedService';


function CreateUser() {
        const [fname, setFname] = useState([]);
        const [lname, setLname] = useState([]);
        const [dob, setDob] = useState([]);
       // const [email, setEmail] = useState([]);
       //const [password, setPassword] = useState([]);
        //const [userId, setUserId] = useState([]);
        const [accountLevel, setAccountLevel] = useState([]);
        const [streetAddress, setStreetAddress] = useState([]);
        const [city, setCity] = useState([]);
        const [state, setState] = useState([]);
        const [zipCode, setZipCode] = useState([]);
        const [country, setCountry] = useState([]);

    // after submit button is clicked, create user
    const createUsers = () => {
        console.log(fname, lname, dob, accountLevel, streetAddress, city, state, zipCode, country)

        if (fname === "" || lname === "" || dob === "" || accountLevel === "" || streetAddress === "" || city === "" || state === "" || zipCode === "" || country === "") {
            alert("Please fill out all the fields");

            // if the user does not fill out all the fields, return to the create user page
            return;
        }


        // call the createUser from SharedService.js to create users using the values from the form in createUsers
        createUser(fname, lname, dob, streetAddress, state, city, zipCode, country, accountLevel);

        // window alert to confirm the user is created
        alert("User is created. Go back to users to see the changes.");

    }

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <div>
            <h1>Create User</h1>
            <br></br>
            <form>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" className="form-control" id="fname" placeholder="Enter first name" 
                        onChange={(e)=> setFname(e.target.value)} value-={fname} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" className="form-control" id="lname" placeholder="Enter last name" 
                        onChange={(e)=> setLname(e.target.value)} value-={lname} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" className="form-control" id="dob" placeholder="Enter date of birth" 
                        onChange={(e)=> setDob(e.target.value)} value-={dob} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="accountLevel">Account Level</label>
                    <select className="form-control" onChange={(e)=> setAccountLevel(e.target.value)} value-={accountLevel} id="accountLevel">
                        <option>Admin</option>
                        <option>Student</option>
                        <option>Faculty</option>
                    </select>
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="streetAddress">Street Address</label>
                    <input type="text" className="form-control" id="streetAddress" placeholder="Enter street address"
                        onChange={(e)=> setStreetAddress(e.target.value)} value-={streetAddress} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" placeholder="Enter city" 
                        onChange={(e)=> setCity(e.target.value)} value-={city} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" className="form-control" id="state" placeholder="Enter state" 
                        onChange={(e)=> setState(e.target.value)} value-={state} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input type="text" className="form-control" id="zipCode" placeholder="Enter zip code" 
                        onChange={(e)=> setZipCode(e.target.value)} value-={zipCode} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" placeholder="Enter country" 
                        onChange={(e)=> setCountry(e.target.value)} value-={country} />
                </div>
                <br></br>               
                <input
                type="button"
                defaultValue="Submit"
                className="btn btn-primary"
                id="submit"
                onClick={createUsers}


              />
            </form>
        </div>
        </>
    )
    

}
export default CreateUser;