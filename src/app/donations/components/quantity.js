import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const QuantityDialog = ({ quantity, handleQuantity }) => {
    return (<div>
        <FormControl fullWidth>
            <InputLabel color="success" >Quantity</InputLabel>
            <Select
                color="success"
                value={quantity}
                onChange={handleQuantity}
            >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
            </Select>
        </FormControl>
    </div>)
}