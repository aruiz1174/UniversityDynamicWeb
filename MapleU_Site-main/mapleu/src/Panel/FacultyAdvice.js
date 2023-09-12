
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getFacultyAdvisor, getStudentAdvisor } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$ } from '../PersistenceService';

function FacultyAdvice() {

    const columnsForFaculty = [
        { field: "StudentID", headerName: "Student ID", width: 130 },
        { field: "FirstName", headerName: "First Name", width: 130 },
        { field: "LastName", headerName: "Last Name", width: 200 },
        { field: "StudentStanding", headerName: "Student Standing", width: 200 },
        { field: "StudentType", headerName: "Student Type", width: 200 },
        {
            field: "id", headerName: "Search", width: 120, renderCell: (params) => {
                return <a href="./Transcript" onClick={() => { localStorage.setItem("StudentID", params.row.StudentID) }}>View Transcript</a>
            }
        }];

    // create function to choose what data to display based on user type




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

    const [ForFacultyData, setForFacultyData] = useState([]);
    const [ForStudentData, setForStudentData] = useState([]);


    getStudentAdvisor().then(x => {
        let filteredData = x.data.filter(x => x.FacultyID === userId_us);
        setForFacultyData(filteredData);
    });



    getFacultyAdvisor().then(x => {
        let filteredData = x.data.filter(x => x.StudentID === userId_us);
        setForStudentData(filteredData);
    });




    return (
        <>

            <br></br>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>

            <h1> Advisement Info</h1>


            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={ForFacultyData}
                        columns={columnsForFaculty}
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
export default FacultyAdvice;

