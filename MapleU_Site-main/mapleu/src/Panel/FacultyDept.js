import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getFacultyDepartment } from "../SharedService";



function FacultyDept() {

    const columns = [{ field: "DepartmentName", headerName: "Department", width: 350 },
    { field: "PercentageTimeCommitment", headerName: "Percentage Time Commitment", width: 200 },]


    const [tableData, setTableData] = useState([])

    useEffect(() => {
        getFacultyDepartment().then(x => {
            let localFacultyID = localStorage.getItem("FacultyID");
            // filter the data based on the FacultyID
            // show data where the FacultyID matches the localFacultyID
            let filteredData = x.data.filter(x => x.FacultyID == localFacultyID);
            // clear the local storage
            setTableData(filteredData)
        }
        );
    }, []);


    const handleDelete = (e) => {


    }

    const addDept = () => {
        // go to create user page and create user and then return to this page and refresh the table
        window.location.href = "./AddDeptToFaculty";

    }



    return (
        <>

            <br></br>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>

            <h1> The faculty {tableData[0]?.FirstName} {tableData[0]?.LastName} belongs to:</h1>



            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={tableData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row) => row.DepartmentID}

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

export default FacultyDept;