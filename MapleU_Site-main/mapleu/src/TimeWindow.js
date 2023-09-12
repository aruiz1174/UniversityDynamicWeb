import {React, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {getTimeWindow} from "./SharedService";

const columns = [{field: "SemesterName", headerName: "Semester", width: 130},
                 {field: "StartTime", headerName: "Start Time", width: 200},
                 {field: "EndTime", headerName: "End Time", width: 200},
                 {field: "RegistrationLimit", headerName: "Registration Limit", width: 200},
                 {field: "WithdrawalLimit", headerName: "Withdrawal Limit", width: 200},
                 {field: "GradeLimit", headerName: "Grade Limit", width: 200}];

function TimeWindow() {

  const [tableData, setTableData] = useState([])

  getTimeWindow().then(x => {
    setTableData(x.data)
    }
  );

  return (
    <>

     <br></br>
     <div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>


      <div style={{ height: 400, width: '100%' }}>
      <Box sx={{ height: 400, width: 1 }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.SemesterName}

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

export default TimeWindow;