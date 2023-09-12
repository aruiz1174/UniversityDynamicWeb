import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getDepartment } from "./SharedService";
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

function Departments() {

  const columns = [{ field: "DepartmentName", headerName: "Department Name", width: 400 },
  { field: "DepartmentEmail", headerName: "Department Email", width: 300 },
  { field: "PhoneNumber", headerName: "Phone Number", width: 200 },
  { field: "RooomID", headerName: "Room Number", width: 100 },
  { field: "BuildingID", headerName: "Building", width: 100 }];

  const columnsAdmin = [{ field: "DepartmentName", headerName: "Department Name", width: 400 },
  { field: "DepartmentEmail", headerName: "Department Email", width: 300 },
  { field: "PhoneNumber", headerName: "Phone Number", width: 200 },
  { field: "RooomID", headerName: "Room Number", width: 100 },
  { field: "BuildingID", headerName: "Building", width: 100 },
  {
    field: "id", headerName: "Search", width: 120, renderCell: (params) => {
      return <a href="./ViewFacultyDepartmentAdmin" onClick={() => { localStorage.setItem("DepartmentID", params.row.DepartmentID) }}>View Faculty</a>
    }
  }];


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
    getDepartment().then(x => {
      setTableData(x.data)
    }
    );
  }, []);



  function DepartmentAdmin(userType, isLoggedIn) {
    var userTypes = ['Admin'];
    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {
      return (
        <>
          <div style={{ height: 650, width: '100%' }}>
            <Box sx={{ height: 400, width: 1 }}>
              <DataGrid
                rows={tableData}
                columns={columnsAdmin}
                pageSize={10}
                rowsPerPageOptions={[10]}
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

      )
    }
  }

  function DepartmentVisitor(userType, isLoggedIn) {
    var userTypes = ['Visitor'];
    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {
      return (
        <>
          <div style={{ height: 650, width: '100%' }}>
            <Box sx={{ height: 400, width: 1 }}>
              <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
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

      )
    }
  }

  return (
    <>

      <div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>
      <DepartmentAdmin userType={userType_us} isLoggedIn={isLoggedIn_us} />
      <DepartmentVisitor userType={userType_us} isLoggedIn={isLoggedIn_us} />



    </>

  );
}
export default Departments;