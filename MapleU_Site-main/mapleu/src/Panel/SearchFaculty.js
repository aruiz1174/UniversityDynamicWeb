// admin can search faculty by name to view and mae changes
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getFacultyDepartment } from "../SharedService";

function SearchFaculty() {

    const columns = [
        { field: "FacultyID", headerName: "Faculty ID", width: 85 },
        { field: "FirstName", headerName: "First Name", width: 130 },
        { field: "LastName", headerName: "Last Name", width: 200 },
        {
            field: "deptid", headerName: "Department", width: 150, renderCell: (param) => {
                return <a href="./FacultyDept" onClick={() => { localStorage.setItem("FacultyID", param.row.FacultyID) }}>View Departments</a>
            }
        },
        {
            field: "id", headerName: "Search", width: 120, renderCell: (params) => {
                return <a href="./ViewCourses" onClick={() => { localStorage.setItem("FacultyID", params.row.FacultyID) }}>View Courses</a>
            }
        }];





    const [tableData, setTableData] = useState([])

    useEffect(() => {
        getFacultyDepartment().then(x => {
            // filter the data for no duplicates faculty id
            let filteredData = x.data.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.FacultyID === thing.FacultyID
                ))
            )

            setTableData(filteredData)
        });
    }, []);


    return (
        <>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>
            <h1>All Faculty</h1>
            <h4>Here you can view and search faculty to view courses.</h4>

            <div style={{ height: 400, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid

                        editMode='row'
                        rows={tableData}
                        columns={columns}
                        experimentalFeatures={{ newEditingApi: true }}
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
        </>
    )
}

export default SearchFaculty;
