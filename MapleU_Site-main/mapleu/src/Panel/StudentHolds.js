// student can his/her holds
// admin view and edit holds for a student
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getStudentHolds, getStudents, removeHolds } from "../SharedService";


function StudentHolds() {


    const columns = [{ field: "FacultyID", headerName: "Student ID", width: 130 },
    { field: "FirstName", headerName: "Name", width: 130 },
    { field: "HoldType", headerName: "Hold Type", width: 200 },
    { field: "Remove", headerName: "Remove Hold", width: 150, renderCell: (params) => { return <button onClick={() => handleRemove(params.row.HoldID, params.row.FacultyID)}>Remove Hold</button> } },];

    const columns2 = [{ field: "StudentID", headerName: "Student ID", width: 130 },
    { field: "FirstName", headerName: "Name", width: 130 },
    { field: "StudentType", headerName: "Student Type", width: 200 },
    {
        field: "addhold", headerName: "Add hold", width: 120, renderCell: (params) => {
            return <a href="./AddHold" onClick={() => { localStorage.setItem("StudentID", params.row.StudentID) }}>Add Hold</a>
        }
    },]

    const [tableDataHolds, setTableDataHolds] = useState([])
    const [tableDataStudents, setTableDataStudents] = useState([])


    useEffect(() => {
        getStudentHolds().then(x => {
            setTableDataHolds(x.data)
        });

        getStudents().then(x => {
            setTableDataStudents(x.data)
        });
    }, []);


    // event handler for remove hold button
    const handleRemove = (e, a) => {
        //console.log(a, " e is ", e)
        removeHolds(a, e);
        alert("Hold is removed. Refresh the page to see the changes.");
        window.location.reload();

    }

    const handleAdd = (e) => {
        // go to AddHold page 
        window.location.href = "./AddHold";
    }





    return (
        <>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>
            <h1>Student Holds</h1>
            <h4>Here you can drop holds.</h4>
            <div style={{ height: 400, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={tableDataHolds}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.FacultyID}

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
            <h1>Students - Add Hold</h1>
            <h4>Here you can add drops.</h4>

            <div style={{ height: 400, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={tableDataStudents}
                        columns={columns2}
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
export default StudentHolds;

