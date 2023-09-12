import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getUndergraduateStudentHistory } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$} from '../PersistenceService';



function ViewClassList() {

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
    { field: "id", headerName: "Search", width: 120, renderCell: (params) => { 
        return <a href="./Transcript" onClick={() => {localStorage.setItem("StudentID", params.row.StudentID)}}>View Transcript</a>}}];

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

<div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>

            <h1> ClassList</h1>

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

export default ViewClassList;