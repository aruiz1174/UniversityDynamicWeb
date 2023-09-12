import axios from "axios";
import md5 from "md5";
//import { Observable } from 'rxjs';
//import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from './PersistenceService';


export const host = `http://31.220.55.19:443`;

export default function postUserCheck(username, password, toggle) {

   /*
   if Toggle true then data will be run md5 hash 
   */

   if (toggle === true) {
      username = md5(username);
      password = md5(password);
   }

   return axios.post(host + `/api/Login/userCheck`,
      {
         userHash: username,
         passHash: password,
      },
      {
         headers:
         {
            'Content-Type': 'application/json'
         },
      }
   );
}

// call deleteUser 
export function deleteUser(id) {
   // delete user where UserId = id

   return axios.post(host + `/api/deleteUser`,
      {
         UserId: id,
      },
      {
         headers:
         {
            'Content-Type': 'application/json'
         },
      }
   );
}

export function createUser(firstName, lastName, dob, street_address, state, city, zipCode, country, userType) {
   //call api to create user
   //console.log("HELLLOOOOOOOO", firstName);
   return axios.post(host + `/api/createUser`,
      {
         //UserId: props.UserId,
         userFname: firstName,
         userLname: lastName,
         DOB: dob,
         Address: street_address,
         State: state,
         City: city,
         ZipCode: zipCode,
         Country: country,
         UserType: userType,
         //Email: props.Email,
         //Password: props.Password,
      },
      {
         headers:
         {
            'Content-Type': 'application/json'
         },
      }
   );
}

export function editUser(userId, firstName, lastName, dob, street_address, state, city, zipCode, country, userType) {
   //call api to create user
   //console.log("HELLLOOOOOOOO", firstName);
   return axios.post(host + `/api/editUser`,
      {
         UserId: userId,
         userFname: firstName,
         userLname: lastName,
         DOB: dob,
         Address: street_address,
         State: state,
         City: city,
         ZipCode: zipCode,
         Country: country,
         UserType: userType,
         //Email: props.Email,
         //Password: props.Password,
      },
      {
         headers:
         {
            'Content-Type': 'application/json'
         },
      }
   );
}

export function Registration(studentid, crnid) {
   return axios.post(host + `/api/Registration`,
      {
         uid: studentid,
         crn: crnid,
      },
      {
         headers:
         {
            'Content-Type': 'application/json'
         },
      }
   );

}

export function dropStudent(studentid, crnid) {
   return axios.post(host + `/api/Drop/StudentCourse`,
      {
         uid: studentid,
         crn: crnid,
      },
      {
         headers:
         {
            'Content-Type': 'application/json'
         },
      }
   );

}


export function getBuildings() {

   return axios.get(host + `/api/getBuilding`)
      .then(x => { return x; });

}

export function getTimeWindow() {

   return axios.get(host + `/api/getTimeWindow`)
      .then(x => { return x; });

}

export function getDepartment() {

   return axios.get(host + `/api/getDepartment`)
      .then(x => { return x; });

}

export function getStudents() {
   return axios.get(host + `/api/getStudents`)
      .then(x => { return x; });
}

export function getStudent() {
   return axios.get(host + `/api/edit/getStudent`)
      .then(x => { return x; });
}

export function getMajor() {

   return axios.get(host + `/api/getMajor`)
      .then(x => { return x; });

}

export function getMinor() {

   return axios.get(host + `/api/getMinor`)
      .then(x => { return x; });

}

export function getMasterSchedule() {

   return axios.get(host + `/api/getMasterSchedule`)
      .then(x => { return x; });

}

export function getCourses() {

   return axios.get(host + `/api/getCourses`)
      .then(x => { return x; });

}

export function getCourse_Prerequisites() {

   return axios.get(host + `/api/getCoursePrerequisite`)
      .then(x => { return x; });

}

export function getTimeSlot() {

   return axios.get(host + `/api/getTimeslot`)
      .then(x => { return x; });

}

export function getUsers() {

   return axios.get(host + `/api/getUsers`)
      .then(x => { return x; });
}



export function getStudentHolds() {

   return axios.get(host + `/api/getStudentHolds`)
      .then(x => { return x; });

}

export function getUndergraduateStudentHistory() {

   return axios.get(host + `/api/getUndergraduateStudentHistory`)
      .then(x => { return x; });

}

export function getFacultyHistory() {

   return axios.get(host + `/api/getFacultyHistory`)
      .then(x => { return x; });

}
export function getTranscript() {

   return axios.get(host + `/api/getTranscript`)
      .then(x => { return x; });

}

