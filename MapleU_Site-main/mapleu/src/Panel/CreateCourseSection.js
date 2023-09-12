
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getMasterSchedule, getCourses, getTimeSlot } from "../SharedService";
import { UserName_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserId_Subject$ } from '../PersistenceService'
import postUserCheck from '../SharedService';

function CreateCourseSection() {

    const [courseID, setCourseID] = useState([]);
    const [sectionNumber, setSectionNumber] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [building, setBuilding] = useState([]);
    const [room, setRoom] = useState([]);
    const [timeslot, setTimeSlot] = useState([]);
    const [capacity, setCapacity] = useState([]);
    const [startTime, setStartTime] = useState([]);



    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        getCourses().then(x => {
            setCourseList(x.data);
        });
    }, []);

    const [masterSchedule, setMasterSchedule] = useState([]);
    useEffect(() => {
        getMasterSchedule().then(x => {
            setMasterSchedule(x.data);
        });
    }, []);

    const [timeSlotList, setTimeSlotList] = useState([]);
    useEffect(() => {
        getTimeSlot().then(x => {
            setTimeSlotList(x.data);
        });
    }, []);


    // fucntion to return a select option for each CourseID from the database
    const getCourseList = () => {
        return masterSchedule.map((course) => {
            if (course.SemesterID == 11) {
                return (
                    // get and save CourseID and CourseName vlaues
                    <option value={course.CourseID}>{course.CourseID} - {course.CourseName}</option>

                )
            }
        })
    }

    // get facultyID from semesterID = 11 
    const getFacultyList = () => {
        return masterSchedule.map((faculty) => {
            if (faculty.SemesterID == 11) {
                return (
                    <option value={faculty.FacultyID}>{faculty.FacultyID} - {faculty.FirstName} {faculty.LastName}</option>
                )
            }
        })
    }

    // get roomNumber from semesterID = 11
    const getRoomList = () => {
        return masterSchedule.map((room) => {
            if (room.SemesterID == 11) {
                return (
                    <option value={room.RoomNumber}>{room.RoomNumber} - {room.BuildingName}</option>
                )
            }
        })
    }

    const getDays = () => {
        return timeSlotList.map((days) => {
            return (
                <option value={days.WeekDay}>{days.WeekDay}</option>
            )
        })
    }

    const getStartTime = () => {
        return timeSlotList.map((startTime) => {
            return (
                <option value={startTime.StartTime}>{startTime.StartTime} - {startTime.EndTime}</option>
            )
        })
    }




    const createClass = () => {
        // check if the room and time exists in the database
        if (masterSchedule.filter(x => x.RoomNumber == room && x.StartTime == startTime).length > 0) {
            alert("Room and time conflict. This room and time is already taken");
        }

        // check if the capacity is greater than 0
        else if (capacity <= 0) {
            alert("Capacity must be greater than 0");
        }

        // check if faculty is already teaching another class at the same time
        else if (masterSchedule.filter(x => x.FacultyID == faculty && x.StartTime == startTime).length > 0) {
            alert("Faculty and time conlfict. This faculty is already teaching another class at this time");
        }

        else {
            //CreateCourseSections(courseID, sectionNumber, faculty, building, room, timeslot, capacity, startTime);
            alert("Class Created");
        }
    }

    return (
        <>
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Create Course Section for Spring 23</h1>
            <br/>
            <br/>
            <form>
            <div>
                <label htmlFor="courseID">Course Name</label>
                <select className='form-control' onChange={(e) => setCourseID(e.target.value)} value={courseID} id='courseID'>
                    {getCourseList()}
                </select>
            </div>
            <br/>
            <div>
                <label for="sectionNumber">Section Number</label>
                <select className="form-control" onChange={(e) => setSectionNumber(e.target.value)} value={sectionNumber} id="sectionNumber">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <br/>
            <div>
                <div className="form-group">
                    <label htmlFor="faculty">Professor</label>
                    <select className="form-control" onChange={(e) => setFaculty(e.target.value)} value-={faculty} id="faculty">
                        {getFacultyList()}
                    </select>
                </div>
            </div>
            <br/>
            <div>
                <div className="form-group">
                    <label htmlFor="building">Building</label>
                    <select className="form-control" onChange={(e) => setBuilding(e.target.value)} value-={building} id="building">
                        <option value="Academic Building">Academic Building</option>
                        <option value="Student Center">Student Center</option>
                        <option value="Administration Building">Administration Building</option>
                    </select>
                </div>
            </div>
            <br/>
            <div>
                <div className="form-group">
                    <label htmlFor="room">Room</label>
                    <select className="form-control" onChange={(e) => setRoom(e.target.value)} value-={room} id="room">
                        {getRoomList()}
                    </select>
                </div>
            </div>
            <br/>
            <div>
                <div className="form-group">
                    <label htmlFor="timeslot">Days</label>
                    <select className="form-control" onChange={(e) => setTimeSlot(e.target.value)} value-={timeslot} id="timeslot">
                        <option value="MW">MW</option>
                        <option value="TR">TR</option>
                    </select>
                </div>
            </div>
            <br/>
            <div>
                <div className="form-group">
                    <label htmlFor="starttime">Time</label>
                    <select className="form-control" onChange={(e) => setStartTime(e.target.value)} value-={startTime} id="starttime">
                        {getStartTime()}
                    </select>
                </div>
            </div>
            <br/>
            <div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input type="number" className="form-control" onChange={(e) => setCapacity(e.target.value)} value={capacity} id="capacity" />
                </div>
            </div>

            <br></br>               
                <input
                type="button"
                defaultValue="Submit"
                className="btn btn-primary"
                id="submit"
                onClick={createClass}


              />
            </form>
        </div>


        </>
    )

}

export default CreateCourseSection;