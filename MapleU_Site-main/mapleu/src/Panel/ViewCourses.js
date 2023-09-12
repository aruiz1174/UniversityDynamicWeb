// admin can view faculty's courses
// faculty can view his/her courses
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getMasterSchedule, getFacultyHistory } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from '../PersistenceService';




function ViewCourses() {

  const columns = [{ field: "CourseName", headerName: "Course Name", width: 350 },
  { field: "CRN", headerName: "CRN", width: 150 },
  { field: "BuildingName", headerName: "Building", width: 200 },
  { field: "RoomNumber", headerName: "Room", width: 100 },
  { field: "SectionNumber", headerName: "Section", width: 100 },
  { field: "id", headerName: "Class List", width: 120, renderCell: (params) => {
      return <a href="./ViewClassList" onClick={() => click(params)}>View Students</a>}},
  { field: "ids", headerName: "Attendance", width: 120, renderCell: (params) => {
      return <a href="./Attendance" onClick={() => click(params)}>View Attendace</a>}}, 
  { field: "idGrade", headerName: "Grade", width: 100, renderCell: (params) => {
    return <a href="./Grades" onClick={() => click(params)}>View Grade</a>}}];



  const facultyHistoryColumns = [{ field: "CourseName", headerName: "Course Name", width: 350 },
  { field: "CRN", headerName: "CRN", width: 150 },
  { field: "SemesterName", headerName: "Semester", width: 100 },];



  const columnsNextSemester = [{ field: "CourseName", headerName: "Course Name", width: 350 },
  { field: "CRN", headerName: "CRN", width: 150 },
  { field: "BuildingName", headerName: "Building", width: 200 },
  { field: "RoomNumber", headerName: "Room", width: 100 },
  { field: "SectionNumber", headerName: "Section", width: 100 },
  {
    field: "id", headerName: "Class List", width: 120, renderCell: (params) => {
      return <a href="./ViewClassList" onClick={() => click(params)}>View Students</a>
    }
  }];



  var localUserToken = JSON.parse(localStorage.getItem("userToken"));
  const [userId_us, setUserId] = useState('');
  const [userType_us, setUserType] = useState('');

  if (localUserToken !== null) {
    postUserCheck(localUserToken.userId, localUserToken.password, false).then(x => {

      if (x.data !== null) {
        UserId_Subject$.next(x.data.userId);
      }


    });
  }

  const click = (params) => {
    localStorage.setItem("FacultyID", params.row.FacultyID);
    localStorage.setItem("CRN", params.row.CRN);
  }

  useEffect(() => {

    UserId_Subject$.subscribe(x => {
      setUserId(x);
    });

    UserType_Subject$.subscribe(x => {
      setUserType(x);
    });
  });

  const [tableData, setTableData] = useState([])
  const [FacultyHistory, setFacultyHistory] = useState([])
  const [FacultyDataNextSemester, setFacultyDataNextSemester] = useState([])

  useEffect(() => {
    getMasterSchedule().then(x => {
      let localFacultyID = localStorage.getItem("FacultyID");
      // filter the data based on the FacultyID
      // show data where the FacultyID matches the localFacultyID
      if (userType_us == "Faculty") {
        console.log("userId_us: hellloooooooo " + userId_us);
        setTableData(x.data.filter(x => x.FacultyID == userId_us && x.SemesterID == 10));
      }
      else {
        console.log("localFacultyID: " + localFacultyID);
        setTableData(x.data.filter(x => x.FacultyID == localFacultyID && x.SemesterID == 10));
      }

    });
  }, [userId_us, userType_us]);

  useEffect(() => {
    getMasterSchedule().then(x => {
      let localFacultyID = localStorage.getItem("FacultyID");
      // filter the data based on the FacultyID
      // show data where the FacultyID matches the localFacultyID
      if (userType_us == "Faculty") {
        console.log("userId_us: " + userId_us);
        setFacultyDataNextSemester(x.data.filter(x => x.FacultyID == userId_us && x.SemesterID == 11));
      }
      else {
        console.log("localFacultyID: " + localFacultyID);
        setFacultyDataNextSemester(x.data.filter(x => x.FacultyID == localFacultyID && x.SemesterID == 11));
      }

    });
  }, [userId_us, userType_us]);

  useEffect(() => {
    getFacultyHistory().then(x => {
      let localFacultyID = localStorage.getItem("FacultyID");
      // filter the data based on the FacultyID
      // show data where the FacultyID matches the localFacultyID
      if (userType_us == "Faculty") {
        //console.log("userId_us: " + userId_us);
        setFacultyHistory(x.data.filter(x => x.FacultyID == userId_us));
      }
      else {
        //console.log("localFacultyID: " + localFacultyID);
        setFacultyHistory(x.data.filter(x => x.FacultyID == localFacultyID));
      }
    });
  }, [userId_us, userType_us]);

  return (
    <>

<div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>
      <h1>Faculty Courses for Fall 2022 - {tableData[0]?.FirstName}</h1>

      <div style={{ height: 650, width: '100%' }}>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.CRN}

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


      <h1>Faculty Courses for SPRING 2023</h1>

      <div style={{ height: 650, width: '100%' }}>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={FacultyDataNextSemester}
            columns={columnsNextSemester}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.CRN}

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

      <br></br>
      <br></br>
      <h1>Faculty Course History</h1>
      <div style={{ height: 650, width: '100%' }}>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={FacultyHistory}
            columns={facultyHistoryColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.CRN}

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

export default ViewCourses;