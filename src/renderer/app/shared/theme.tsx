import { createTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createSpacing } from "@mui/system";
import MuiCreateStyled from "@mui/system/createStyled";

// ─── Carbon Fiber Palette ────────────────────────────────────────────
const carbon = {
  black: "#111113",
  base: "#161619",
  surface: "#1e1e22",
  surfaceHover: "#252529",
  border: "#2a2a2f",
  borderLight: "#35353b",
  cyan: "#00d4ff",
  cyanMuted: "#00a3c6",
  cyanDim: "#007a94",
  white: "#eaeaec",
  grey200: "#c4c4c8",
  grey400: "#8e8e95",
  grey600: "#55555c",
  red: "#ef4444",
  green: "#22c55e",
  blue: "#3b82f6",
  divider: "rgba(255, 255, 255, 0.06)"
} as const;

export const theme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: carbon.black,
      white: carbon.white
    },
    primary: {
      main: carbon.cyan,
      light: carbon.cyan,
      dark: carbon.cyanMuted
    },
    secondary: {
      main: carbon.grey400
    },
    error: {
      main: carbon.red
    },
    info: {
      main: carbon.blue
    },
    success: {
      main: carbon.green
    },
    text: {
      primary: carbon.white,
      secondary: carbon.grey200,
      disabled: carbon.grey600
    },
    background: {
      default: carbon.base,
      paper: carbon.surface
    },
    divider: carbon.divider
  },
  typography: (palette) => ({
    fontFamily: "'Geist', sans-serif",
    fontSize: 14,
    h1: {
      fontFamily: "'Geist', sans-serif",
      fontSize: "2.25em",
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color: palette.text.primary,
      margin: "1.5rem 1rem 0.5rem"
    },
    h2: {
      fontFamily: "'Geist', sans-serif",
      fontSize: "1.1em",
      fontWeight: 300,
      letterSpacing: "0.01em",
      color: palette.text.secondary,
      margin: "0.25rem 1rem"
    },
    h3: {
      fontFamily: "'Geist', sans-serif",
      fontSize: "0.85em",
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase" as const,
      color: palette.text.secondary,
      margin: "0.5rem"
    },
    button: {
      fontFamily: "'Geist', sans-serif",
      fontSize: "0.8em",
      fontWeight: 500,
      letterSpacing: "0.06em",
      color: palette.common.white,
      textTransform: "uppercase" as const
    },
    body1: {
      fontFamily: "'Geist', sans-serif",
      fontSize: "0.95em",
      fontWeight: 400,
      color: palette.text.primary,
      lineHeight: 1.5
    },
    body2: {
      fontFamily: "'Geist', sans-serif",
      fontSize: "0.9em",
      fontWeight: 300,
      lineHeight: 1.6,
      color: palette.text.secondary
    },
    caption: {
      fontFamily: "'Geist', sans-serif",
      fontSize: "0.8em",
      fontWeight: 400,
      letterSpacing: "0.02em",
      color: palette.text.secondary
    }
  }),
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
        size: "small",
        disableElevation: true
      },
      styleOverrides: {
        root: {
          margin: "0.5rem",
          borderRadius: 2,
          padding: "0.45rem 1.1rem",
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)"
        },
        contained: {
          backgroundColor: carbon.cyan,
          color: carbon.black,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#33ddff",
            boxShadow: `0 0 12px rgba(0, 212, 255, 0.25)`
          }
        },
        outlined: {
          borderColor: carbon.border,
          color: carbon.white,
          "&:hover": {
            borderColor: carbon.cyan,
            backgroundColor: "rgba(0, 212, 255, 0.04)"
          }
        },
        text: {
          color: carbon.cyan,
          "&:hover": {
            backgroundColor: "rgba(0, 212, 255, 0.06)"
          }
        }
      }
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
        color: "primary"
      },
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.caption,
          fontWeight: 400,
          minWidth: "16rem",
          borderRadius: 2
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: carbon.border
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: carbon.borderLight
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: carbon.cyan,
            borderWidth: 1
          }
        }
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
        color: "primary",
        renderInput: (params) => {
          return <TextField {...params} variant="outlined" color="primary" size="small" />;
        }
      }
    },
    MuiTabs: {
      defaultProps: {
        variant: "fullWidth",
        textColor: "primary",
        indicatorColor: "primary"
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${carbon.border}`
        }),
        indicator: {
          backgroundColor: carbon.cyan,
          height: 2
        }
      }
    },
    MuiCard: {
      defaultProps: {
        raised: false,
        variant: "outlined",
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundColor: carbon.surface,
          borderColor: carbon.border,
          borderWidth: 1,
          borderRadius: 4,
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: carbon.borderLight,
            backgroundColor: carbon.surfaceHover
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        title: () => ({
          margin: 0
        })
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1),
          borderTop: `1px solid ${carbon.border}`
        })
      }
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined"
      },
      styleOverrides: {
        root: () => ({
          width: "100%",
          backgroundColor: carbon.surface,
          borderColor: carbon.border,
          borderRadius: 4
        })
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: `1px solid ${carbon.border}`,
          backdropFilter: "blur(12px)"
        },
        standardSuccess: {
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          color: carbon.green
        },
        standardError: {
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          color: carbon.red
        },
        standardInfo: {
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          color: carbon.blue
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: carbon.cyan,
          transition: "color 150ms ease",
          "&:hover": {
            color: "#33ddff"
          }
        }
      }
    }
  },
  spacing: createSpacing((value: number | string) => {
    if (typeof value === "number") {
      return `${value}rem`;
    }

    return value;
  }),
  shape: {
    borderRadius: 4
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    create: (props, options) => {
      const duration = options?.duration ?? "standard";
      const easing = options?.easing ?? "easeInOut";
      const delay = options?.delay ? `, ${options.delay}` : "";

      if (Array.isArray(props)) {
        return `transition: ${props.join(", ")} ${duration}ms ${easing}${delay};`;
      }

      return `transition: ${props} ${duration}ms ${easing}${delay};`;
    },
    getAutoHeightDuration: (height) => {
      return Math.round(height / 36) * 150;
    }
  }
});

export const createStyled = MuiCreateStyled({
  defaultTheme: theme
});
