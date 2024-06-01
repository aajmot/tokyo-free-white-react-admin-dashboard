
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { CustomerService } from "src/Inevntory/Services/CustomerService";

export default function CustomerForm(props) {
    const [service, setservice] = useState(new CustomerService());
    const [typeList, settypeList] = useState([]);
    const [type, settype] = useState("Default");


    const handleTypeChange = (event) => {
        settype(event.target.value);
    };

    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        const payload = {
            customerType: type,
            customerName: e.currentTarget["customerName"]?.value,
            customerPhone: e.currentTarget["customerPhone"]?.value,
            customerEmail: e.currentTarget["customerEmail"]?.value,
            customerAddress: e.currentTarget["customerAddress"]?.value,
            customerPinCode: e.currentTarget["customerPinCode"]?.value,
            customerTaxId: e.currentTarget["customerTaxId"]?.value
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
            {typeList?.length > 0 && <TextField
                required
                select
                id="customerType"
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
            }

            <TextField
                required
                id="customerName"
                label="Name"
            />

            <TextField
                required
                id="customerPhone"
                label="Phone"
            />

            <TextField
                required
                id="customerEmail"
                label="Email"
                type="email"
            />

            <TextField
                required
                id="customerAddress"
                label="Address"
                multiline
            />

            <TextField
                required
                id="customerPinCode"
                label="Pin Code"
            />


            <TextField
                required
                id="customerTaxId"
                label="Tax Id"
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