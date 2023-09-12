import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getCourse_Prerequisites } from "./SharedService";
import './Home.css';

const columns = [{ field: "PrerequisiteID", headerName: "Course ID", width: 300 },
{ field: "CourseName", headerName: "Course Name", width: 200 },
{ field: "DepartmentName", headerName: "Department", width: 200 },
{ field: "Credits", headerName: "Credits", width: 200 }];

function Courses() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getCourse_Prerequisites().then(x => {
      let courseID = localStorage.getItem("CourseID");
      // filter the data based on the courseID
      let filteredData = x.data.filter(x => x.CourseID === courseID);
      setTableData(filteredData)
    }
    );
  }, []);

  // create function to display no prerequisites if there are none for the course selected 
  if (tableData.length === 0) {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h1>No Prerequisites for this course.</h1>
      </div>
    )
  }


  return (
    <>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Prerequisites</h1>


      <div style={{ height: 650, width: '100%' }}>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.PrerequisiteID}

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

export default Courses;