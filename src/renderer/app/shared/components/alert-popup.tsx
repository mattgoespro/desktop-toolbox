import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

type AlertPopupProps = {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  onClose: () => void;
};

export function AlertPopup({ message, severity, onClose }: AlertPopupProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ position: "absolute", top: 5, left: 5, zIndex: 1000 }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                onClose();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
