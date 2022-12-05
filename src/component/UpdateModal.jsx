import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const UpdateModal = ({ open, setOpen, groupTitle, setGroupTitle }) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    setGroupTitle(title);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box>
              <TextField
                fullWidth
                name="Title"
                label="Title"
                defaultValue={groupTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleSave}
              sx={{ display: "block", margin: "auto", marginTop: "1rem" }}
            >
              Save Title
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default UpdateModal;
