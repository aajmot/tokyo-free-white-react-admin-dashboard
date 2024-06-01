
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { CustomerService } from "src/Inevntory/Services/CustomerService";

export default function CustomerForm(props) {
    const [service, setservice] = useState(new CustomerService());
    const [roleService, setroleService] = useState(new RoleService());
    const [genderList, setgenderList] = useState([]);
    const [roleList, setroleList] = useState([]);
    const [dob, setdob] = useState('01/01/2020');
    const [gender, setgender] = useState("Others");
    const [role, setrole] = useState('');


    const handleGenderChange = (event) => {
        setgender(event.target.value);
    };
    const handleRoleChange = (event) => {
        setrole(event.target.value);
    };

    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        const payload = {
            CustomerName: e.currentTarget["CustomerName"]?.value,
            password: e.currentTarget["password"]?.value,
            email: e.currentTarget["email"]?.value,
            firstName: e.currentTarget["firstName"]?.value,
            lastName: e.currentTarget["lastName"]?.value,
            gender: gender,
            dateOfBirth: dob,
            roleId: role
        };
        debugger;
        var response = await service.create(payload);
        if (response && response.isSuccess) {
            props?.settoaster({ open: true, type: "success", header: "", body: response?.message })
        }
        else {
            props?.settoaster({ open: true, type: "error", header: "", body: response?.message })
        }
        props?.setloader(false);
    }

    const reset = () => {

    }

    const getInitData = async () => {
        //get  genders
        setgenderList(["Male", "Female", "Others"]);
        //get roles
        var roleResponse = await roleService.search({});
        if (roleResponse && roleResponse?.isSuccess) {
            setroleList(roleResponse?.data);
        }
        else {
            setroleList([]);
        }
    }

    useEffect(() => {
        getInitData();
    }, []);

    return (<>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            autoComplete="off"
            onSubmit={save}
        >
            <TextField
                required
                id="CustomerName"
                label="CustomerName"
            />

            <TextField
                required
                id="password"
                label="Password"
                type="password"
            />

            <TextField
                required
                type="email"
                id="email"
                label="Email"
            />

            <TextField
                required
                id="firstName"
                label="FirstName"
            />

            <TextField
                required
                id="lastName"
                label="LastName"
            />

            {gender.length > 0 && <TextField
                id="gender"
                select
                label="Gender"
                value={gender}
                onChange={handleGenderChange}
            >
                {genderList.map((option, index) => (
                    <MenuItem key={"gender_" + index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            }


            <TextField
                required
                type="date"
                id="dateOfBirth"
                label="DatOfBirth"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
            />


            <TextField
                required
                id="roleId"
                select
                label="Role"
                value={role}
                onChange={handleRoleChange}
            >
                {roleList.map((option, index) => (
                    <MenuItem key={"role_" + index} value={option?.id}>
                        {option?.name}
                    </MenuItem>
                ))}
            </TextField>


            <CardContent>
                <Button sx={{ margin: 1 }}
                    type="submit"
                    variant="contained">
                    Save
                </Button>
                <Button sx={{ margin: 1 }} variant="contained" color="secondary"
                    onClick={() => {
                        props?.setmode("list")
                    }}
                >
                    Cancel
                </Button>
            </CardContent>





        </Box>
    </>);
}