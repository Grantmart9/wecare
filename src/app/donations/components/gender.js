import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const GenderDialog = ({ Gender, handleGender }) => {
    return (<div>
        <FormControl fullWidth>
            <InputLabel color="success" >Gender</InputLabel>
            <Select
                color="success"
                value={Gender}
                onChange={handleGender}
            >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
        </FormControl>
    </div>)
}