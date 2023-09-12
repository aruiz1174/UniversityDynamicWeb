import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getBuildings } from "./SharedService";



const columns = [{ field: "BuildingName", headerName: "BuildingName", width: 130 },
{ field: "BuildingID", headerName: "BuildingID", width: 130 },
{ field: "TheUsage", headerName: "Usage", width: 300 }];


function Buildings() {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getBuildings().then(x => {
      setTableData(x.data)
    });
  }, []);

  return (
    <>

      <div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>


      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.BuildingID}


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
export default Buildings