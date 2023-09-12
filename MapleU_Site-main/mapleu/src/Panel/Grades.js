//student can see his/her grades 
//faculty can view and edit grade (time window)
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getUndergraduateStudentHistory } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$ } from '../PersistenceService';

function Grades() {

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
    { field: "FirstName", headerName: "First Name", width: 90 },
    { field: "LastName", headerName: "Last Name", width: 80 },
    { field: "MajorName", headerName: "Major", width: 300 },
    { field: "GradeReceived", headerName: "Grade", width: 300 },
    {
        field: "id", headerName: "choose grade", width: 120, renderCell: (params) => {
            return <select> <option value="A">A</option> <option value="B">B</option> <option value="C">C</option> <option value="D">D</option> <option value="F">F</option> </select>
        }
    },
    {
        field: "ids", headerName: "Set Grade", width: 120, renderCell: (params) => {
            // get the value from the dropdown and change the grade in the database
            return <button>Set Grade</button>
        }
    }
    ];

    const [studentData, setStudentData] = useState([])

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

    return (
        <>

            <br></br>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>

            <h1> Grade Students</h1>

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



        </>
    );
}
export default Grades;

