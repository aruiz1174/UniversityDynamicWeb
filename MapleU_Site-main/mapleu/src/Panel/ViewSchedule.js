// faculty can view their schedule
// student can view their schedule
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getGraduateStudents, getStudent, getUndergraduateStudentHistory, getMasterSchedule, dropStudent } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from '../PersistenceService';

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


export default function ViewSchedule() {

  var localUserToken = JSON.parse(localStorage.getItem("userToken"));
  const [userId_us, setUserId] = useState('');
  const [userType_us, setUserType] = useState('');
  const [isLoggedIn_us, setIsLoggedIn] = useState('');

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

    UserId_Subject$.subscribe(x => {
      setUserId(x);
    });

    UserType_Subject$.subscribe(x => {
      setUserType(x);
    });

    isLoggedIn_Subject$.subscribe(x => {
      setIsLoggedIn(x);
    });
  });



  const columns = [{ field: "CRN", headerName: "CRN", width: 100 },
  { field: "CourseID", headerName: "Course ID", width: 90 },
  { field: "SectionNumber", headerName: "Section", width: 80 },
  { field: "CourseName", headerName: "Course Name", width: 300 },
  { field: "FirstName", headerName: "Professor", width: 85 },
  { field: "BuildingName", headerName: "Building", width: 150 },
  { field: "RoomNumber", headerName: "Room", width: 80 },
  { field: "StartTime", headerName: "Start Time", width: 100 },
  { field: "EndTime", headerName: "End Time", width: 100 },
  { field: "WeekDay", headerName: "Day", width: 100 },
  { field: "Remove", headerName: "Remove Course", width: 150, renderCell: (params) => { return <button onClick={() => handleRemoveFromAdmin(params.row.CRN)}>Remove Course</button> } },];


  const FacultyColumns = [{ field: "CRN", headerName: "CRN", width: 100 },
  { field: "CourseID", headerName: "Course ID", width: 90 },
  { field: "SectionNumber", headerName: "Section", width: 80 },
  { field: "CourseName", headerName: "Course Name", width: 300 },
  { field: "FirstName", headerName: "Professor", width: 85 },
  { field: "BuildingName", headerName: "Building", width: 150 },
  { field: "RoomNumber", headerName: "Room", width: 80 },
  { field: "StartTime", headerName: "Start Time", width: 100 },
  { field: "EndTime", headerName: "End Time", width: 100 },
  { field: "WeekDay", headerName: "Day", width: 100 },]



  const [tableDataMaster, setTableDataMaster] = useState([])
  const [studentData, setStudentData] = useState([])
  const [NextSemester, setNextSemester] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getUndergraduateStudentHistory().then(x => {
      let localStudentID = localStorage.getItem("StudentID");
      // filter the data based on the StudentID
      // show data where the StudentID matches the localStudentID
      if (userType_us == "student") {
        //console.log("userId_us: " + userId_us);
        let filterData = x.data.filter(x => x.StudentID == userId_us);
        setStudentData(filterData)
      }
      else {
        //console.log("localStudentID: " + localStudentID);
        let filteredTable = x.data.filter(x => x.StudentID == localStudentID);
        setStudentData(filteredTable)
      }

    });
  }, [userId_us, userType_us]);



  useEffect(() => {
    getMasterSchedule().then(x => {
      // show data where CRN from studentData matches CRN from MasterSchedule and keep data when other student is selected
      let filteredData = x.data.filter(x => x.SemesterID == 10 && studentData.some(y => y.CRN == x.CRN));
      setTableDataMaster(filteredData)

    }
    );
  }, [studentData]);

  useEffect(() => {
    getMasterSchedule().then(x => {
      // show data where CRN from studentData matches CRN from MasterSchedule and keep data when other student is selected
      let filteredData = x.data.filter(x => x.SemesterID == 11 && studentData.some(y => y.CRN == x.CRN));
      setNextSemester(filteredData)

    }
    );
  }, [studentData]);


  const handleRemoveFromAdmin = (e) => {
    if (userType_us == "student") {
      dropStudent(userId_us, e)
      window.location.reload();
    }
    else {
      let localStudentID = localStorage.getItem("StudentID");
      console.log(localStudentID, e);
      dropStudent(localStudentID, e)
      window.location.reload();
    }
  }

  return (
    <>
      <div>

        <div className="slides2" id="top">
          <img src="images/fall22.png" alt="bacfacile" className="center" />
        </div>

        <h1> Schedule Fall22 for {studentData[0]?.FirstName} {studentData[0]?.LastName}</h1>

        <div style={{ height: 650, width: '100%' }}>
          <Box sx={{ height: 400, width: 1 }}>
            <DataGrid
              rows={tableDataMaster}
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


        <br></br>

        <h1> Schedule Spring23 for {studentData[0]?.FirstName} {studentData[0]?.LastName}</h1>

        <div style={{ height: 650, width: '100%' }}>
          <Box sx={{ height: 400, width: 1 }}>
            <DataGrid
              rows={NextSemester}
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

      </div>
    </>
  );
}