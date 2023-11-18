import { SvgIconComponent } from "@mui/icons-material";
import { ListItemProps as MuiListItemProps, ListItem as MuiListItem } from "@mui/material";

type ContainedProps<T extends MuiListItemProps> = T["contained"] extends true
  ? {
      icon: SvgIconComponent;
    }
  : unknown;

export type ListItemProps<T extends MuiListItemProps> = T & ContainedProps<T>;

export function ListItem<T extends MuiListItemProps>(props: ListItemProps<T>) {
  return <MuiListItem {...props}>{props.children}</MuiListItem>;
}
