import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getMajor } from "./SharedService";
import { UserName_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserId_Subject$ } from './PersistenceService'
import postUserCheck from './SharedService';

function showTime(userType, isLoggedIn, TypesAllowed) {
  var ret = false;
  var allowed = false;

  for (let i = 0; i < TypesAllowed.length; i++) {
    if (userType === TypesAllowed[i]) {
      allowed = true;
      break;
    }
  }

  if (isLoggedIn === true && allowed === true) {
    ret = true;
  } else if (isLoggedIn === true || allowed === true) {
    if (userType === 'Visitor') {
      ret = true;
    }
  }

  return ret;
}


function Majors() {

  const columns = [{ field: "MajorName", headerName: "Major Name", width: 400 },
  { field: "DepartmentName", headerName: "Department Name ", width: 300 },
  {
    field: "id", headerName: "Prerequisites", width: 200, renderCell: (params) => {
      return <a href="./MajorRequirements" onClick={() => { localStorage.setItem("MajorID", params.row.MajorName) }}>Requirements</a>
    }
  }];

  const columnsVisitor = [{ field: "MajorName", headerName: "Major Name", width: 400 },
  { field: "DepartmentName", headerName: "Department Name ", width: 300 }];

  const [isLoggedIn_us, setIsLoggedIn] = useState('');
  const [userType_us, setUserType] = useState('');

  var localUserToken = JSON.parse(localStorage.getItem("userToken"));

  if (localUserToken !== null) {
    postUserCheck(localUserToken.userId, localUserToken.password, false).then(x => {

      if (x.data !== null) {
        UserId_Subject$.next(x.data.userId);
        UserType_Subject$.next(x.data.UserType);
        UserName_Subject$.next(x.data.fname + " " + x.data.lname);
        isLoggedIn_Subject$.next(x.data.login);
      }

    });
  }

  useEffect(() => {

    isLoggedIn_Subject$.subscribe(x => {
      setIsLoggedIn(x);
    });

    UserType_Subject$.subscribe(x => {
      setUserType(x);
    });

  });

  const [tableData, setTableData] = useState([])


  useEffect(() => {
    getMajor().then(x => {
      setTableData(x.data)
    }
    );
  }, []);

  function createMajor() {
    window.location.href = "./CreateMajor";
  }

  function VisitorView(userType, isLoggedIn) {
    var userTypes = ['Visitor', 'student'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {
      return (
        <>
          <h1>All Majors</h1>
          <h4>Here you can view all majors.</h4>
          <div style={{ display: 'flex', height: 650, width: '100%' }}>
            <Box sx={{ height: 400, width: 1 }}>
              <DataGrid
                rows={tableData}
                columns={columnsVisitor}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.MajorName}

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
  }

  function AdminView(userType, isLoggedIn) {
    var userTypes = ['Admin'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {
      return (
        <>
          <h1>All Majors</h1>
          <h4>Here you can view all majors.</h4>
          <div style={{ display: 'flex', height: 650, width: '100%' }}>
            <Box sx={{ height: 400, width: 1 }}>
              <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.MajorName}

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
  }

  return (
    <div>

      <div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>
      <br />
      <VisitorView userType={userType_us} isLoggedIn={isLoggedIn_us} />
      <AdminView userType={userType_us} isLoggedIn={isLoggedIn_us} />

    </div>




  );
}
export default Majors;

