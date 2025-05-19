import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
export const ShoeDialog = ({ category, Size, handleSize }) => {
    return (
        <>
            {category === "Shoes" ?
                <div>
                    <FormControl fullWidth>
                        <InputLabel color="success">Size</InputLabel>
                        <Select
                            color="success"
                            value={Size}
                            onChange={handleSize}
                        >
                            <MenuItem value={"3.5"}>3.5</MenuItem>
                            <MenuItem value={"4"}>4</MenuItem>
                            <MenuItem value={"4.5"}>4.5</MenuItem>
                            <MenuItem value={"5"}>5</MenuItem>
                            <MenuItem value={"5.5"}>5.5</MenuItem>
                            <MenuItem value={"6"}>6</MenuItem>
                            <MenuItem value={"6.5"}>6.5</MenuItem>
                            <MenuItem value={"7"}>7</MenuItem>
                            <MenuItem value={"8"}>8</MenuItem>
                            <MenuItem value={"9"}>9</MenuItem>
                            <MenuItem value={"10"}>10</MenuItem>
                            <MenuItem value={"11"}>11</MenuItem>
                            <MenuItem value={"12"}>12</MenuItem>
                            <MenuItem value={"13"}>13</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                : null}
        </>)
}