
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { CustomerService } from "src/Inevntory/Services/CustomerService";

export default function CustomerForm(props) {
    const [service, setservice] = useState(new CustomerService());
    const [typeList, settypeList] = useState([]);
    const [formData, setformData] = useState({});
    const [type, settype] = useState("Default");


    const handleTypeChange = (event) => {
        settype(event.target.value);
    };

    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        let payload = {
            id: null,
            customerType: type,
            customerName: e.currentTarget["customerName"]?.value,
            customerPhone: e.currentTarget["customerPhone"]?.value,
            customerEmail: e.currentTarget["customerEmail"]?.value,
            customerAddress: e.currentTarget["customerAddress"]?.value,
            customerPinCode: e.currentTarget["customerPinCode"]?.value,
            customerTaxId: e.currentTarget["customerTaxId"]?.value
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
        settypeList(["Default", "Bronze", "Silver", "Gold", "Platinum"]);
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
            {typeList?.length > 0 && <TextField
                required
                select
                id="customerType"
                label="Type"
                defaultValue={props?.data?.customerType ?? type}
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
                defaultValue={props?.data?.customerName}
            />

            <TextField
                required
                id="customerPhone"
                label="Phone"
                defaultValue={props?.data?.customerPhone}
            />

            <TextField
                required
                id="customerEmail"
                label="Email"
                type="email"
                defaultValue={props?.data?.customerEmail}
            />

            <TextField
                required
                id="customerAddress"
                label="Address"
                multiline
                defaultValue={props?.data?.customerAddress}
            />

            <TextField
                required
                id="customerPinCode"
                label="Pin Code"
                defaultValue={props?.data?.customerPinCode}
            />


            <TextField
                required
                id="customerTaxId"
                label="Tax Id"
                defaultValue={props?.data?.customerTaxId}
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