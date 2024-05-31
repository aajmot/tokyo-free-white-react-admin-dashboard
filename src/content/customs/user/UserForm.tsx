import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";

export default function UserForm(props) {
    const [gender, setgender] = useState([]);
    const [selectedGender, setselectedGender] = useState("Others");

    const handleGenderChange = (event) => {
        setselectedGender(event.target.value);
    };

    useEffect(() => {
        setgender(["Male", "Female", "Others"]);
        console.log("gender",gender);
    }, []);

    return (<>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="UserName"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Password"
                />

                <TextField
                    required
                    type="email"
                    id="outlined-required"
                    label="Email"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="FirstName"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="LastName"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Gender"
                />

                {gender.length > 0 && <TextField
                    id="outlined-select-gender-native"
                    select
                    label="Gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                    SelectProps={{
                        native: true
                    }}
                >
                    {gender.map((option, index) => (
                        <MenuItem key={"gender_" + index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                }
            </div>
        </Box>
    </>);
}