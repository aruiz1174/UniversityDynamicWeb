import { React, useState, useEffect } from 'react';
import { getDepartment, getFacultyDepartment } from '../SharedService';

function AddDeptToFaculty() {
    const [departmentid, setDepartmentID] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableDataDept, setTableDataDept] = useState([]);

    useEffect(() => {
        getFacultyDepartment().then(x => {
            let localFacultyID = localStorage.getItem("FacultyID");
            // filter the data based on the FacultyID
            // show data where the FacultyID matches the localFacultyID
            let filteredData = x.data.filter(x => x.FacultyID == localFacultyID);
            // clear the local storage
            setTableDataDept(filteredData)
        }
        );
    }, []);

    useEffect(() => {
        getDepartment().then(x => {
            setTableData(x.data);
        });
    }, []);

    // fucntion that return the list of departments from getDepartment
    const getDepartmentList = () => {
        return tableData.map((department) => {
            return (
                <option value={department.DepartmentID}>{department.DepartmentID} - {department.DepartmentName}</option>
            )
        })
    }


    const addDepts = () => {
        // get the values from the create user form and send them to the backend
        // get all the values from the form
        const department = document.getElementById("departmentid").value;

        // send the values to the backend

    }

    return (
        <div>
            <form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>Add New Department for {tableDataDept[0]?.FirstName}</h1>
                <br></br>
                <div className="form-group">
                    <label htmlFor="departmentid">Department</label>
                    <select className="form-control" onChange={(e) => setDepartmentID(e.target.value)} value-={departmentid} id="departmentid">
                        {getDepartmentList()}
                    </select>
                </div>
                <br></br>
                <input
                    type="button"
                    defaultValue="Submit"
                    className="btn btn-primary"
                    id="submit"
                    onClick={addDepts}


                />
            </form>
        </div>

    )
}
export default AddDeptToFaculty;

