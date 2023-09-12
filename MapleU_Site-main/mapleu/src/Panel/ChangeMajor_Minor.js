//admin can change the major and minor of a student
//student can change their major and minor
import { React, useEffect, useState } from 'react';
import { getStudent, getUndergraduateStudentHistory, ChangeMajor, ChangeMinor, AddMajor } from "../SharedService";
import { UserId_Subject$, UserType_Subject$ } from '../PersistenceService';
import postUserCheck from '../SharedService';


function ChangeMajor_Minor() {

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


    const [tableData, setTableData] = useState([])
    const [studentData, setStudentData] = useState([])

    useEffect(() => {
        getUndergraduateStudentHistory().then(x => {
            let localStudentID = localStorage.getItem("StudentID");

            if (userType_us == "student") {
                //console.log("userId_us change MM: " + userId_us);
                let filterData = x.data.filter(x => x.StudentID == userId_us);
                setStudentData(filterData)
            }
            else {
                //console.log("localStudentID: " + localStudentID);
                let filteredTable = x.data.filter(x => x.StudentID == localStudentID);
                setStudentData(filteredTable)
            }

        }
        );
    }, [userId_us]);

    useEffect(() => {
        getStudent().then(x => {
            let localStudentID2 = localStorage.getItem("StudentID");
            // filter the data based on the FacultyID
            // show data where the FacultyID matches the localFacultyID
            let filteredData = x.data.filter(x => x.StudentID == localStudentID2);
            // clear the local storage
            setTableData(filteredData)


        }
        );
    }, []);

    const [AddNewMajor, setAddMajor] = useState([]);
    const [AddNewMinor, setAddMinor] = useState([]);
    const [ChangeAMajor, setChangeMajor] = useState([]);
    const [ChangeAMinor, setChangeMinor] = useState([]);
    const [DropAMajor, setDropMajor] = useState([]);
    const [DropAMinor, setDropMinor] = useState([]);

    const addMajor = () => {
        // get the value from the select box 
        let major = document.getElementById("AddMajor").value;

        // call the service to add the major
        AddMajor(major);

    }

    const addMinor = () => {
    }

    const changeMajor = () => {
        let studentid = localStorage.getItem("StudentID");
        let majors;

        // get value from the select box
        let ChangeAMajor = document.getElementById("ChangeAMajor").value;

        console.log("ChangeAMajor: " + ChangeAMajor);
        if (ChangeAMajor === "Adolescence Education: Chemistry (7-12)") {
            majors = 1;
        }
        else if (ChangeAMajor === "Adolescent Education: Social Studies (7-12)") {
            majors = 2;
        }
        else if (ChangeAMajor === "Adolescence Education: Spanish (7-12)") {
            majors = 3;
        }
        else if (ChangeAMajor === "American Studies") {
            majors = 4;
        }
        else if (ChangeAMajor === "Biological Sciences") {
            majors = 5;
        }
        else if (ChangeAMajor === "Chemistry") {
            majors = 6;
        }
        else if (ChangeAMajor === "English") {
            majors = 7;
        }
        else if (ChangeAMajor === "History") {
            majors = 8;
        }
        else if (ChangeAMajor === "Industrial and Labor Relations") {
            majors = 9;
        }
        else if (ChangeAMajor === "Media and Communications") {
            majors = 10;
        }
        else if (ChangeAMajor === "Philosophy and Religion") {
            majors = 11;
        }
        else if (ChangeAMajor === "Politics, Economics & Law") {
            majors = 12;
        }
        else if (ChangeAMajor === "Psychology") {
            majors = 13;
        }
        else if (ChangeAMajor === "Sociology") {
            majors = 14;
        }
        else if (ChangeAMajor === "Spanish Language, Hispanic Literature & Culture") {
            majors = 15;
        }
        else if (ChangeAMajor === "Visual Arts") {
            majors = 16;
        }
        else if (ChangeAMajor === "Accounting") {
            majors = 17;
        }
        else if (ChangeAMajor === "Adolescence Education: Biology (7-12)") {
            majors = 18;
        }
        else if (ChangeAMajor === "Adolescence Education: Mathematics (7-12)") {
            majors = 19;
        }
        else if (ChangeAMajor === "Biochemistry") {
            majors = 20;
        }
        else if (ChangeAMajor === "Business Administration") {
            majors = 21;
        }
        else if (ChangeAMajor === "Childhood Education (1-6)") {
            majors = 22;
        }
        else if (ChangeAMajor === "Computer & Information Sciences") {
            majors = 23;
        }
        else if (ChangeAMajor === "Criminology") {
            majors = 24;
        }
        else if (ChangeAMajor === "Finance") {
            majors = 25;
        }
        else if (ChangeAMajor === "Health and Society") {
            majors = 26;
        }
        else if (ChangeAMajor === "Management Information Systems") {
            majors = 27;
        }
        else if (ChangeAMajor === "Marketing") {
            majors = 28;
        }
        else if (ChangeAMajor === "Mathematics") {
            majors = 29;
        }
        else if (ChangeAMajor === "Middle Childhood Education: Biology (5-9)") {
            majors = 30;
        }
        else if (ChangeAMajor === "Middle Childhood Education: Chemistry (5-9)") {
            majors = 31;
        }
        else if (ChangeAMajor === "Middle Childhood Education: Mathematics (5-9)") {
            majors = 32;
        }
        else if (ChangeAMajor === "Middle Childhood Education: Spanish (5-9)") {
            majors = 33;
        }
        else if (ChangeAMajor === "Visual Arts: Electronic Media") {
            majors = 34;
        }
        else {
            majors = 0;
        }

        if (userType_us === "student") {
            console.log(majors);
            console.log(studentid);
            ChangeMajor(majors, userId_us);
            alert("Major has been changed");
        }
        else {

            console.log(majors);
            console.log(studentid);
            ChangeMajor(majors, studentid);
            alert("Major has been changed");
        }
    }

    const changeMinor = () => {
        let studentid = localStorage.getItem("StudentID");
        let minors;

        // get value from the select box
        let ChangeAMinor = document.getElementById("ChangeAMinor").value;

        console.log("ChangeAMinor: " + ChangeAMinor);
        if (ChangeAMinor === "Accounting") {
            minors = 1;
        }
        else if (ChangeAMinor === "African American Studies") {
            minors = 2;
        }
        else if (ChangeAMinor === "Applied Mathematics") {
            minors = 3;
        }
        else if (ChangeAMinor === "Chemistry") {
            minors = 4;
        }
        else if (ChangeAMinor === "Computer and Information Sciences") {
            minors = 5;
        }
        else if (ChangeAMinor === "Congregational Leadership") {
            minors = 6;
        }
        else if (ChangeAMinor === "Digital Design Marketing") {
            minors = 7;
        }
        else if (ChangeAMinor === "Economics") {
            minors = 8;
        }
        else if (ChangeAMinor === "Entertainment and Sports Management") {
            minors = 9;
        }
        else if (ChangeAMinor === "Environmental Studies") {
            minors = 10;
        }
        else if (ChangeAMinor === "French Studies") {
            minors = 11;
        }
        else if (ChangeAMinor === "General Business") {
            minors = 12;
        }
        else {
            minors = 0;
        }

        console.log(minors);
        console.log(studentid);
        ChangeMinor(minors, studentid);
        alert("Minor has been changed");
    }

    const dropMajor = () => {
    }

    const dropMinor = () => {
    }



    return (
        <>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            <br></br>

            <h1>Change Major or Minor for - {studentData[0]?.FirstName} {studentData[0]?.LastName}</h1>
            <h4>Actual Major: {studentData[0]?.MajorName}</h4>

            <div>
                <label for="ChangeAMajor">Choose a major:</label>
                <select name="ChangeAMajor" id="ChangeAMajor">
                    <option value="">Select a major</option>
                    <option value="Adolescence Education: Chemistry (7-12)">Adolescence Education: Chemistry (7-12)</option>
                    <option value="Adolescent Education: Social Studies (7-12)">Adolescent Education: Social Studies (7-12)</option>
                    <option value="Adolescence Education: Spanish (7-12)">Adolescence Education: Spanish (7-12)</option>

                    <option value="American Studies">American Studies</option>
                    <option value="Biological Sciences">Biological Sciences</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Industrial and Labor Relations">Industrial and Labor Relations</option>
                    <option value="Media and Communications">Media and Communications</option>
                    <option value="Philosophy and Religion">Philosophy and Religion</option>
                    <option value="Politics, Economics & Law">Politics, Economics & Law</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Sociology">Sociology</option>
                    <option value="Spanish Language, Hispanic Literature & Culture">Spanish Language, Hispanic Literature & Culture</option>
                    <option value="Visual Arts">Visual Arts</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Adolescence Education: Biology (7-12)">Adolescence Education: Biology (7-12)</option>
                    <option value="Adolescence Education: Mathematics (7-12)">Adolescence Education: Mathematics (7-12)</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Childhood Education (1-6)">Childhood Education (1-6)</option>
                    <option value="Childhood Education with Bilingual Extension (1-6)">Childhood Education with Bilingual Extension (1-6)</option>
                    <option value="Computer & Information Science">Computer & Information Science</option>
                    <option value="Criminology">Criminology</option>
                    <option value="Finance">Finance</option>
                    <option value="Health and Society">Health and Society</option>
                    <option value="Management Information Systems">Management Information Systems</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Middle Childhood Education: Biology (5-9)">Middle Childhood Education: Biology (5-9)</option>
                    <option value="Middle Childhood Education: Chemistry (5-9)">Middle Childhood Education: Chemistry (5-9)</option>
                    <option value="Middle Childhood Education: Mathematics (5-9)">Middle Childhood Education: Mathematics (5-9)</option>
                    <option value="Middle Childhood Education: Spanish (5-9)">Middle Childhood Education: Spanish (5-9)</option>
                    <option value="Visual Arts: Electronic Media">Visual Arts: Electronic Media</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Taxation">Taxation</option>
                    <option value="Accounting">Accounting</option>
                </select>
                <br></br>
                <br></br>
                <input
                    type="button"
                    defaultValue="Submit"
                    className="btn btn-primary"
                    onChange={(e) => { setChangeMajor(e.target.value) }} value={ChangeAMajor}
                    id="submit"
                    onClick={changeMajor}


                />
            </div>
            <br />
            <br />
            <div>

                <label for="ChangeAMinor">Choose a minor:</label>
                <select name="ChangeAMinor" id="ChangeAMinor">
                    <option value="">Select Minor</option>
                    <option value="Accounting">Accounting</option>
                    <option value="African American Studies">African American Studies</option>
                    <option value="Applied Mathematics">Applied Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer and Information Sciences">Computer and Information Sciences</option>
                    <option value="Congregational Leadership">Congregational Leadership</option>
                    <option value="Digital Design Marketing">Digital Design Marketing</option>
                    <option value="Economics">Economics</option>
                    <option value="Entertainment and Sports Management">Entertainment and Sports Management</option>
                    <option value="Environmental Studies">Environmental Studies</option>
                    <option value="French Studies">French Studies</option>
                    <option value="General Business">General Business</option>
                </select>
                <br></br>
                <br></br>
                <input
                    type="button"
                    defaultValue="Submit"
                    className="btn btn-primary"
                    onChange={(e) => { setChangeMinor(e.target.value) }} value={ChangeAMinor}
                    id="submit"
                    onClick={changeMinor}


                />
            </div>





        </>

    );

}
export default ChangeMajor_Minor;