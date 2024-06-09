
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserService } from "src/Admin/Services/UserService";
import { RoleService } from "src/Admin/Services/RoleService";

export default function UserForm(props) {
    const [service, setservice] = useState(new UserService());
    const [roleService, setroleService] = useState(new RoleService());
    const [genderList, setgenderList] = useState([]);
    const [roleList, setroleList] = useState([]);
    const [dob, setdob] = useState('01/01/2000');
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
        let payload = {
            userName: e.currentTarget["userName"]?.value,
            password: e.currentTarget["password"]?.value,
            email: e.currentTarget["email"]?.value,
            firstName: e.currentTarget["firstName"]?.value,
            lastName: e.currentTarget["lastName"]?.value,
            gender: gender,
            dateOfBirth: dob,
            roleId: role,
            id: null
        };
        //update
        if (props?.data?.id > 0) {
            payload = {
                ...payload
                , id: props?.data?.id
            };
            var responseUpdate = await service.update(payload);
            if (responseUpdate && responseUpdate.isSuccess) {
                props?.settoaster({ open: true, type: "success", header: "", body: responseUpdate?.message })
            }
            else {
                props?.settoaster({ open: true, type: "error", header: "", body: responseUpdate?.message })
            }
            props?.setloader(false);
        }
        else //create
        {
            var responseCreate = await service.create(payload);
            if (responseCreate && responseCreate.isSuccess) {
                props?.settoaster({ open: true, type: "success", header: "", body: responseCreate?.message })
            }
            else {
                props?.settoaster({ open: true, type: "error", header: "", body: responseCreate?.message })
            }
            props?.setloader(false);
        }
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
                id="userName"
                label="UserName"
                defaultValue={props?.data?.userName}
            />

            <TextField
                required
                id="password"
                label="Password"
                type="password"
                defaultValue={props?.data?.password}
            />

            <TextField
                required
                type="email"
                id="email"
                label="Email"
                defaultValue={props?.data?.email}
            />

            <TextField
                required
                id="firstName"
                label="FirstName"
                defaultValue={props?.data?.firstName}
            />

            <TextField
                required
                id="lastName"
                label="LastName"
                defaultValue={props?.data?.lastName}
            />

            {gender.length > 0 && <TextField
                id="gender"
                select
                label="Gender"
                onChange={handleGenderChange}
                defaultValue={props?.data?.gender ?? gender}
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
                onChange={(e) => setdob(e.target.value)}
                defaultValue={ new Date()}
            />


            <TextField
                required
                id="roleId"
                select
                label="Role"
                onChange={handleRoleChange}
                defaultValue={props?.data?.roleId ?? role}
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