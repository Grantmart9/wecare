"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@mui/material/Button";
import { TextField, InputAdornment, Box } from "@mui/material";
import { useRouter } from 'next/navigation'; // Change this to `next/navigation` for client-side navigation
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibilityoff';
import { SUPABASE_URL_WECARE, API_KEY_WECARE, Colors } from "../supabase";
import * as motion from "motion/react-client"
import validator from "validator";
import Switch from '@mui/material/Switch';

const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

const LoginDialog = ({
    handleUsername,
    handlePassword,
    showPassword,
    handleSignIn,
    open,
    handleSignUp,
    handleClientType,
    ClientType

}) => {

    const SwitchColor = () => {

        if (ClientType === true) {
            return ("#8FE6BA")
        }
        if (ClientType === false) {
            return ("#F68C9E")
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 40 }}
            transition={{
                type: "spring",
                bounce: 0.02,
                stiffness: 300,
                damping: 100,
                mass: 10,
                duration: 2,
            }}
            className="flex align-center justify-center" style={{ marginTop: "25vh" }}>
            <Box sx={{ maxWidth: 400 }}>
                <div className="grid grid-flow-row gap-2 rounded-lg p-4 shadow-md shadow-cyan-950 bg-[url(./background4.svg)]">
                    <div className="grid grid-cols-3 gap-1 mx-auto">
                        <div className="text-teal-600 text-md text-center my-auto">Doner</div>
                        <Switch onClick={handleClientType}
                            sx={{
                                "& .MuiSwitch-switchBase": {
                                    color: SwitchColor, // Applies to both checked and unchecked thumb
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "transparent", // Ensures transparent track when checked
                                },
                                "& .MuiSwitch-switchBase.Mui-unchecked + .MuiSwitch-track": {
                                    backgroundColor: "transparent", // Ensures transparent track when unchecked
                                },
                                "& .MuiSwitch-track": {
                                    opacity: 1, // Ensures no default opacity effects
                                    backgroundColor: "transparent", // Overrides any remaining default styles
                                },
                            }} />
                        <div className="text-red-700 text-md text-center my-auto">Buyer</div>
                    </div>
                    <div className="text-center text-lg text-teal-400 font-bold">Log in as a {ClientType ? "Doner" : "Buyer"}</div>
                    <TextField
                        id="input-with-icon-textfield"
                        label="email or Mobile Number"
                        size="small"
                        onChange={handleUsername}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="password"
                        size="small"
                        color="success"
                        onChange={handlePassword}
                        type={open ? "password" : "text"}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={showPassword} sx={{ minWidth: 0, padding: 0 }}>
                                        {open ? (
                                            <VisibilityIcon className={`text-cyan-950`} />
                                        ) : (
                                            <VisibilityOffIcon className={`text-cyan-950`} />
                                        )}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        size="small"
                        onClick={handleSignIn}
                        fullWidth={true}
                        className="rounded-3xl mx-auto"
                        sx={{
                            textTransform: "none", bgcolor: Colors.red, color: "white", maxWidth: "200px",
                            '&:hover': {
                                backgroundColor: Colors.green,
                                color: 'white',
                            }
                        }}

                    >
                        LOG IN
                    </Button>
                    <Button
                        size="small"
                        fullWidth={true}
                        className="rounded-3xl mx-auto"
                        sx={{
                            textTransform: "none", bgcolor: Colors.orange, color: "white", maxWidth: "200px",
                            '&:hover': {
                                backgroundColor: Colors.green,
                                color: 'white',
                            }
                        }}
                    >
                        OTP LOG IN
                    </Button>
                    <Button
                        size="small"
                        fullWidth={true}
                        onClick={handleSignUp}
                        className="rounded-3xl mx-auto"
                        sx={{
                            textTransform: "none", bgcolor: "transparent", color: "darkgray", maxWidth: "200px",
                            '&:hover': {
                                backgroundColor: Colors.green,
                                color: 'darkgray',
                            }
                        }}
                    >
                        Sign me up
                    </Button>
                    <Button
                        size="small"
                        fullWidth={true}
                        onClick={handleSignUp}
                        className="rounded-3xl mx-auto"
                        sx={{
                            textTransform: "none", bgcolor: "transparent", color: "darkgray", maxWidth: "200px",
                            '&:hover': {
                                backgroundColor: Colors.green,
                                color: 'darkgray',
                            }
                        }}
                    >
                        Forgot your password?
                    </Button>
                </div>
            </Box>
        </motion.div>)
}

