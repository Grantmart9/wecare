import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const ClothingDialog = ({ Type, Size, handleType, handleSize, category }) => {
    return (
        <>{category === "Clothing" ?
            <>
                <div>
                    <FormControl fullWidth>
                        <InputLabel color="success">Type</InputLabel>
                        <Select
                            color="success"
                            value={Type}
                            onChange={(handleType)}
                            label="Service Category"
                        >
                            <MenuItem value={"Pants"}>Pants</MenuItem>
                            <MenuItem value={"Shirt"}>Shirt</MenuItem>
                            <MenuItem value={"Jacket"}>Jacket</MenuItem>
                            <MenuItem value={"Jersey"}>Jersey</MenuItem>
                        </Select>
                    </FormControl>
                </div> {Type === "Pants" ?
                    <div>
                        <FormControl fullWidth>
                            <InputLabel color="success">Size</InputLabel>
                            <Select
                                color="success"
                                label="Service Category"
                                value={Size}
                                onChange={handleSize}
                            >
                                <MenuItem value={"XS"}>XS</MenuItem>
                                <MenuItem value={"S"}>S</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                                <MenuItem value={"L"}>L</MenuItem>
                                <MenuItem value={"XL"}>XL</MenuItem>
                                <MenuItem value={"XXL"}>XXL</MenuItem>
                            </Select>
                        </FormControl>
                    </div> : null}
                {Type === "Shirt" ?
                    <div>
                        <FormControl fullWidth>
                            <InputLabel color="success">Size</InputLabel>
                            <Select
                                color="success"
                                label="Service Category"
                                value={Size}
                                onChange={handleSize}
                            >
                                <MenuItem value={"XS"}>XS</MenuItem>
                                <MenuItem value={"S"}>S</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                                <MenuItem value={"L"}>L</MenuItem>
                                <MenuItem value={"XL"}>XL</MenuItem>
                                <MenuItem value={"XXL"}>XXL</MenuItem>
                            </Select>
                        </FormControl>
                    </div> : null}
                {Type === "Jacket" ?
                    <div>
                        <FormControl fullWidth>
                            <InputLabel color="success">Size</InputLabel>
                            <Select
                                color="success"
                                label="Service Category"
                                value={Size}
                                onChange={handleSize}
                            >
                                <MenuItem value={"XS"}>XS</MenuItem>
                                <MenuItem value={"S"}>S</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                                <MenuItem value={"L"}>L</MenuItem>
                                <MenuItem value={"XL"}>XL</MenuItem>
                                <MenuItem value={"XXL"}>XXL</MenuItem>
                            </Select>
                        </FormControl>
                    </div> : null}
                {Type === "Jersey" ?
                    <div>
                        <FormControl fullWidth>
                            <InputLabel color="success">Size</InputLabel>
                            <Select
                                color="success"
                                label="Service Category"
                                value={Size}
                                onChange={handleSize}
                            >
                                <MenuItem value={"XS"}>XS</MenuItem>
                                <MenuItem value={"S"}>S</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                                <MenuItem value={"L"}>L</MenuItem>
                                <MenuItem value={"XL"}>XL</MenuItem>
                                <MenuItem value={"XXL"}>XXL</MenuItem>
                            </Select>
                        </FormControl>
                    </div> : null}
            </>
            : null}</>)
}