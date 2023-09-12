import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getFacultyDepartment } from "../SharedService";



function ViewFacultyDepartmentAdmin() {

    const columns = [{ field: "FacultyID", headerName: "Faculty ID", width: 150 },
    { field: "FirstName", headerName: "First Name", width: 350 },
    { field: "LastName", headerName: "Last Name", width: 200 },
    { field: "PercentageTimeCommitment", headerName: "Percentage Time", width: 200 },];


    const [tableData, setTableData] = useState([])

    useEffect(() => {
        getFacultyDepartment().then(x => {
            let localDepartmentID = localStorage.getItem("DepartmentID");
            // filter the data based on the FacultyID
            // show data where the FacultyID matches the localFacultyID
            let filteredData = x.data.filter(x => x.DepartmentID == localDepartmentID);
            // clear the local storage
            setTableData(filteredData)
        }
        );
    }, []);



    return (
        <>

            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>

            <h1> The Department {tableData[0]?.DepartmentName} has the following faculty:</h1>

            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={tableData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
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
    );
}
export default ViewFacultyDepartmentAdmin;

