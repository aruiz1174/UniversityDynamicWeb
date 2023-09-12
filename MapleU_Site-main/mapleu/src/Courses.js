import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Course_Prerequisites from "./Course_Prerequisites";
import { getCourses } from "./SharedService";
import './Home.css';

const columns = [{ field: "CourseID", headerName: "Course ID", width: 300 },
{ field: "CourseName", headerName: "Course Name", width: 300 },
{ field: "Credits", headerName: "Credits", width: 200 },
{ field: "DepartmentName", headerName: "Department", width: 200 },
{
  field: "id", headerName: "Prerequisites", width: 200, renderCell: (params) => {

    return <a href="./Course_Prerequisites" onClick={() => { localStorage.setItem("CourseID", params.row.CourseID) }}>Prerequisites</a>
  }
}];

function Courses() {
  const [tableData, setTableData] = useState([])


  useEffect(() => {
    getCourses().then(x => {
      setTableData(x.data)
    }
    );
  }, []);


  return (
    <>

      <div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Courses</h1>


      <div style={{ height: 650, width: '100%' }}>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.CourseID}

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