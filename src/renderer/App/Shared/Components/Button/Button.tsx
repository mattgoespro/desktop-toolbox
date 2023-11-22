import Button from "@mui/material/Button";
import { styled } from "../../theme/theme";

export const StyledButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.button.fontSize,
  padding: theme.spacing(1, 2),
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark
  },
  "&:active": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(0.98)"
  },
  "&:disabled": {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[500],
    cursor: "not-allowed"
  }
})) as unknown as typeof Button;
