// admin can view student degreeAudit
// student can view his/her degreeAudit
// faculty can view degreeAudit for a student
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getStudent, getUndergraduateStudentHistory, getMajorRequirements, getStudentInfoMajorMinor } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$ } from '../PersistenceService';

const columns = [{ field: "CRN", headerName: "CRN", width: 120 },
{ field: "CourseName", headerName: "Course Name", width: 350 },
{ field: "GradeReceived", headerName: "Grade", width: 100 },
{ field: "SemesterName", headerName: "Semester", width: 100 }];

const columnsReq = [{ field: "CourseID", headerName: "Course", width: 120 },
{ field: "CourseName", headerName: "Course Name", width: 350 },
{ field: "GradeRequired", headerName: "Grade required", width: 350 }];

function ViewDegreeAudit() {

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
    const [inProgress, setInProgress] = useState([])
    const [MajorReq, setMajorReq] = useState([])
    const [MinorTable, setMinor] = useState([])

    useEffect(() => {
        getUndergraduateStudentHistory().then(x => {
            let localStudentID = localStorage.getItem("StudentID");
            // filter the data based on the StudentID
            // show data where the StudentID matches the localStudentID
            if (userType_us == "student") {
                console.log("userId_us: " + userId_us);
                let filterData = x.data.filter(x => x.StudentID == userId_us && x.SemesterName != "Spring23" && x.SemesterName != "Fall22");
                let credits = 0;
                filterData.forEach(x => credits += x.Credits);
                setStudentData(filterData)
            }
            else {
                console.log("localStudentID: " + localStudentID);
                let filteredTable = x.data.filter(x => x.StudentID == localStudentID && x.SemesterName != "Spring23" && x.SemesterName != "Fall22");
                let credits = 0;
                filteredTable.forEach(x => credits += x.Credits);
                setStudentData(filteredTable)
            }

        });
    }, [userId_us, userType_us]);

    useEffect(() => {
        getUndergraduateStudentHistory().then(x => {
            let localStudentID = localStorage.getItem("StudentID");
            // filter the data based on the StudentID
            // show data where the StudentID matches the localStudentID
            if (userType_us == "student") {
                console.log("userId_us: " + userId_us);
                let filterData = x.data.filter(x => x.StudentID == userId_us && x.SemesterName == "Fall22");
                let credits = 0;
                filterData.forEach(x => credits += x.Credits);
                setInProgress(filterData)
            }
            else {
                console.log("localStudentID: " + localStudentID);
                let filteredTable = x.data.filter(x => x.StudentID == localStudentID && x.SemesterName == "Fall22");
                let credits = 0;
                filteredTable.forEach(x => credits += x.Credits);
                setInProgress(filteredTable)
            }

        });
    }, [userId_us, userType_us]);

    useEffect(() => {
        getStudent().then(x => {
            let localStudentID2 = localStorage.getItem("StudentID");
            // filter the data based on the FacultyID
            // show data where the FacultyID matches the localFacultyID
            let filteredData = x.data.filter(x => x.StudentID == localStudentID2);
            setTableData(filteredData)
        }
        );
    }, []);

    useEffect(() => {
        getMajorRequirements().then(x => {
            // filter based on MajorName
            let localStudentID3 = localStorage.getItem("StudentID");
            let filteredData = x.data.filter(x => x.MajorName == studentData[0]?.MajorName);
            setMajorReq(filteredData)
        }
        );
    }, [studentData]);

    useEffect(() => {
        getStudentInfoMajorMinor().then(x => {
            let localStudentID = localStorage.getItem("StudentID");
            // filter the data based on the StudentID
            // show data where the StudentID matches the localStudentID
            if (userType_us == "student") {
                //console.log("userId_us: " + userId_us);
                let filterData = x.data.filter(x => x.StudentID == userId_us);
                setMinor(filterData)
            }
            else {
                //console.log("localStudentID: " + localStudentID);
                let filteredTable = x.data.filter(x => x.StudentID == localStudentID);
                setMinor(filteredTable)
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

    //function to display minor if student has one
    function displayMinor() {
        if (MinorTable[0]?.MinorName == null) {
            return <h4>Minor: None</h4>
        }
        else {
            return <h4>Minor: {MinorTable[0]?.MinorName}</h4>
        }
    }

    return (
        <>

            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>


            <h1>Degree Audit for - {studentData[0]?.FirstName} {studentData[0]?.LastName}</h1>
            <h4>Major: {studentData[0]?.MajorName}</h4>
            {displayMinor()}
            <h4>Credits: {addCredits()}</h4>
            <h4>GPA: {calculateGPA()}</h4>

            <br></br>
            <br></br>
            <br></br>

            <h1>Courses Completed</h1>

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


            <h1>In Progress </h1>

            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={inProgress}
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

            <h1>Major Requirements - {studentData[0]?.MajorName}</h1>

            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={MajorReq}
                        columns={columnsReq}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.CourseID}

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

export default ViewDegreeAudit;