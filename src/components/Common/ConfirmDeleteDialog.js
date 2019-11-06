import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CustomDialog from './CustomDialog';
import '../../styles/components/Common/confirmDeleteDialog.scss'

const styles = theme => ({
    actionButtons: {
        justifyContent: 'center',
        margin: '27px 0px 0px 0px',
        fontSize: '12px'
    },
    removeButton: {
        color: 'white',
        fontSize: '12px',
        backgroundColor: '#2a3236',
        flex: 1,
        '&:hover': {
            backgroundColor: '#2f7ae2',
        }
    },
    cancelButton: {
        color: '#b7c0c5',
        fontSize: '12px',
        backgroundColor: 'white',
        border: 'solid 1px #b7c0c5',
        flex: 1,
        '&:hover': {
            backgroundColor: 'white',
            border: 'solid 1px #b7c0c5',
        }

    }
});
class ConfirmDeleteDialog extends React.Component {
    handleDelete = () => {
        const { onDelete, onClose } = this.props
        onDelete();
        onClose();
    }

    render() {
        let { renderContent } = this
        const { classes, onClose, data, open, onDelete, onSave, secondaryMessage, ...others } = this.props
        return <CustomDialog
            onClose={onClose}
            open={open}
            {...others}
        >
            {renderContent({ classes })}
        </CustomDialog>
    }

    renderContent = ({ classes }) => {
        const { onClose, message, secondaryMessage } = this.props
        return (
            <div className='confirm-delete-dialog-container'>
                <DialogContentText id="alert-dialog-description" className='content-message'>
                    {message}
                </DialogContentText>
                {secondaryMessage && 
                    <div id='alert-dialog-secondary-message' className='content-message secondary-message'>
                        {secondaryMessage}
                    </div>
                }
                <DialogActions className={classes.actionButtons}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="primary"
                        className={'cancel-btn'}
                    >
                        <span className='cancel-btn-label'>CANCEL</span>
                    </Button>
                    <Button
                        onClick={this.handleDelete}
                        variant="contained"
                        className={'ok-btn'}
                        color="primary"
                        autoFocus>
                        <span className='ok-btn-label'>YES, REMOVE</span>
                    </Button>
                </DialogActions>
            </div>
        )
    }
}
export default withStyles(styles)(ConfirmDeleteDialog);
