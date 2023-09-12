import { React, useState, useEffect } from 'react';
import { Link, redirect } from 'react-router-dom';
import './Home.css';
import Pdf from './Document/catalog.pdf';
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


function NavBar() {

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



  function Courses(userType, isLoggedIn) {
    var userTypes = ['Visitor'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">COURSES</button>
          <div className="dropdown-content">
            <a href={Pdf}> CATALOG </a>
            <Link to="./Courses">COURSES</Link>
            <Link to="./MasterSchedule">MASTER SCHEDULE</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }



  function Calender(userType, isLoggedIn) {
    var userTypes = ['Visitor'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">CALENDAR</button>
          <div className="dropdown-content">
            <Link to="./Calender"> ACADEMIC CALENDAR </Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }

  function MajorMinor(userType, isLoggedIn) {
    var userTypes = ['Visitor', 'student'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">MAJORS &amp; MINORS</button>
          <div className="dropdown-content">
            <Link to="#" />
            <Link to="./Majors">MAJORS</Link>
            <Link to="./Minor">MINORS</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }


  function DepartmentsBuilding(userType, isLoggedIn) {
    var userTypes = ['Visitor', 'Admin'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">DEPARTMENTS/BUILDINGS</button>
          <div className="dropdown-content">
            <Link to="./Departments">DEPARTMENTS</Link>
            <Link to="./Buildings">BUILDINGS</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }


  //Admin bar

  function StudentRecordsForAdmin(userType, isLoggedIn) {
    var userTypes = ['Admin'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (

        <div className="dropdown">
          <button className="dropbtn">STUDENT RECORDS</button>
          <div className="dropdown-content">
            <Link to="./SearchStudent">Search Student</Link>
            <Link to="./ViewSchedule">View Schedule</Link>
            <Link to="./ViewDegreeAudit">View Degree Audit</Link>
            <Link to="./Transcript">Unofficial Transcript</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>



      )

    }
  }

  function FacultyRecordsForAdmin(userType, isLoggedIn) {
    var userTypes = ['Admin'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">FACULTY RECORDS</button>
          <div className="dropdown-content">
            <Link to="./SearchFaculty">Search Faculty</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )
    }
  }

  function AdminPanel(userType, isLoggedIn) {
    var userTypes = ['Admin'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">ADMIN PANEL</button>
          <div className="dropdown-content">
            <a href="./Users">All users</a>
            <a href="./MasterSchedule">Master Schedule</a>
            <a href="./StudentHolds">Student Holds</a>
            <a href="./ChangeMajor_Minor">Change Major/Minor</a>
            <a href="./RegisterCourse">Add Student to a Course</a>
            <a href="./Majors">Majors</a>
            <a href="./Minor">Minors</a>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )
    }
  }

  function LogIn(userType, isLoggedIn) {
    var userTypes = ['Visitor'];


    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <Link to="./Login_Page" className="main">
            LOGIN
          </Link>
        </div>
      )
    }
  }

  function CoursesFaculty(userType, isLoggedIn) {
    var userTypes = ['Faculty'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">COURSES</button>
          <div className="dropdown-content">
            <Link to="./ViewCourses">CLASES</Link>
            <Link to="./MasterSchedule">MASTER SCHEDULE</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }

  function StudentRecordsForFaculty(userType, isLoggedIn) {
    var userTypes = ['Faculty'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (

        <div className="dropdown">
          <button className="dropbtn">STUDENT RECORDS</button>
          <div className="dropdown-content">
            <Link to="./SearchStudent">Search Student</Link>
            <Link to="./ViewStudentScheduleForFaculty">View Student's Schedule</Link>
            <Link to="./ViewDegreeAudit">View Degree Audit</Link>
            <Link to="./Transcript">Transcript</Link>
            <Link to="./FacultyAdvice">Advisement</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }

  function CoursesStudent(userType, isLoggedIn) {
    var userTypes = ['student'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">COURSES</button>
          <div className="dropdown-content">
            <Link to="./ViewSchedule">View Schedule</Link>
            <Link to="./MasterSchedule">MASTER SCHEDULE</Link>
            <Link to="./RegisterCourse">Register For A Course</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }

  function StudentRecordsForStudent(userType, isLoggedIn) {
    var userTypes = ['student'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (

        <div className="dropdown">
          <button className="dropbtn">RECORDS</button>
          <div className="dropdown-content">
            <Link to="./ViewDegreeAudit">View Degree Audit</Link>
            <Link to="./Transcript">Transcript</Link>
            <Link to="./ChangeMajor_Minor">Change Major/Minor</Link>
            <Link to="./Advisement">Advisement</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }

  function ShowStats(userType, isLoggedIn) {
    var userTypes = ['Researcher'];

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">Stats</button>
          <div className="dropdown-content">
            <Link to="./Stats">School stats</Link>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )

    }
  }







  function LogOut(userType, isLoggedIn) {
    var userTypes = ['Admin', 'student', 'Faculty', 'Researcher'];

    const handleLogout = () => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("FacultyID");
      localStorage.removeItem("StudentID");
      // this.context.router.replace('/');
      //window.location.reload(false);
      window.location.assign("./");
    }

    if (showTime(userType.userType, userType.isLoggedIn, userTypes)) {

      return (
        <div className="dropdown">
          <button className="dropbtn">ACCOUNT</button>
          <div className="dropdown-content">
            <Link to="./Profile">User Profile</Link>
            <a onClick={handleLogout}>Log Out</a>
          </div>
          <i className="fa fa-angle-down" />
        </div>
      )
    }
  }

  return (
    <header>

      <div className="topnav" id="myTopnav">
        <Link to="./" className="active"> Maple Leaf University </Link>

        <Courses userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <Calender userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <MajorMinor userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <DepartmentsBuilding userType={userType_us} isLoggedIn={isLoggedIn_us} />


        {/* Admin bar */}
        <AdminPanel userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <StudentRecordsForAdmin userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <FacultyRecordsForAdmin userType={userType_us} isLoggedIn={isLoggedIn_us} />

        {/* faculty bar */}
        <CoursesFaculty userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <StudentRecordsForFaculty userType={userType_us} isLoggedIn={isLoggedIn_us} />

        {/* student bar */}
        <CoursesStudent userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <StudentRecordsForStudent userType={userType_us} isLoggedIn={isLoggedIn_us} />

        {/* researcher bar */}
        <ShowStats userType={userType_us} isLoggedIn={isLoggedIn_us} />








        <LogOut userType={userType_us} isLoggedIn={isLoggedIn_us} />
        <LogIn userType={userType_us} isLoggedIn={isLoggedIn_us} />

      </div>
    </header>

  );
} 
export default NavBar;