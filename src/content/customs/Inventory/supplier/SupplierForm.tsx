
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { SupplierService } from "src/Inevntory/Services/SupplierService";

export default function SupplierForm(props) {
    const [service, setservice] = useState(new SupplierService());
    const [typeList, settypeList] = useState([]);
    const [type, settype] = useState("Default");


    const handleTypeChange = (event) => {
        settype(event.target.value);
    };

    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        let payload = {
            id: null,
            supplierType: type,
            supplierName: e.currentTarget["supplierName"]?.value,
            supplierPhone: e.currentTarget["supplierPhone"]?.value,
            supplierEmail: e.currentTarget["supplierEmail"]?.value,
            supplierAddress: e.currentTarget["supplierAddress"]?.value,
            supplierPinCode: e.currentTarget["supplierPinCode"]?.value,
            supplierTaxId: e.currentTarget["supplierTaxId"]?.value
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
                id="SupplierType"
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
                id="supplierName"
                label="Name"
                defaultValue={props?.data?.supplierName}
            />

            <TextField
                required
                id="supplierPhone"
                label="Phone"
                defaultValue={props?.data?.supplierPhone}
            />

            <TextField
                required
                id="supplierEmail"
                label="Email"
                type="email"
                defaultValue={props?.data?.supplierEmail}
            />

            <TextField
                required
                id="supplierAddress"
                label="Address"
                multiline
                defaultValue={props?.data?.supplierAddress}
            />

            <TextField
                required
                id="supplierPinCode"
                label="Pin Code"
                defaultValue={props?.data?.supplierPinCode}
            />


            <TextField
                required
                id="supplierTaxId"
                label="Tax Id"
                defaultValue={props?.data?.supplierTaxId}
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