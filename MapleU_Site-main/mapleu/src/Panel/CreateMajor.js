import { React, useState } from 'react';

function CreateMajor() {
    const [majorName, setMajorName] = useState("");
    const [departmentName, setDepartmentName] = useState("");



    const createMajor = () => {
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
            <div>
                <h1>Create User</h1>
                <br></br>
                <form>
                    <div className="form-group">
                        <label htmlFor="majorname">MajorName</label>
                        <input type="text" className="form-control" id="majorname" placeholder="Enter Major name"
                            onChange={(e) => setMajorName(e.target.value)} value-={majorName} />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="departmentname">Department</label>
                        <input type="text" className="form-control" id="departmentname" placeholder="Enter Department name"
                            onChange={(e) => setDepartmentName(e.target.value)} value-={departmentName} />
                    </div>
                    <br></br>
                    <br></br>
                    <input
                        type="button"
                        defaultValue="Submit"
                        className="btn btn-primary"
                        id="submit"
                        onClick={createMajor}


                    />
                </form>
            </div>


        </>
    );
}
export default CreateMajor;

