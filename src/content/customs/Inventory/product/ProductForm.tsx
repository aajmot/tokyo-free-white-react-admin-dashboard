
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { ProductService } from "src/Inevntory/Services/ProductService";

export default function ProductForm(props) {
    const [service, setservice] = useState(new ProductService());
    const [typeList, settypeList] = useState(["Default", "Bronze", "Silver", "Gold", "Platinum"]);
    const [type, settype] = useState("Default");


    const handleTypeChange = (event) => {
        settype(event.target.value);
    };

    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        let payload = {
            name: e.currentTarget["name"]?.value,
            description: e.currentTarget["description"]?.value,
            hsn: e.currentTarget["hsn"]?.value,
            primaryUnit: e.currentTarget["primaryUnit"]?.value,
            secondaryUnit: e.currentTarget["secondaryUnit"]?.value,
            gstPercentage: e.currentTarget["gstPercentage"]?.value,
            brandName: e.currentTarget["brandName"]?.value,
            manufacturer: e.currentTarget["manufacturer"]?.value,
            composition: e.currentTarget["composition"]?.value,
            tags: e.currentTarget["tags"]?.value,
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
                label="Name"
                defaultValue={props?.data?.name}
            />

            <TextField
                required
                id="description"
                label="Desc."
                defaultValue={props?.data?.description}
            />

            <TextField
                required
                id="hsn"
                label="HSN"
                defaultValue={props?.data?.hsn}
            />

            <TextField
                required
                id="primaryUnit"
                label="Primary Unit"
                defaultValue={props?.data?.primaryUnit}
            />

            <TextField
                required
                id="secondaryUnit"
                label="Secondary Unit"
                defaultValue={props?.data?.secondaryUnit}
            />


            <TextField
                required
                id="gstPercentage"
                label="GST"
                type="number"
                defaultValue={props?.data?.gstPercentage}
            />

            <TextField
                required
                id="brandName"
                label="Brand"
                defaultValue={props?.data?.brandName}
            />
            <TextField
                required
                id="manufacturer"
                label="Manufacturer"
                defaultValue={props?.data?.manufacturer}
            />

            <TextField
                required
                id="composition"
                label="Composition"
                defaultValue={props?.data?.composition}
            />
            <TextField
                required
                id="tags"
                label="tags"
                defaultValue={props?.data?.tags}
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