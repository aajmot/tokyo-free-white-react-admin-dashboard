import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { Container, FormControl, Typography } from "@mui/material";
import { UserService } from "src/Admin/Services/UserService";
import { useEffect, useState } from "react";


export default function LoginPage() {
    const [service, Setservice] = useState(new UserService());

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        debugger;
        var paylaod = {
            userName: e.currentTarget["userName"]?.value,
            password: e.currentTarget["password"]?.value,
        }
        var response = await service.authenticate(paylaod);
        if (response != null && response?.data != null) {

        }
        else {

        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>

                </Box>
            </Container>
        </>

    );
}

function useForm(arg0: undefined[]): { register: any; handleSubmit: any; } {
    throw new Error("Function not implemented.");
}
