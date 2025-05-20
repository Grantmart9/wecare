import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const CategoryDialog = ({ category, handleCategory }) => {
    return (<div>
        <FormControl fullWidth>
            <InputLabel color="success">Category</InputLabel>
            <Select
                color="success"
                value={category}
                onChange={(handleCategory)}
                label="Service Category"
            >
                <MenuItem value={"Clothing"}>Clothing</MenuItem>
                <MenuItem value={"Shoes"}>Shoes</MenuItem>
                <MenuItem value={"Accessories"}>Accessories</MenuItem>
            </Select>
        </FormControl>
    </div>)
}