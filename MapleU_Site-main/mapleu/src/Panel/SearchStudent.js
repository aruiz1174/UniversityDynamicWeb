// admin can search student by name to view and mae changes
// admin can search faculty by name to view and mae changes
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getGraduateStudents, getStudent } from "../SharedService";

function SearchStudent() {

    const columnsUndergraduate = [
        { field: "StudentID", headerName: "Faculty ID", width: 85 },
        { field: "StudentStanding", headerName: "Student Standing", width: 130 },
        { field: "FirstName", headerName: "First Name", width: 130 },
        { field: "LastName", headerName: "Last Name", width: 200 },
        { field: "MajorName", headerName: "Major", width: 200 },
        { field: "Year", headerName: "Student time", width: 200 },
        {
            field: "id", headerName: "Search", width: 120, renderCell: (params) => {
                return <a href="./Transcript" onClick={() => { localStorage.setItem("StudentID", params.row.StudentID) }}>Search Student</a>
            }
        },
        {
            field: "ids", headerName: "Change", width: 150, renderCell: (params) => {
                return <a href="./ChangeMajor_Minor" onClick={() => { localStorage.setItem("StudentID", params.row.StudentID) }}>Change Major/Minor</a>
            }
        }];

    const columnsGraduate = [
        { field: "StudentID", headerName: "Faculty ID", width: 85 },
        { field: "FirstName", headerName: "First Name", width: 130 },
        { field: "LastName", headerName: "Last Name", width: 200 },
        { field: "MS_Phd", headerName: "Program", width: 200 },
        { field: "Year", headerName: "Year", width: 200 },
        {
            field: "id", headerName: "Search", width: 120, renderCell: (params) => {
                return <a href="./Transcript" onClick={() => { localStorage.setItem("StudentID", params.row.StudentID) }}>Search Student</a>
            }
        },
        {
            field: "ids", headerName: "Change", width: 150, renderCell: (params) => {
                return <a href="./ChangeMajor_Minor" onClick={() => { localStorage.setItem("StudentID", params.row.StudentID) }}>Change Major/Minor</a>
            }
        }];




    const [tableDataUndergraduate, setTableDataUndergraduate] = useState([])
    const [tableDataGraduate, setTableDataGraduate] = useState([])

    useEffect(() => {
        getStudent().then(x => {
            // filter the data based on student major 
            let filteredData = x.data.filter(x => x.MajorName !== "Data Science" && x.MajorName !== "Taxation" && x.MajorName !== "Accounting");
            setTableDataUndergraduate(filteredData)
        });
    }, []);

    useEffect(() => {
        getGraduateStudents().then(x => {
            setTableDataGraduate(x.data)
        });
    }, []);




    // event handler for search button
    const handleSearch = (e) => {
        //go to view courses
        window.location.href = "./Transcript";
    }


    return (
        <>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>
            <h1>All Students</h1>
            <h4>You can view and search ANY Student's schedule, Degree audit, Grades and Transcript records just by looking them up in the database.</h4>
            <br></br>

            <h3> Undergraduate Student </h3>

            <div style={{ height: 400, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid

                        editMode='row'
                        rows={tableDataUndergraduate}
                        columns={columnsUndergraduate}
                        experimentalFeatures={{ newEditingApi: true }}
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h3> Graduate Students</h3>

            <div style={{ height: 400, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid

                        editMode='row'
                        rows={tableDataGraduate}
                        columns={columnsGraduate}
                        experimentalFeatures={{ newEditingApi: true }}
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
    )
}
export default SearchStudent;

