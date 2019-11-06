
import { createMuiTheme } from '@material-ui/core/styles';
export const globalTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#2f7ae2',
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00',
        }
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                borderColor: '#b7c0c5',
                padding: 0,
                fontSize: '14px',
                "&$focused $notchedOutline": {
                    borderColor: 'b7c0c5',
                    borderWidth: '1px',
                    backgroundColor: 'clear'
                },
                "&$disabled": {
                    fontFamily: 'Arial',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    color: '#38464c',
                    backgroundColor: '#f6f9fa',
                }
            },
            input: {
                padding: 'none',
                paddingLeft: '10px',
                paddingRight: '10px'

            },
        },
        MuiTableCell: {
            root: {
                padding: '0px 5px'
            }
        },
        MuiDialog: {
            paper: {
                overflowY: 'visible'
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                "&$checked": {
                    color: '#2f7ae2'
                }
            }
        },
        MuiList: {
            padding: {
                paddingBottom: '0px'
            }
        },
        MuiTypography: {
            title: {
                fontWeight: 'bold',
                fontSize: '16px',
                textTransform: 'uppercase'
            }
        },
    },
});

