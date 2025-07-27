import { TextField, Dialog, FormControl, MenuItem, InputLabel, Select, Button } from "@mui/material"
import { ClothingDialog } from "./clothing";
import { ShoeDialog } from "./shoes";
import { AccessoriesDialog } from "./accessories";
import { QuantityDialog } from "./quantity";
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
    quantity,
    handleQuantity,
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
                <div className="grid grid-flow-col mt-5">
                    <ClothingDialog Type={Type} handleType={handleType} Size={Size} handleSize={handleSize} category={category} />
                    <ShoeDialog Size={Size} handleSize={handleSize} category={category} />
                    <AccessoriesDialog Type={Type} handleType={handleType} category={category} />
                </div>
                <div className={`grid grid-cols-2 gap-1`}>
                    <ConditionDialog conditon={condition} handleCondition={handleCondition} />
                    <ColorDialog color={color} handleColor={handleColor} />
                </div>
                <div className={`grid grid-cols-2 gap-1`}>
                    <BrandDialog brand={brand} handleBrand={handleBrand} />
                    <QuantityDialog brand={quantity} handleBrand={handleQuantity} />
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