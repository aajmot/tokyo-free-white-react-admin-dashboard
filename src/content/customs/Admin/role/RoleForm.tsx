
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";

export default function RoleForm(props) {
    const [service, setservice] = useState(new RoleService());


    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        let payload = {
            id: null,
            name: e.currentTarget["name"]?.value
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

    }

    useEffect(() => {
        getInitData();
    }, [props]);

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
                defaultValue={props?.data?.name}
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