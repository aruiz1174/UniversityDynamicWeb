import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getGraduateStudents, getStudent, getUndergraduateStudentHistory, getMasterSchedule, getAttendance, TakeAttendance } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from '../PersistenceService';

export default function Attendance() {
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



    const columns = [{ field: "StudentID", headerName: "StudentID", width: 100 },
    { field: "FirstName", headerName: "First Name", width: 120 },
    { field: "LastName", headerName: "Last Name", width: 120 },
    { field: "MajorName", headerName: "Major", width: 300 },
    // create a botton to increase numbers of attendance
    {
        field: "id", headerName: "Search", width: 120, renderCell: (params) => {
            return <select> <option value="Present">Present</option> <option value="Absent">Absent</option> </select>
        }
    },
    {
        field: "ids", headerName: "Set Attendace", width: 120, renderCell: (params) => {
            // get the value from the dropdown and change the grade in the database
            return <button>Set Attendace</button>
        }
    }];

    const attendanceColumns = [{ field: "StudentID", headerName: "StudentID", width: 100 },
    { field: "CRN", headerName: "CRN", width: 100 },
    { field: "AttendanceDate", headerName: "Attendance", width: 190 },
    { field: "Present_Absent", headerName: "Attendance", width: 120 },]

    const [studentData, setStudentData] = useState([])
    const [attendanceData, setAttendanceData] = useState([])

    useEffect(() => {
        getUndergraduateStudentHistory().then(x => {
            let localFacultyID = localStorage.getItem("FacultyID");
            let localCRN = localStorage.getItem("CRN");
            //console.log("localStudentID: " + localFacultyID);
            //console.log("localCRN: " + localCRN);
            // filter table to only show students that are in the class no repeat students
            let filteredTable = x.data.filter(x => x.FacultyID == localFacultyID && x.CRN == localCRN);
            setStudentData(filteredTable)

        });
    }, []);

    useEffect(() => {
        getAttendance().then(x => {
            let localFacultyID = localStorage.getItem("FacultyID");
            let localCRN = localStorage.getItem("CRN");
            // filter table to only show students that are in the class no repeat students
            let filteredTable = x.data.filter(x => x.FacultyID == localFacultyID && x.CRN == localCRN);

            // if Present_Absent is 0 then change it to Absent else change it to Present
            filteredTable.forEach(x => {
                if (x.Present_Absent == 0) {
                    x.Present_Absent = "Absent";
                }
                else {
                    x.Present_Absent = "Present";
                }
            });
            setAttendanceData(filteredTable)

        });
    }, []);




    return (
        <>
            <br></br>
            <br></br>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>

            <h1> Attendance</h1>
            <h4> Select a student to take attendance for today's class.</h4>

            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={studentData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.StudentID}

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

            <br></br>
            
            <h1> Attendance history</h1>

            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={attendanceData}
                        columns={attendanceColumns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.StudentID}

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