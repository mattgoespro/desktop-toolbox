import { ListItemProps, ListItem, styled } from "@mui/material";

export const ListItemStyled = createStyledComponent(ListItem)<ListItemProps>(({ theme }) => ({
  "&.ListItem-root": {
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.body1.fontSize,
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  }
}));
