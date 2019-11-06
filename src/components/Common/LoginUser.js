import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as loginActions from '../../sagas/login/loginActions'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    primary: {
        fontFamily: 'Arial',
        fontSize: '15px',
        fontWeight: 'normal',
    }
})
class LoginUser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            anchorEl: null,

        };
    }
    handleToggle = (event) => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClick = (event) => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open
        }));
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, signOut, loginName } = this.props;
        const { open } = this.state;
        return (<div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(35, 47, 62)' }}>
            <Avatar alt="User" src="./avatar.jpeg" className={classes.avatar} />
            <div style={{ flex: 1, color: 'white', marginLeft: '10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {loginName}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: 'rgb(76, 175, 80)', borderRadius: '50%' }}></div>
                    <div style={{ marginLeft: '10px', fontFamily: 'Nunito Sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"' }} > Online</div>
                </div>

            </div>
            <div>
                <IconButton onClick={() => {
                    signOut()
                }}>
                    <PowerSettingsNew style={{ fontSize: '20px', color: 'grey' }} />
                </IconButton>
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    const { userInfo } = state.login
    const loginName = userInfo && userInfo.userData && userInfo.userData.name
    return {
        loginName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(loginActions.signOut())
    }
};
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(LoginUser))