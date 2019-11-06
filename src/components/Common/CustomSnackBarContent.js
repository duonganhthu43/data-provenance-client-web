import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: '#d3f2d4',
        color: '#137016'
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 14,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px',
        flex: 1,
    },
    close: {
        padding: '5px'
    },
    myMessage: {
        flex: '1'
    },
    myAction: {
        padding: '0px'
    }
});

class CustomSnackBarContent extends React.Component {
    render() {
        const { classes, className, message, variant, open, onClose, ...other } = this.props;
        const Icon = variantIcon[variant];
        return <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            style={{ width: '100%' }}
            className={"message-snack-bar"}
        >

            <SnackbarContent
                style={{ display: 'flex', flex: '1' }}
                key="BottomSnackbarContent"
                className={classNames(classes[variant], 'snackbar-content')}
                aria-describedby="client-snackbar"
                classes={{ message: classes.myMessage, action: classes.myAction }}
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                        size="small"
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        </Snackbar>
    }
}
CustomSnackBarContent.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
export default withStyles(styles)(CustomSnackBarContent);
