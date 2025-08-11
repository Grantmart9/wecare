import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import IconButton from '@mui/material';
import { TextField } from '@mui/material';


export const SearchField = () => {

    return (
        <div className="flex align-center justify-center mx-2 mb-10">
            <TextField
                size="small"
                fullWidth={true}
                label="Search..."
                className="rounded-2xl"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& fieldset": {
                            borderColor: "teal",
                            borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                            borderColor: "orange",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "teal",
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" sx={{ color: "teal" }} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small" sx={{ color: "#F8D760" }}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}