import React from 'react'
import { Redirect } from "react-router";
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import * as loginActions from "../../sagas/login/loginActions";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: '56px'
  }
});
class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  toggleDrawer = () => {
    this.setState(state => {
      return { drawerOpen: !state.drawerOpen }
    });
  };

  render() {
    const { toggleDrawer } = this
    const { login, getUserInfoLoading, children, className } = this.props;
    const { access_token } = login && login.userInfo && login.userInfo

    if (getUserInfoLoading) {
      return (
        <div className="loading-container">
          <CircularProgress disableShrink />
        </div>
      )
    }
    const pathname = window.location.pathname

    if (!access_token && pathname !== '/login') {
      let history = this.props.history
      if(history) {
        history.push('/login')
      } else {
        return (<Redirect to={'/login'} />)
      }
      console.log('=== this.props ', this.props)
      return
    }
    if (access_token && pathname === '/login') {
      console.log('=== this.props ', this.props)
      let history = this.props.history
      if(history) {
        history.push('/datasets')
      } else {
        return (<Redirect to={'/datasets'} />)
      }
     // this.props.history.push('/datasets')

      //return (<Redirect to={'/datasets'} />)
    }

    return (
      <div className={`layout ${className}`}>
        {/* <Header toggleDrawer={toggleDrawer} /> */}
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {children}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    getUserInfoLoading: state.login.loading.getUserInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(loginActions.getUserInfo())
  }
}
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Layout))