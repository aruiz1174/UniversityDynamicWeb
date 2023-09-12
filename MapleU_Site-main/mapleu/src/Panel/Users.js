// admin can view and edit users
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getUsers, deleteUser } from "../SharedService";

function Users() {

    const columns = [
        { field: "Delete", headerName: "Delete", width: 80, renderCell: (params) => {return <button onClick={() => handleDelete(params.row.UserId)}>Delete</button> } },
        { field: "UserId", headerName: "User ID", width: 85 },
        { field: "FirstName", headerName: "First Name", width: 130},
        { field: "LastName", headerName: "Last Name", width: 200 },
        { field: "UserType", headerName: "Account Level", width: 130 },
        { field: "Street_address", headerName: "Street Address", width: 200 },
        { field: "City", headerName: "City", width: 130 },
        { field: "State", headerName: "State", width: 130 },
        { field: "ZipCode", headerName: "Zip", width: 130 },
        { field: "Country", headerName: "Country", width: 130, editable: true },
        { field: "Email", headerName: "Email", width: 200 },
        { field: "Password", headerName: "Password", width: 130 },];

    

        

    const [tableData, setTableData] = useState([])


    useEffect(() => {
        getUsers().then(x => {
            setTableData(x.data)
          });
         }, []); 
            
        

    // event handler for edit button
    const handleEdit = (e) => {

        // get the row id from the button id and make the row editable
        const rowId = e.UserId;

        // get the values from the create user form and send them to the backend
        

        }

    const handleDelete = (e) => {
        // get the row and delete the user using the UserId and the delete user function
        const rowId = e;
        console.log(e + " congra is deleted")
        // call the deleteUser from SharedService.js to delete the user form database 
        deleteUser(e);

        // window alert to confirm the user is deleted
        alert("User is deleted. Refresh the page to see the changes.");

        window.location.reload();
       
        
    }
        

    const createUsers = () => {
        // go to create user page and create user and then return to this page and refresh the table
        window.location.href = "./CreateUser";
        
    }

    return (
        <>
            <div className="slides2" id="top">
        <img src="images/fall22.png" alt="bacfacile" className="center" />
      </div>
            <h1>All Users</h1>
            <input
                type="button"
                defaultValue="Create a New User"
                className="btn btn-primary"
                id="submit"
                onClick={createUsers}
            />
            <div style={{ height: 400, width: '100%' }}>
                <Box sx={{ height: 400, width: 1 }}>
                    <DataGrid

                        editMode='row'
                        rows={tableData}
                        columns={columns}
                        experimentalFeatures={{ newEditingApi: true }}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.UserId}


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
export default Users;

