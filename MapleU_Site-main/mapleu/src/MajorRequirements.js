import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getMajorRequirements } from "./SharedService";

function MajorRequirements() {

  const columns = [{ field: "CourseID", headerName: "Course ID", width: 300 },
  { field: "CourseName", headerName: "Course Name", width: 200 },
  { field: "GradeRequired", headerName: "Grade Required", width: 200 }];

  const [tableData, setTableData] = useState([])


  useEffect(() => {
    getMajorRequirements().then(x => {
      let MajorReID = localStorage.getItem("MajorID");
      // filter the data based on the courseID
      let filteredData = x.data.filter(x => x.MajorName === MajorReID);
      setTableData(filteredData)
    }
    );
  }, []);

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Requirements for {tableData[0]?.MajorName}</h1>


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
export default MajorRequirements;

