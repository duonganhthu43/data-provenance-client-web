
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import '../../styles/components/Common/bottomSaveBar.scss'

const styles = theme => ({
    rootContentSnackBar: {
        backgroundColor: 'white',
        boxShadow: '0 -2px 4px 0 rgba(187, 195, 200, 0.5)',
        maxWidth: '100%',
        width: '100%',
        height: '71px',
        padding: '0px',
        left: 0,
    },
    anchorOriginBottomLeft: {
        left: 0,
        bottom: 0
    },
    messageContentSnackBar: {
        display: 'none'
    },
    actionContentSnackBar: {
        display: 'flex',
        flex: 1,
        margin: '0',
        justifyContent: 'center',
        marginLeft: '220px'
    },
})
class BottomSaveBar extends Component {
    handleCancelBtn = () => {
        this.props.onCancel()
    }
    handleSaveBtn = () => {
        this.props.onSave()
    }
    render() {
        const { classes, show } = this.props;
        return (
            <Snackbar
                className='bottom-save-bar'
                style={{ width: '100%' }}
                open={show}
                classes={{ anchorOriginBottomLeft: classes.anchorOriginBottomLeft }}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    classes: {
                        root: classes.rootContentSnackBar,
                        action: classes.actionContentSnackBar,
                        message: classes.messageContentSnackBar
                    }
                }}
                action={[
                    (<Button
                        key={'bottom-cancel'}
                        variant="outlined"
                        size="small"
                        onClick={this.handleCancelBtn}
                        className='btn-cancel'
                    >
                        <span className='btn-cancel-label'>CANCEL</span>
                    </Button>),
                    <Button
                        key={'bottom-save'}
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={this.handleSaveBtn}
                        className='btn-save'
                    >
                        <span className='btn-save-label'>SAVE</span>

                    </Button>
                ]}
            />
        )
    }
}
BottomSaveBar.propTypes = {
    show: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};
export default withStyles(styles)(BottomSaveBar)