import PropTypes from 'prop-types';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export default class CustomDialog extends React.Component {
    handleClose = () => {
        this.props.onClose();
    };

    render = () => {
        const { classes, selectedValue, children, title, subTitle, ...other } = this.props;
        return (
            <Dialog
                onBackdropClick={this.handleClose}
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                {...other}
            >
                {title ?
                    <DialogTitle
                        id="simple-dialog-title"
                        onClose={this.handleClose}
                    >
                        <div style={{textTransform: 'uppercase', fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: '#2a3236',}}>{title}</div>
                        {subTitle}
                        {this.handleClose ? <IconButton
                            aria-label="Close"
                            size="small"
                            style={{
                                padding: 1,
                                backgroundColor: 'black',
                                color: 'white',
                                border: 'solid 2.1px white',
                                position: "absolute",
                                top: -12,
                                right: -12
                            }}
                            onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton> : undefined}
                    </DialogTitle>
                    : undefined}
                <DialogContent className='base-dialog-content'>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

}

CustomDialog.propTypes = {
    title: PropTypes.any,
    subTitle: PropTypes.any,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
};