const SignUpDialog = ({ ClientType, open, handlePassword, showPassword }) => {

    const SwitchColor = () => {

        if (ClientType === true) {
            return ("#F68C9E")
        }
        if (ClientType === false) {
            return ("#8FE6BA")
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 25 }}
            transition={{
                type: "spring",
                bounce: 0.02,
                stiffness: 300,
                damping: 100,
                mass: 10,
                duration: 2,
            }}
            className="flex align-center justify-center" style={{ marginTop: "25vh" }}>
            <Box sx={{ maxWidth: 400 }}>
                <div className="grid grid-flow-row gap-2 rounded-lg p-4 shadow-md shadow-cyan-950 bg-[url(./background4.svg)]">
                    <div className="grid grid-cols-3 gap-1 mx-auto">
                        <div className="text-teal-600 text-md text-center my-auto">Doner</div>
                        <Switch
                            sx={{
                                "& .MuiSwitch-switchBase": {
                                    color: SwitchColor, // Applies to both checked and unchecked thumb
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "transparent", // Ensures transparent track when checked
                                },
                                "& .MuiSwitch-switchBase.Mui-unchecked + .MuiSwitch-track": {
                                    backgroundColor: "transparent", // Ensures transparent track when unchecked
                                },
                                "& .MuiSwitch-track": {
                                    opacity: 1, // Ensures no default opacity effects
                                    backgroundColor: "transparent", // Overrides any remaining default styles
                                },
                            }} />
                        <div className="text-red-700 text-md text-center my-auto">Buyer</div>
                    </div>
                    <div className="text-center text-lg text-teal-400 font-bold">Register as a {ClientType ? "Doner" : "Buyer"}</div>
                    <div className="text-teal-950 text-sm text-center"> Let's get started by filling out the form below.</div>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Name"
                        size="small"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Email"
                        size="small"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Contact Number"
                        size="small"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Collection Address"
                        size="small"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="password"
                        size="small"
                        color="success"
                        onChange={handlePassword}
                        type={open ? "password" : "text"}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={showPassword} sx={{ minWidth: 0, padding: 0 }}>
                                        {open ? (
                                            <VisibilityIcon className={`text-cyan-950`} />
                                        ) : (
                                            <VisibilityOffIcon className={`text-cyan-950`} />
                                        )}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div style={{ color: Colors.red }} className=" text-md text-center mt-0.5 mb-0.5">OR</div>
                    <TextField
                        id="input-with-icon-textfield"
                        label="OTP (Enter your Mobile Number)"
                        size="small"
                        color="success"
                        type={"text"}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "25px", // Rounds the left and right sides
                                "& fieldset": {
                                    borderColor: Colors.yellow, // Yellow border color
                                    borderWidth: "2px", // Thickness of the border
                                },
                                "&:hover fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: Colors.yellow, // Maintain yellow when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Black label color
                            },
                            "& .MuiInputBase-input": {
                                color: "black", // Black input text color
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={showPassword} sx={{ minWidth: 0, padding: 0 }}>
                                        {open ? (
                                            <VisibilityIcon className={`text-cyan-950`} />
                                        ) : (
                                            <VisibilityOffIcon className={`text-cyan-950`} />
                                        )}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        size="small"
                        fullWidth={true}
                        className="rounded-3xl mx-auto"
                        sx={{
                            textTransform: "none", bgcolor: Colors.red, color: "white", maxWidth: "200px",
                            '&:hover': {
                                backgroundColor: Colors.green,
                                color: 'white',
                            }
                        }}

                    >
                        SUBMIT
                    </Button>
                    <Button
                        size="small"
                        fullWidth={true}
                        className="rounded-3xl mx-auto"
                        sx={{
                            textTransform: "none", bgcolor: Colors.yellow, color: "white", maxWidth: "200px",
                            '&:hover': {
                                backgroundColor: Colors.green,
                                color: 'white',
                            }
                        }}
                    >
                        SKIP
                    </Button>
                    <Button
                        size="small"
                        fullWidth={true}
                        className="rounded-3xl mx-auto"
                        sx={{
                            textTransform: "none", bgcolor: Colors.green, color: "white", maxWidth: "200px",
                            '&:hover': {
                                backgroundColor: Colors.green,
                                color: 'white',
                            }
                        }}
                    >
                        CANCEL
                    </Button>
                </div>
            </Box>
        </motion.div>
    )
}