export function getStudentAdvisor() {

   return axios.get(host + `/api/getStudentAdvisor`)
      .then(x => { return x; });

}

export function getFacultyAdvisor() {

   return axios.get(host + `/api/getFacultyAdvisor`)
      .then(x => { return x; });

}

export function getFaculty() {

   return axios.get(host + `/api/Create/getFaculty`)
      .then(x => { return x; });

}

export function getGraduateStudents() {

   return axios.get(host + `/api/Create/getGraduateStudents`)
      .then(x => { return x; });

}

export function getMajorRequirements() {

   return axios.get(host + `/api/getMajorRequirements`)
      .then(x => { return x; });

}

export function getMinorRequirements() {

   return axios.get(host + `/api/getMinorRequirements`)
      .then(x => { return x; });

}

export function getFacultyDepartment() {

   return axios.get(host + `/api/getFacultyDepartment`)
      .then(x => { return x; });

}

export function getStudentInfoMajorMinor() {

   return axios.get(host + `/api/getStudentInfoMajorMinor`)
      .then(x => { return x; });

}

export function getAttendance() {

   return axios.get(host + `/api/getAttendance`)
      .then(x => { return x; });

}

// ********** POST **********

export function AddMajor(id) {

   return axios.post(host + `/api/Add/Major`,
      {
         MajorID: id
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );

}

export function removeHolds(studentid, holdid) {
   return axios.post(host + `/api/Delete/Holds`,
      {
         HoldID: holdid,
         StudentID: studentid
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );
}

export function addHolds(studentid, holdid) {
   return axios.post(host + `/api/Add/Holds`,
      {
         HoldID: holdid,
         StudentID: studentid
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );
}

export function DropMajor(id) {

   return axios.post(host + `/api/Drop/Major`,
      {
         MajorID: id
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );

}

export function ChangeMajor(majorid, studentid) {

   return axios.post(host + `/api/Change/Major`,
      {
         majorID: majorid,
         studentID: studentid
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );

}

export function AddMinor(id) {

   return axios.post(host + `/api/Add/Minor`,
      {
         MinorID: id
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );

}

export function DropMinor(id) {

   return axios.post(host + `/api/Drop/Minor`,
      {
         MinorID: id
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );

}

export function ChangeMinor(addMinorID, studentid) {

   return axios.post(host + `/api/Change/Minor`,
      {
         minorID: addMinorID,
         studentID: studentid
      },
      {
         headers: {
            'Content-Type': 'application/json'
         },
      }
   );

}
export function ChangeMajorRequirements() {

   return axios.post(host + `/api/Change/MajorRequirements`)
      .then(x => { return x; });

}
export function ChangeMinorRequirements() {

   return axios.post(host + `/api/Change/MinorRequirements`)
      .then(x => { return x; });

}
export function AssignGrades() {

   return axios.post(host + `/api/Assign/Grades`)
      .then(x => { return x; });

}

export function TakeAttendance() {

   return axios.post(host + `/api/TakeAttendance`)
      .then(x => { return x; });

}

export function CreateMasterSchedule() {

   return axios.post(host + `/api/Create/Master`)
      .then(x => { return x; });

}

export function DropStudentCourse(studentID, courseID) {

   return axios.post(host + `/api/Drop/StudentCourse`,
   {
      StudentID: studentID,
      CourseID: courseID
   },
   {
      headers: {
         'Content-Type': 'application/json'
      },
   }
);
}

export function CreateCourseSections() {

   return axios.post(host + `/api/Create/CourseSection`)
      .then(x => { return x; });

}

export function DeleteCourseSection() {

   return axios.post(host + `/api/Delete/CourseSection`)
      .then(x => { return x; });

}

export function AddDepartmentFaculty(departmentID, facultyID) {

   return axios.post(host + `/api/Add/DepartmentFaculty`,
   {
      DepartmentID: departmentID,
      FacultyID: facultyID

   },
   {
      headers: {
         'Content-Type': 'application/json'
      },
   }
);

}

export function DeleteDepartmentFaculty(id) {

   return axios.post(host + `/api/Delete/DepartmentFaculty`,
   {
      FacultyID: id
   },
   {
      headers: {
         'Content-Type': 'application/json'
      },
   }
);
}

export function CreateMajor() {

   return axios.post(host + `/api/Create/Major`)
      .then(x => { return x; });

}

export function CreateMinor() {

   return axios.post(host + `/api/Create/Minor`)
      .then(x => { return x; });

}







