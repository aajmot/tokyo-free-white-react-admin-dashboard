
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react"; 
import { RoleService } from "src/Admin/Services/RoleService";

export default function RoleForm(props) {
    const [service, setservice] = useState(new RoleService());
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
            name: e.currentTarget["name"]?.value
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
                id="name"
                label="Role Name"
            />
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