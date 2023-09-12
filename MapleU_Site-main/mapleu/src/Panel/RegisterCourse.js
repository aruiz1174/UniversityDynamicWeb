//student can register for a counterReset: 
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getGraduateStudents, getStudent, getUndergraduateStudentHistory, getMasterSchedule, DropStudentCourse, Registration, dropStudent, getStudentHolds, getCourse_Prerequisites, getCourses } from "../SharedService";
import postUserCheck from '../SharedService';
import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from '../PersistenceService';
import { Alert } from '@mui/material';

export default function RegisterCourse() {
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

    useEffect(() => {

        UserId_Subject$.subscribe(x => {
            setUserId(x);
        });

        UserType_Subject$.subscribe(x => {
            setUserType(x);
        });
    });

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
    { field: "WeekDay", headerName: "Day", width: 100 },
    { field: "add", headerName: "Add Course", width: 150, renderCell: (params) => { return <button onClick={() => handleAdd(params.row.CRN, params.row.WeekDay, params.row.StartTime, params.row.EndTime, params.row.CourseID)}>Add Course</button> } },];

    const columnsRemove = [{ field: "CRN", headerName: "CRN", width: 100 },
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
    { field: "Remove", headerName: "Remove Course", width: 150, renderCell: (params) => { return <button onClick={() => handleRemove(params.row.CRN)}>Remove Course</button> } },];

    const [tableDataMaster, setTableDataMaster] = useState([])
    const [studentData, setStudentData] = useState([])
    const [NextSemester, setNextSemester] = useState([])
    const [tableData, setTableData] = useState([])
    const [NextSchedule, setNextSchedule] = useState([])
    const [studentHolds, setStudentHolds] = useState([])
    const [student, setStudent] = useState([])
    const [coursePrerequisites, setCoursePrerequisites] = useState([])
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getStudentHolds().then(x => {
            setStudentHolds(x.data)
        });
    }, []);

    useEffect(() => {
        getStudent().then(x => {
            // filter with userId_us
            let StudentID = localStorage.getItem("StudentID");
            if(userType_us == "student"){

                let filteredData = x.data.filter(x => x.StudentID == userId_us);
                setStudent(filteredData)
            }
            else{
                let filteredData = x.data.filter(x => x.StudentID == StudentID);
                setStudent(filteredData)
            }
        });
    }, [userId_us]);

    useEffect(() => {
        getCourse_Prerequisites().then(x => {
            setCoursePrerequisites(x.data)
        });
    }, []);

    useEffect(() => {
        getCourses().then(x => {
            setCourses(x.data)
        });
    }, []);

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
            let filteredData = x.data.filter(x => x.SemesterID == 11);
            setNextSemester(filteredData)
        });
    }, []);

    useEffect(() => {
        getMasterSchedule().then(x => {
            // show data where CRN from studentData matches CRN from MasterSchedule and keep data when other student is selected
            let filteredData = x.data.filter(x => x.SemesterID == 11 && studentData.some(y => y.CRN == x.CRN));
            setNextSchedule(filteredData)

        }
        );
    }, [studentData]);


    const handleRemove = (e) => {
        console.log(e, userId_us);
        if (userType_us == "student") {
            dropStudent(userId_us, e)
            alert("course dropped")
            window.location.reload();
        }
        else {
            let localStudentID = localStorage.getItem("StudentID");
            console.log(localStudentID, e);
            dropStudent(localStudentID, e)
            alert("course dropped")
            window.location.reload();
        }
    }



    const handleAdd = (e, w, s, en, course) => {
        if (userType_us == "student") {
            // check if any student in studentHolds is equal to the userId_us and if it is, alert the user
            if (studentHolds.some(x => x.FacultyID == userId_us)) {
                alert("You have a hold, please contact the administration's offcice.");
            }
            // now chenct if that CRN is already in the NextSchedule 
            else if (NextSchedule.some(x => x.CRN == e)) {
                alert("You are already registered for this course.");
            }
            // now if the Day and Time is already in the NextSchedule 
            else if (NextSchedule.some(x => x.WeekDay == w && x.StartTime == s && x.EndTime == en)) {
                alert("You have a time conflict.");
            }
            // now if student.Year is full time and the number of courses is greater than 4 
            else if (student.some(x => x.Year == "Full_Time" && NextSchedule.length >= 4)) {
                alert("Full Time conflict. You are already registered for 4 courses.");
            }
            // now if student.Year is part time and the number of courses is greater than 2
            else if (student.some(x => x.Year == "Part_Time" && NextSchedule.length >= 2)) {
                alert("Part Time conflict. You are already registered for 2 courses.");
            }

            // if student try to register for a course he already took
            else if (studentData.some(x => x.CourseID == course)) {
                alert("You already took this course.");
            }

            // if student is undergraduate and the courseid starts with GRAD then alert the user
            else if (student.some(x => x.StudentType == "Undergraduate" && course.startsWith("GRAD"))) {
                alert("You are not allowed to take graduate courses.");
            }
            // if student is graduate and the courseid does not start with GRAD then alert the user
            else if (student.some(x => x.StudentType == "Graduate" && !course.startsWith("GRAD"))) {
                alert("You are not allowed to take undergraduate courses.");
            }

            // check if the course has prerequisites and if it does, check if the student has taken the prerequisites
            else if (coursePrerequisites.some(x => x.CourseID == course)) {
                // get the prerequisites for the course
                let prerequisites = coursePrerequisites.filter(x => x.CourseID == course);
                // get the courseIDs for the prerequisites
                let courseIDs = prerequisites.map(x => x.PrerequisiteID);
                // check if the student has taken the prerequisites
                if (studentData.some(x => courseIDs.includes(x.CourseID))) {
                    Registration(userId_us, e)
                    alert("Course added")
                    window.location.reload();
                }
                else {
                    alert("You have not taken the prerequisites for this course.");
                }
            }
            else {
                Registration(userId_us, e)
                alert("Course added")
                window.location.reload();
            }
        }
        else {
            let localStudentID = localStorage.getItem("StudentID");
            // check if any student in studentHolds is equal to the userId_us and if it is, alert the user
            if (studentHolds.some(x => x.FacultyID == localStudentID)) {
                alert("You have a hold, please check your holds.");
            }
            // now chenct if that CRN is already in the NextSchedule 
            else if (NextSchedule.some(x => x.CRN == e)) {
                alert("You are already registered for this course.");
            }
            // now if the Day and Time is already in the NextSchedule 
            else if (NextSchedule.some(x => x.WeekDay == w && x.StartTime == s && x.EndTime == en)) {
                alert("You have a time conflict.");
            }
            // now if student.Year is full time and the number of courses is greater than 4 
            else if (student.some(x => x.Year == "Full_Time" && NextSchedule.length >= 4)) {
                alert("Full Time conflict. You are already registered for 4 courses.");
            }
            // now if student.Year is part time and the number of courses is greater than 2
            else if (student.some(x => x.Year == "Part_Time" && NextSchedule.length >= 2)) {
                alert("Part Time conflict. You are already registered for 2 courses.");
            }
           

            // check if the course has prerequisites and if it does, check if the student has taken the prerequisites
            else if (coursePrerequisites.some(x => x.CourseID == course)) {
                // get the prerequisites for the course
                let prerequisites = coursePrerequisites.filter(x => x.CourseID == course);
                // get the courseIDs for the prerequisites
                let courseIDs = prerequisites.map(x => x.PrerequisiteID);
                // check if the student has taken the prerequisites
                if (studentData.some(x => courseIDs.includes(x.CourseID))) {
                    Registration(localStudentID, e)
                    alert("Course added")
                    window.location.reload();
                }
                else {
                    alert("You have not taken the prerequisites for this course.");
                }
            }
            else {
                Registration(localStudentID, e)
                alert("Course added")
                window.location.reload();
            }

        }
    }


    return (
        <>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>
            <h1> Register {studentData[0]?.FirstName} for a Course - SPRING23 </h1>

            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={NextSemester}
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


            <br></br>

            <h1> Schedule Spring23 for {studentData[0]?.FirstName} {studentData[0]?.LastName}</h1>

            <div style={{ height: 650, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid
                        rows={NextSchedule}
                        columns={columnsRemove}
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