import "./App.css";

import React from "react";
import { Routes, Route } from 'react-router-dom';


import NavBar from "./NavBar";
import Home from "./Home";
import Buildings from "./Buildings";
import Calender from "./Calender";
import Courses from "./Courses";
import Departments from "./Departments";
import Majors from "./Majors";
import Minor from "./Minor";
import MasterSchedule from "./MasterSchedule";
import Login_Page from "./Login_Page";
import Course_Prerequisites from "./Course_Prerequisites";
import Profile from "./Panel/Profile";
import Advisement from "./Panel/Advisement";
import Attendance from "./Panel/Attendance";
import ChangeMajo_rMinor from './Panel/ChangeMajor_Minor';
import Grades from "./Panel/Grades";
import RegisterCourse from "./Panel/RegisterCourse";
import Transcript from "./Panel/Transcript";
import SearchFaculty from "./Panel/SearchFaculty";
import SearchStudent from "./Panel/SearchStudent";
import Stats from "./Panel/Stats";
import StudentHolds from "./Panel/StudentHolds";
import Users from "./Panel/Users";
import ViewCourses from "./Panel/ViewCourses";
import ViewDegreeAudit from "./Panel/ViewDegreeAudit";
import ViewSchedule from "./Panel/ViewSchedule";
import CreateUser from './Panel/CreateUser';
import AddHold from "./Panel/AddHold";
import FacultyDept from "./Panel/FacultyDept";
import FacultyAdvice from "./Panel/FacultyAdvice";
import ViewClassList from "./Panel/ViewClassList";
import ViewFacultyDepartmentAdmin from "./Panel/ViewFacultyDepartmentAdmin";
import CreateCourseSection from "./Panel/CreateCourseSection";
import MajorRequirements from "./MajorRequirements";
import MinorRequirements from "./MinorRequirements";
import AddDeptToFaculty from "./Panel/AddDeptToFaculty";
import ViewStudentScheduleForFaculty from "./Panel/ViewStudentScheduleForFaculty";
import CreateMajor from "./Panel/CreateMajor";


/*
const express = require("express")
const app = express()

app.listen(3000)

*/

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Buildings" element={<Buildings />} />
        <Route exact path="/Calender" element={<Calender />} />
        <Route exact path="/Courses" element={<Courses />} />
        <Route exact path="/Departments" element={<Departments />} />
        <Route exact path="/Majors" element={<Majors />} />
        <Route exact path="/Minor" element={<Minor />} />
        <Route exact path="/MasterSchedule" element={<MasterSchedule />} />
        <Route exact path="/Login_Page" element={<Login_Page />} />
        <Route exact path="/Course_Prerequisites" element={<Course_Prerequisites />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/Advisement" element={<Advisement />} />
        <Route exact path="/Attendance" element={<Attendance />} />
        <Route exact path="/ChangeMajor_Minor" element={<ChangeMajo_rMinor />} />
        <Route exact path="/Grades" element={<Grades />} />
        <Route exact path="/RegisterCourse" element={<RegisterCourse />} />
        <Route exact path="/Transcript" element={<Transcript />} />
        <Route exact path="/SearchFaculty" element={<SearchFaculty />} />
        <Route exact path="/SearchStudent" element={<SearchStudent />} />
        <Route exact path="/Stats" element={<Stats />} />
        <Route exact path="/StudentHolds" element={<StudentHolds />} />
        <Route exact path="/Users" element={<Users />} />
        <Route exact path="/ViewCourses" element={<ViewCourses />} />
        <Route exact path="/ViewDegreeAudit" element={<ViewDegreeAudit />} />
        <Route exact path="/ViewSchedule" element={<ViewSchedule />} />
        <Route exact path="/CreateUser" element={<CreateUser />} />
        <Route exact path="/AddHold" element={<AddHold />} />
        <Route exact path="/FacultyDept" element={<FacultyDept />} />
        <Route exact path="/FacultyAdvice" element={<FacultyAdvice />} />
        <Route exact path="/ViewClassList" element={<ViewClassList />} />
        <Route exact path="/ViewFacultyDepartmentAdmin" element={<ViewFacultyDepartmentAdmin />} />
        <Route exact path="/CreateCourseSection" element={<CreateCourseSection />} />
        <Route exact path="/MajorRequirements" element={<MajorRequirements />} />
        <Route exact path="/MinorRequirements" element={<MinorRequirements />} />
        <Route exact path="/AddDeptToFaculty" element={<AddDeptToFaculty />} />
        <Route exact path="/ViewStudentScheduleForFaculty" element={<ViewStudentScheduleForFaculty />} />
        <Route exact path="/CreateMajor" element={<CreateMajor />} />
      </Routes>
    </div>
  );
}

export default App;