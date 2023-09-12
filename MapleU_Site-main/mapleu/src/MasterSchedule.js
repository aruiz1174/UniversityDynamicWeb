//admin can view and edit master schedule
//student can view master schedule
//faculty can view master schedule
import './Home.css';
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getMasterSchedule } from "./SharedService";
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


function MasterSchedule() {

  const columns = [{ field: "CRN", headerName: "CRN", width: 100 },
  { field: "CourseID", headerName: "Course ID", width: 90 },
  { field: "SectionNumber", headerName: "Section", width: 80 },
  { field: "CourseName", headerName: "Course Name", width: 300 },
  { field: "FirstName", headerName: "Professor", width: 85 },
  { field: "BuildingName", headerName: "Building", width: 150 },
  { field: "RoomNumber", headerName: "Room", width: 80 },
  { field: "SectionAvailability", headerName: "Seats available", width: 150 },
  { field: "StartTime", headerName: "Start Time", width: 100 },
  { field: "EndTime", headerName: "End Time", width: 100 },
  { field: "WeekDay", headerName: "Day", width: 100 }];

  const columnsAdmin = [{ field: "CRN", headerName: "CRN", width: 100 },
  { field: "CourseID", headerName: "Course ID", width: 90 },
  { field: "SectionNumber", headerName: "Section", width: 80 },
  { field: "CourseName", headerName: "Course Name", width: 300 },
  { field: "FirstName", headerName: "Professor", width: 85 },
  { field: "BuildingName", headerName: "Building", width: 150 },
  { field: "RoomNumber", headerName: "Room", width: 80 },
  { field: "SectionAvailability", headerName: "Seats available", width: 150 },
  { field: "StartTime", headerName: "Start Time", width: 100 },
  { field: "EndTime", headerName: "End Time", width: 100 },
  { field: "WeekDay", headerName: "Day", width: 100 },
  { field: "Delete", headerName: "Delete", width: 80, renderCell: (params) => { return (<div> <button onClick={() => handleDelete(params)} >Delete</button> </div>); }, }];

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

  const handleEdit = (e) => {

  }


  const handleDelete = (e) => {

  }

  const createCourse = () => {
    window.location.href = "./CreateCourseSection";
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

  const [semester, setSemester] = useState();

  let tableMap = {
    undefined: 10, // by default
    "FALL23": 12,
    "SPRING23": 11,
    "FALL22": 10,
    "SPRING22": 9,
    "FALL21": 8,
    "SPRING21": 7,
    "FALL20": 6,
    "SPRING20": 5,
    "FALL19": 4,
    "SPRING19": 3,
    "FALL18": 2,
    "SPRING18": 1
  }

  useEffect(() => {

    getMasterSchedule().then(x => {
      const temp = tableMap[semester];
      //console.log('temp: ', temp);
      const filteredData = x.data.filter(x => x.SemesterID === temp)
      setTableData(filteredData)
    }
    );

  }, [semester]);

  function MasterScheduleView(userType, isLoggedIn) {
    var userTypes = ['Visitor', 'Faculty', 'student'];


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
      )
    }
  }


  function MasterScheduleAdmin(userType, isLoggedIn) {
    var userTypes = ['Admin'];
    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {
      return (
        <>
          <br></br>
          <input
            type="button"
            defaultValue="Create New Course-Section"
            className="btn btn-primary"
            id="submit"
            onClick={createCourse}
          />
          <div style={{ height: 650, width: '100%' }}>
            <Box sx={{ height: 400, width: 1 }}>
              <DataGrid
                rows={tableData}
                columns={columnsAdmin}
                pageSize={10}
                rowsPerPageOptions={[10]}
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

      )
    }
  }
  return (
    <div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>MASTER SCHEDULE - {semester}</h1>
      <div>
        <h3>Select Semester</h3>
        <select id="semester" value={semester}
          onChange={e => setSemester(e.target.value)}>
          <option value="">--</option>
          <option value="FALL23">FALL23</option>
          <option value="SPRING23">SPRING23</option>
          <option value="FALL22">FALL22</option>
          <option value="SPRING22">SPRING22</option>
          <option value="FALL21">FALL21</option>
          <option value="SPRING21">SPRING21</option>
          <option value="FALL20">FALL20</option>
          <option value="SPRING20">SPRING20</option>
          <option value="FALL19">FALL19</option>
          <option value="SPRING19">SPRING19</option>
          <option value="FALL18">FALL18</option>
          <option value="SPRING18">SPRING18</option>
        </select>

      </div>
      <MasterScheduleView userType={userType_us} isLoggedIn={isLoggedIn_us} />
      <MasterScheduleAdmin userType={userType_us} isLoggedIn={isLoggedIn_us} />
    </div>
  )
}
export default MasterSchedule;
