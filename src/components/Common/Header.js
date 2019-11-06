import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import * as loginActions from '../../sagas/login/loginActions'
import '../../styles/components/Common/header.scss'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginUser from './LoginUser'
import Notifications from './Notifications'
import { isLiteVersion, IncludeURL } from './Utitlities'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: '56px'
  },
  toolBar: {
    justifyContent: 'center',
    minHeight: '56px'
  },
  createOrderButton: {
    border: 'solid 1px #ffffff',
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    width: '116px',
    height: '25px',
    padding: '0px',
    marginRight: '25px'
  }
});
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
    };
  }

  renderLogo = () => {
    const { companyData } = this.props
    let logo = companyData && companyData.settings && companyData.settings.branding && companyData.settings.branding.logo
    return (logo && <img
      style={{ width: 'auto', height: '30px' }}
      alt="company-logo"
      src={logo}
      data-src={logo}
      data-src-retina={logo} />)
  }

  renderCurrentLoginUser = () => {
    return <LoginUser />
  }

  renderNotifications = () => {
    return <Notifications />
  }
  renderSeparator = () => {
    const { companyData } = this.props
    let header_cta_color = companyData && companyData.settings && companyData.settings.branding && companyData.settings.branding.header_cta_color
    return (
      <div style={{
        width: '1.5px',
        height: '22.5px',
        opacity: '0.5',
        backgroundColor: header_cta_color,
        marginLeft: '15px',
        marginRight: '15px'
      }}>

      </div>
    )
  }

  render() {
    const { classes, login } = this.props
    const showLoginData = login && login.userInfo
    const {  renderLogo, renderCurrentLoginUser, renderSeparator } = this
    return (
      <div className="header-container" >
        <AppBar className={classes.appBar} position="sticky">
          <Toolbar className={classes.toolBar} disableGutters>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft:  '16px' }}>
                {renderLogo()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {showLoginData && renderSeparator()}
                {showLoginData && renderCurrentLoginUser()}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(loginActions.signOut())
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Header))