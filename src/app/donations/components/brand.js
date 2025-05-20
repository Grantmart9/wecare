import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const BrandDialog = ({ brand, handleBrand }) => {
    return (<div>
        <FormControl fullWidth>
            <InputLabel color="success" >Brand</InputLabel>
            <Select
                color="success"
                value={brand}
                onChange={handleBrand}
            >
                <MenuItem value={"Woolworths"}>Woolworths</MenuItem>
                <MenuItem value={"Mr Price"}>Mr Price</MenuItem>
                <MenuItem value={"Cotton On"}>Cotton On</MenuItem>
                <MenuItem value={"Markhams"}>Markhams</MenuItem>
                <MenuItem value={"P&P Clothing"}>P&P Clothing</MenuItem>
                <MenuItem value={"Aldo"}>Aldo</MenuItem>
            </Select>
        </FormControl>
    </div>)
}