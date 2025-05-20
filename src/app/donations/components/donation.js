import { TextField, Dialog, FormControl, MenuItem, InputLabel, Select, Button } from "@mui/material"
import { ClothingDialog } from "./clothing";
import { ShoeDialog } from "./shoes";
import { AccessoriesDialog } from "./accessories";
import { GenderDialog } from "./gender";
import { ImageDialog } from "./image";
import { ColorDialog } from "./color";
import { ConditionDialog } from "./condition";
import { BrandDialog } from "./brand";
import { CategoryDialog } from "./category";

export const DonationDialog = ({
    handleImage,
    handleClose,
    handleAddService,
    open,
    image,
    category,
    handleCategory,
    Type,
    handleType,
    Size,
    handleSize,
    Gender,
    handleGender,
    ServiceName,
    handleServiceName,
    ServiceDescription,
    handleServiceDescription,
    condition,
    handleCondition,
    color,
    handleColor,
    brand,
    handleBrand
}) => {

    return (
        <Dialog
            onClose={handleClose} open={open}>
            <div className="grid grid-flow-row gap-1 p-4 bg-[url(./background2.svg)]" style={{ minWidth: "340px" }}>
                <TextField
                    placeholder="Product Title"
                    color="success"
                    value={ServiceName}
                    onChange={handleServiceName}
                    size="medium" />
                <TextField
                    placeholder="Product description"
                    value={ServiceDescription}
                    onChange={handleServiceDescription}
                    color="success"
                    size="medium" />
                <div className="grid grid-flow-col mt-5">
                    <CategoryDialog category={category} handleCategory={handleCategory} />
                    <ClothingDialog Type={Type} handleType={handleType} Size={Size} handleSize={handleSize} category={category} />
                    <ShoeDialog Size={Size} handleSize={handleSize} category={category} />
                    <AccessoriesDialog Type={Type} handleType={handleType} category={category} />
                </div>
                <div className={`grid grid-cols-2 gap-1`}>
                    <ConditionDialog conditon={condition} handleCondition={handleCondition} />
                    <GenderDialog Gender={Gender} handleGender={handleGender} />
                </div>
                <div className={`grid grid-cols-2 gap-1`}>
                    <ColorDialog color={color} handleColor={handleColor} />
                    <BrandDialog brand={brand} handleBrand={handleBrand} />
                </div>
                <ImageDialog image={image} handleImage={handleImage} />
                <div className="flex align-center justify-center pb-4 pt-4">
                    <Button
                        sx={{
                            textTransform: "none", bgcolor: "#05e6c0", color: "whitesmoke",
                            '&:hover': {
                                backgroundColor: "#96ffed",
                                color: 'gray',
                            }
                        }}
                        onClick={handleAddService}
                        size="large">
                        Donate
                    </Button>
                </div>
            </div>
        </Dialog >
    )
}