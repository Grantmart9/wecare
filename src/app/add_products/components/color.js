import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const ColorDialog = ({ Color, handleColor }) => {
    return (<div>
        <FormControl fullWidth>
            <InputLabel color="success" >Color</InputLabel>
            <Select
                color="success"
                value={Color}
                onChange={handleColor}
            >
                <MenuItem value={"Black"}>Black</MenuItem>
                <MenuItem value={"White"}>White</MenuItem>
                <MenuItem value={"Red"}>Red</MenuItem>
                <MenuItem value={"Green"}>Green</MenuItem>
                <MenuItem value={"Blue"}>Blue</MenuItem>
                <MenuItem value={"Yellow"}>Yellow</MenuItem>
                <MenuItem value={"Purple"}>Purple</MenuItem>
                <MenuItem value={"Teal"}>Teal</MenuItem>
                <MenuItem value={"Nude"}>Nude</MenuItem>
            </Select>
        </FormControl>
    </div>)
}