import { Button } from "@mui/material"

export const ImageDialog = ({ image, handleImage }) => {
    return (
        <>
            <Button
                sx={{
                    textTransform: "none", bgcolor: "#05e6c0", color: "whitesmoke",
                    '&:hover': {
                        backgroundColor: "#96ffed",
                        color: 'gray',
                    }
                }}>
                <label style={{ cursor: 'pointer' }}>
                    Upload a picture
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImage}
                        style={{ display: 'none' }}
                    />
                </label>
            </Button>
            <div className="flex align-center justify-center">
                <img width={150} alt={image} src={image} />
            </div>
        </>)
}