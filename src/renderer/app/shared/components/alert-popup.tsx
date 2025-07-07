import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

type AlertPopupProps = {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  onClose: () => void;
};

export function AlertPopup({ message, severity, onClose }: AlertPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Start the open animation immediately after mount
    setOpen(true);

    // Automatically close the alert after 5 seconds
    const timer = setTimeout(() => {
      setOpen(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Box sx={{ position: "absolute", bottom: 0, right: 0, zIndex: 1000, m: 2 }}>
      <Slide in={open} easing="ease-out" timeout={2000}>
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
        >
          {message}
        </Alert>
      </Slide>
    </Box>
  );
}
