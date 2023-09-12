// All users can view their information

import { React, useState, useEffect } from 'react';
import { getFacultyDepartment, getUsers, getStudent, getFaculty } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from '../PersistenceService';


function Profile() {
  const [isLoggedIn_us, setIsLoggedIn] = useState('');
  const [userType_us, setUserType] = useState('');
  const [userId_us, setUserId] = useState('');

  var localUserToken = JSON.parse(localStorage.getItem("userToken"));

  if (localUserToken !== null) {
    postUserCheck(localUserToken.userId, localUserToken.password, false).then(x => {

      if (x.data !== null) {
        UserId_Subject$.next(x.data.userId);
        UserType_Subject$.next(x.data.UserType);
        UserName_Subject$.next(x.data.fname + " " + x.data.lname);
        isLoggedIn_Subject$.next(x.data.login);
      }

    });
  }
  useEffect(() => {

    isLoggedIn_Subject$.subscribe(x => {
      setIsLoggedIn(x);
    });

    UserType_Subject$.subscribe(x => {
      setUserType(x);
    });

    UserId_Subject$.subscribe(x => {
      setUserId(x);
    });
  });

  const [tableData, setTableData] = useState([])
  const [facultyDept, setFacultyDept] = useState([])
  const [student, setStudent] = useState([])
  const [Faculty, setFaculty] = useState([])

  // filter data based on what user is logged in and what type of user they are
  useEffect(() => {
    getUsers().then((response) => {
      setTableData(response.data.filter(x => x.UserId == userId_us));
    });
  }, [userId_us]);


  useEffect(() => {
    getFacultyDepartment().then((response) => {
      setFacultyDept(response.data.filter(x => x.FacultyID === userId_us));
    });
  }, [userId_us]);


  useEffect(() => {
    getStudent().then(x => {
      // filter the data based on student major 
      let filteredData = x.data.filter(x => x.StudentID === userId_us);
      setStudent(filteredData)
    });
  }, [userId_us]);

  useEffect(() => {
    getFaculty().then(x => {
      // filter the data based on student major
      let filteredData = x.data.filter(x => x.FacultyID === userId_us);
      setFaculty(filteredData)
    });
  }, [userId_us]);

  // if user is faculty show department
  function facultyDeptHandler() {
    if (userType_us == "Faculty") {
      return (
        <>
          <h2> Departments: {facultyDept[0]?.DepartmentName} </h2>
          <h2>    {facultyDept[1]?.DepartmentName} </h2>
        </>
      )
    }
  }

  function StudentTime() {
    if (userType_us == "student") {
      return (
        <>
          <h2> Time: {student[0]?.Year} </h2>
          <h2>{student[0]?.StudentType} </h2>
        </>
      )
    }
  }

  function FacultyTime() {
    if (userType_us == "Faculty") {
      return (
        <>
          <h2> Time: {Faculty[0]?.FacultyTime} </h2>
        </>
      )
    }
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
      <br></br>
      <h1>Welcome to your Profile {tableData[0]?.FirstName}</h1>
      {facultyDeptHandler()}
      {StudentTime()}
      {FacultyTime()}
      <h4>Here you can find your basic information for your account</h4>
      <h4>If you need to change your password, please contact an Admin.</h4>

      <body>
        <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}> Account Level: {tableData[0]?.UserType} </p>
      </body>
      <table style={{ width: "50%", border: "1px solid black", textAlign: "center", fontSize: "20px", margin: "auto" }}>
        <tr>
          <th style={{ border: "1px solid black" }}>First Name</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.FirstName}</td>
        </tr>
        <tr>
          <th style={{ border: "1px solid black" }}>Last Name</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.LastName}</td>
        </tr>
        <tr>
          <th style={{ border: "1px solid black" }}>User ID</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.UserId}</td>
        </tr>
        <tr>
          <th style={{ border: "1px solid black" }}>Street Address</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.Street_address}</td>
        </tr>
        <tr>
          <th style={{ border: "1px solid black" }}>City</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.City}</td>
        </tr>
        <tr>
          <th style={{ border: "1px solid black" }}>State</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.State}</td>
        </tr>
        <tr>
          <th style={{ border: "1px solid black" }}>Zip Code</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.ZipCode}</td>
        </tr>
        <tr>
          <th style={{ border: "1px solid black" }}>Email</th>
          <td style={{ border: "1px solid black" }}>{tableData[0]?.Email}</td>
        </tr>


      </table>
    </>
  )
}
export default Profile;

