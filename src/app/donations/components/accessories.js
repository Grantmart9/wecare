import { FormControl, Select, MenuItem, InputLabel } from "@mui/material"

export const AccessoriesDialog = ({ category, Type, handleType }) => {
    return (
        <>
            {category === "Accessories" ?
                <div className="ml-1">
                    <FormControl fullWidth>
                        <InputLabel color="success">Type</InputLabel>
                        <Select
                            color="success"
                            value={Type}
                            onChange={handleType}
                        >
                            <MenuItem value={"Scarf"}>Scarf</MenuItem>
                            <MenuItem value={"Winter Gloves"}>Winter Gloves</MenuItem>
                            <MenuItem value={"Belt"}>Belt</MenuItem>
                            <MenuItem value={"Hat"}>Hat</MenuItem>
                            <MenuItem value={"Wallet"}>Wallet</MenuItem>
                            <MenuItem value={"Sunglasses"}>Sunglasses</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                : null}
        </>)
}