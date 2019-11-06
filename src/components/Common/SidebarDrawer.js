import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from "classnames";
import Tooltip from '@material-ui/core/Tooltip';
import DashBoardIcon from './Icons/Dashboard'
import Items from './Icons/Item'
import Drivers from './Icons/Drivers'
import Manage from './Icons/Manage'
import Networks from './Icons/Networks'
import Orders from './Icons/Orders'
import Partners from './Icons/Partners'
import Reports from './Icons/Reports'
import Senders from './Icons/Senders'
import Help from './Icons/Help'

const drawerWidth = 150;

const styles = theme => ({
    drawer: {
        flexShrink: 0,
        zIndex: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,

    drawerOpen: {
        width: drawerWidth,
        backgroundColor: '#1f2532',
        zIndex: 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        zIndex: 1,
        backgroundColor: '#1f2532',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: '51px',
    },
    lightTooltip: {
        fontFamily: 'Arial',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.5px',
        color: '#ffffff',
        textTransform: 'uppercase',
        borderRadius: '2px',
        backgroundColor: '#333d4e'
    }
});

class SidebarDrawer extends React.Component {
    toggleDrawer = (open) => () => {
        const { onDrawerOpen } = this.props;
        onDrawerOpen(open);
    };

    handleMenuItemClick = (value) => {
        let redirectUrl;
        switch (value) {
            case 'Items': {
                redirectUrl = "/items/unassigned"
                break;
            }
            case 'Dashboard': {
                redirectUrl = "/dashboard"
                break;
            }
            case 'Orders': {
                redirectUrl = "/orders"
                break;
            }
            case 'Drivers': {
                redirectUrl = "/drivers"
                break;
            }
            case 'Senders': {
                redirectUrl = "/senders"
                break;
            }
            case 'Partners': {
                redirectUrl = "/partners"
                break;
            }
            case 'Reports': {
                redirectUrl = "/reports/orders"
                break;
            }
            case 'Network': {
                redirectUrl = "/network"
                break;
            }
            case 'Help': {
                redirectUrl = process.env.REACT_APP_HELP_URL || "https://yojee.zendesk.com/hc/en-us";
                window.open(redirectUrl, '_blank');
                return;
            }
            default:
                redirectUrl = ''
        }
        window.location.assign(redirectUrl);
    };

    render() {
        const { classes, drawerOpen } = this.props;
        const { handleMenuItemClick } = this
        return (
            <Drawer
                style={{ backgroundColor: '#1f2532' }}
                open={drawerOpen}
                variant="permanent"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen
                    })
                }}
            >
                <List style={{ marginTop: '56px', backgroundColor: '#1f2532' }}>
                    {[
                        { text: 'Dashboard', icon: (props) => { return (<DashBoardIcon {...props} />) } },
                        { text: 'Items', icon: (props) => { return (<Items {...props} />) } },
                        { text: 'Orders', icon: (props) => { return (<Orders {...props} />) } },
                        { text: 'Drivers', icon: (props) => { return (<Drivers {...props} />) } },
                        { text: 'Senders', icon: (props) => { return (<Senders {...props} />) } },
                        { text: 'Partners', icon: (props) => { return (<Partners {...props} />) } },
                        { text: 'Reports', icon: (props) => { return (<Reports {...props} />) } },
                        { text: 'Network', icon: (props) => { return (<Networks {...props} />) } },
                        { text: 'Manage', icon: (props) => { return (<Manage {...props} />) } },
                        { text: 'Help', icon: (props) => { return (<Help {...props} viewBox = "0 0 24 24"/>) } },
                    ].map((menu, index) => (
                        <Tooltip
                            classes={{ tooltip: classes.lightTooltip }}
                            title={menu.text}
                            key={`tooltip-${menu.text.toLowerCase()}`}
                            placement="right">
                            <ListItem
                                button
                                key={menu.text}
                                onClick={() => {
                                    handleMenuItemClick(menu.text)
                                }}
                            >
                                <ListItemIcon>
                                    {menu.icon({ style: { color: '#858f96', fontSize: '15px' }, viewBox: '0 0 20 20' })}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <span style={{
                                            fontFamily: 'Arial',
                                            fontSize: '13px',
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: '0.2px',
                                            color: drawerOpen ? '#d8e0e6' : 'transparent'
                                        }}>{menu.text}</span>}
                                    style={{
                                        padding: '0px'
                                    }}
                                />
                            </ListItem>
                        </Tooltip>

                    ))}
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SidebarDrawer);




