import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { Container, FormControl, Typography } from "@mui/material";
import { UserService } from "src/Admin/Services/UserService";
import { useEffect, useState } from "react";
import Toaster from "src/components/Toaster/Toaster";
import { useNavigate } from "react-router";


export default function LoginPage() {
    const navigate = useNavigate();
    const [service, Setservice] = useState(new UserService());
    const [toast, settoast] = useState({ open: false, type: "", header: "", body: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        var paylaod = {
            userName: e.currentTarget["userName"]?.value,
            password: e.currentTarget["password"]?.value,
        }
        var response = await service.authenticate(paylaod);
        if (response?.isSuccess) {
            sessionStorage.setItem("user_name", paylaod["userName"]);
            sessionStorage.setItem("user_token", response?.data[0]?.token);
            navigate('/dashboards', { replace: true });
        }
        else {
            settoast({ open: true, type: "error", header: "", body: response?.message })
        }
    };

    return (
        <>
            <Toaster {...toast}></Toaster>

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
