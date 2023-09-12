import { React, useState } from 'react';
import { addHolds } from "../SharedService";


function AddHold() {

    const [myhold, setHold] = useState([]);

    const createHold = () => {
        // if myhold = Academic then set equal to 1
        // if myhold = Financial then set equal to 2
        // if myhold = Diciplinary then set equal to 3
        // if myhold = Health then set equal to 4

        let localStudentID = localStorage.getItem("StudentID");
        console.log(localStudentID, myhold);
        let holdid;

        if (myhold === "Academic") {
            holdid = 1;
        }
        else if (myhold === "Financial") {
            holdid = 2;
        }
        else if (myhold === "Diciplinary") {
            holdid = 3;
        }
        else if (myhold === "Health") {
            holdid = 4;
        }
        console.log(localStudentID, myhold);

        addHolds(localStudentID, holdid);
        alert("Hold added successfully!");

    }


    return (
        <>
            <br></br>
            <br></br>
            <div className="slides2" id="top">
                <img src="images/fall22.png" alt="bacfacile" className="center" />
            </div>
            <div>
                <form>
                    <h1>Here you can add a Hold for the Student - </h1>
                    <h4>Select hold from dropdown menu and press "Add" button to add the hold.</h4>

                    <br></br>
                    <div className="form-group">
                        <label htmlFor="myhold">Account Level</label>
                        <select className="form-control" onChange={(e) => setHold(e.target.value)} value-={myhold} id="myhold">
                            <option>Academic</option>
                            <option>Financial</option>
                            <option>Diciplinary</option>
                            <option>Health</option>
                        </select>
                    </div>
                    <br></br>
                    <input
                        type="button"
                        defaultValue="Submit"
                        className="btn btn-primary"
                        id="submit"
                        onClick={createHold}


                    />
                </form>
            </div>


        </>
    )
}
export default AddHold;

