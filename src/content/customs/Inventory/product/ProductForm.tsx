
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { ProductService } from "src/Inevntory/Services/ProductService";

export default function ProductForm(props) {
    const [service, setservice] = useState(new ProductService());
    const [typeList, settypeList] = useState([]);
    const [type, settype] = useState("Default");


    const handleTypeChange = (event) => {
        settype(event.target.value);
    };

    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        const payload = {
            name: e.currentTarget["name"]?.value,
            description: e.currentTarget["description"]?.value,
            hsn: e.currentTarget["hsn"]?.value,
            primaryUnit: e.currentTarget["primaryUnit"]?.value,
            secondaryUnit: e.currentTarget["secondaryUnit"]?.value,
            gstPercentage: e.currentTarget["gstPercentage"]?.value,
            brandName: e.currentTarget["brandName"]?.value,
            manufacturer: e.currentTarget["manufacturer"]?.value,
            composition: e.currentTarget["composition"]?.value,
            tags: e.currentTarget["tags"]?.value
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
        settypeList(["Default", "Bronze", "Silver", "Gold", "Platinum"]);
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
            {/* {typeList?.length > 0 && <TextField
                required
                select
                id="ProductType"
                label="Type"
                value={type}
                onChange={handleTypeChange}
            >
                {typeList.map((option, index) => (
                    <MenuItem key={"type_" + index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            } */}

            <TextField
                required
                id="name"
                label="Name"
            />

            <TextField
                required
                id="description"
                label="Desc."
            />

            <TextField
                required
                id="hsn"
                label="HSN"
            />

            <TextField
                required
                id="primaryUnit"
                label="Primary Unit"
            />

            <TextField
                required
                id="secondaryUnit"
                label="Secondary Unit"
            />


            <TextField
                required
                id="gstPercentage"
                label="GST"
                type="number"
            />

            <TextField
                required
                id="brandName"
                label="Brand"
            />
            <TextField
                required
                id="manufacturer"
                label="Manufacturer"
            />

            <TextField
                required
                id="composition"
                label="Composition"
            />
            <TextField
                required
                id="tags"
                label="tags"
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