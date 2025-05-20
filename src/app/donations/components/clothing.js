import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const ClothingDialog = ({ Type, Size, handleType, handleSize, category }) => {
    return (
        <>{category === "Clothing" ?
            <>
                <div className="ml-1">
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
                    <div className="ml-1">
                        <FormControl fullWidth>
                            <InputLabel color="success">Size</InputLabel>
                            <Select
                                color="success"
                                label="Service Category"
                                value={Size}
                                onChange={handleSize}
                            >
                                <MenuItem value={"28 - W:76 | H:168"}>28 - W:76 | H:168</MenuItem>
                                <MenuItem value={"30 - W:81 | H:173"}>30 - W:81 | H:173</MenuItem>
                                <MenuItem value={"32 - W:86 | H:173"}>32 - W:86 | H:173</MenuItem>
                                <MenuItem value={"34 - W:92 | H:178"}>34 - W:92 | H:178</MenuItem>
                                <MenuItem value={"36 - W:97 | H:180"}>36 - W:97 | H:180</MenuItem>
                                <MenuItem value={"38 - W:102 | H:183"}>38 - W:102 | H:183</MenuItem>
                                <MenuItem value={"40 - W:107 | H:183"}>40 - W:107 | H:183</MenuItem>
                                <MenuItem value={"42 - W:112 | H:183"}>42 - W:112 | H:183</MenuItem>
                                <MenuItem value={"44 - W:117 | H:183"}>44 - W:117 | H:183</MenuItem>

                            </Select>
                        </FormControl>
                    </div> : null}
                {Type === "Shirt" ?
                    <div className="ml-1">
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
                    <div className="ml-1">
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
                    <div className="ml-1">
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