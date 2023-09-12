// student can view his/her transcript
// admin can view and edit transcript for a student
// faculty can view transcript for a student
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getStudent, getUndergraduateStudentHistory, getStudentInfoMajorMinor } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from '../PersistenceService';

const columns = [{ field: "CRN", headerName: "CRN", width: 120 },
{ field: "CourseName", headerName: "Course Name", width: 350 },
{ field: "GradeReceived", headerName: "Grade", width: 100 },
{ field: "SemesterName", headerName: "Semester", width: 100 }];

function Transcript() {

  var localUserToken = JSON.parse(localStorage.getItem("userToken"));
  const [userId_us, setUserId] = useState('');
  const [userType_us, setUserType] = useState('');
  if (localUserToken !== null) {
    postUserCheck(localUserToken.userId, localUserToken.password, false).then(x => {

      if (x.data !== null) {
        UserId_Subject$.next(x.data.userId);
      }


    });
  }

  useEffect(() => {

    UserId_Subject$.subscribe(x => {
      setUserId(x);
    });

    UserType_Subject$.subscribe(x => {
      setUserType(x);
    });
  });


  const [tableData, setTableData] = useState([])
  const [studentData, setStudentData] = useState([])

  useEffect(() => {
    getUndergraduateStudentHistory().then(x => {
      let localStudentID = localStorage.getItem("StudentID");
      // filter the data based on the StudentID
      // show data where the StudentID matches the localStudentID
      if (userType_us == "student") {
        //console.log("userId_us: " + userId_us);
        let filterData = x.data.filter(x => x.StudentID == userId_us);
        let credits = 0;
        filterData.forEach(x => credits += x.Credits);
        setStudentData(filterData)
      }
      else {
        //console.log("localStudentID: " + localStudentID);
        let filteredTable = x.data.filter(x => x.StudentID == localStudentID);
        let credits = 0;
        filteredTable.forEach(x => credits += x.Credits);
        setStudentData(filteredTable)
      }

    });
  }, [userId_us, userType_us]);

  useEffect(() => {
    getStudentInfoMajorMinor().then(x => {
      let localStudentID = localStorage.getItem("StudentID");
      // filter the data based on the StudentID
      // show data where the StudentID matches the localStudentID
      if (userType_us == "student") {
        //console.log("userId_us: " + userId_us);
        let filterData = x.data.filter(x => x.StudentID == userId_us);
        setTableData(filterData)
      }
      else {
        //console.log("localStudentID: " + localStudentID);
        let filteredTable = x.data.filter(x => x.StudentID == localStudentID);
        setTableData(filteredTable)
      }

    });
  }, [userId_us, userType_us]);

  function addCredits() {
    let credits = 0;
    studentData.forEach(x => credits += x.Credits);
    return credits;
  }

  //calculate GPA based on Letter grade received in each course
  function calculateGPA() {
    let total = 0;
    let count = 0;
    studentData.forEach(x => {
      if (x.GradeReceived == "A") {
        total += 4;
        count++;
      }
      else if (x.GradeReceived == "B") {
        total += 3;
        count++;
      }
      else if (x.GradeReceived == "C") {
        total += 2;
        count++;
      }
      else if (x.GradeReceived == "D") {
        total += 1;
        count++;
      }
      else if (x.GradeReceived == "F") {
        total += 0;
        count++;
      }
    });
    return (total / count).toFixed(2);
  }


  // fucntion to go back to search page
  function goBack() {
    // clear the local storage
    localStorage.clear();
    window.location.href = "/SearchStudent";
  }

  //function to display minor if student has one
  function displayMinor() {
    if (tableData[0]?.MinorName == null) {
      return <h4>Minor: None</h4>
    }
    else {
      return <h4>Minor: {tableData[0]?.MinorName}</h4>
    }
  }

  return (
    <>

      <br></br>
      <div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>

      <h1>Unofficial Transcript for - {studentData[0]?.FirstName} {studentData[0]?.LastName}</h1>
      <h4>Major/MS_Phd: {studentData[0]?.MajorName}</h4>
      {displayMinor()}
      <h4>Credits: {addCredits()}</h4>
      <h4>GPA: {calculateGPA()}</h4>

      <div style={{ height: 650, width: '100%' }}>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={studentData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.CRN}

            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableColumnMenu
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      </div>



    </>
  );
}

export default Transcript;