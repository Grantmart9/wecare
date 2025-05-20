import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const ConditionDialog = ({ condition, handleCondition }) => {
    return (<div>
        <FormControl fullWidth>
            <InputLabel color="success" >Condition</InputLabel>
            <Select
                color="success"
                value={condition}
                onChange={handleCondition}
            >
                <MenuItem value={"New"}>New</MenuItem>
                <MenuItem value={"Barely Used"}>Barely Used</MenuItem>
                <MenuItem value={"Used"}>Used</MenuItem>
            </Select>
        </FormControl>
    </div>)
}