const Login = () => {
    const [open, setOpen] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [SignUpPassword, setSignUpPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [cell, setCell] = useState("");
    const [auth, setAuth] = useState(true);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [ClientType, setClientType] = useState(true);


    const router = useRouter(); // Use useRouter from next/navigation for client-side routing

    async function handleSignIn() {
        try {
            const response = await supabase.auth.signInWithPassword({
                email: username,
                password: password,
            });

            localStorage.setItem("user_id", response.data.user.id)

            // Access properties directly from the raw response
            const { user, session, error } = response;

            if (error) {
                console.error("Error during sign-in:", error.message);
                return;
            }

            if (session) {
                await supabase.auth.setAuth(session.access_token);
            }
            router.push("/");
        } catch (err) {
            console.error("Error during sign-in:", err);
        }
    }

    async function handleSignUpSubmit() {
        const { data, error } = await supabase.auth.signUp({
            email: Email,
            password: SignUpPassword,
            options: {
                emailRedirectTo: 'https://192.168.8.196:3017',
                data: { phone: cell },
            },
        })
        if (data) { router.push("/"); };
        if (error) {
            setErrorMessage(error)
            console.log(error)
        }
    }

    const showPassword = () => { setOpen(!open); };
    const handleUsername = (e) => { setUsername(e.target.value); };
    const handlePassword = (e) => { setPassword(e.target.value); };
    const handlePasswordEdit = (e) => { setSignUpPassword(e.target.value); };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (validator.isEmail(Email)) {
            console.log("valid email")
        } else {
            console.log("not valid email")
        }
    };
    const handleCell = (e) => {
        setCell(e.target.value);
        if (validator.isMobilePhone(cell)) {
            console.log("valid email")
        } else {
            console.log("not valid email")
        }
    }

    const handleLastName = (e) => { setLastName(e.target.value); };
    const handleFirstName = (e) => { setFirstName(e.target.value); };
    const handleSignUp = () => { setAuth(false) }
    const handleSignUpBack = () => { setAuth(true) }
    const handleClientType = () => {
        setClientType(!ClientType);
        localStorage.setItem("user_type", ClientType)
    }

    return (
        <React.Fragment>
            {auth ?
                <LoginDialog
                    handleUsername={handleUsername}
                    handlePassword={handlePassword}
                    showPassword={showPassword}
                    handleSignIn={handleSignIn}
                    handleSignUp={handleSignUp}
                    handleClientType={handleClientType}
                    ClientType={ClientType}
                    open={open} />
                :
                <SignUpDialog
                    handleConfirmPassword={handleConfirmPassword}
                    handlePasswordEdit={handlePasswordEdit}
                    handleEmail={handleEmail}
                    handleLastName={handleLastName}
                    handleFirstName={handleFirstName}
                    handleSignUpBack={handleSignUpBack}
                    handleSignUpSubmit={handleSignUpSubmit}
                    ErrorMessage={ErrorMessage}
                    password={password}
                    ConfirmPassword={ConfirmPassword}
                    handleCell={handleCell}
                    ClientType={ClientType}
                    open={open}
                    handlePassword={handlePassword}
                    showPassword={showPassword}
                />
            }
        </React.Fragment>
    );
};

export default Login;
