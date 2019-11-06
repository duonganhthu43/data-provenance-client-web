import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as loginActions from "../sagas/login/loginActions"
import { connect } from 'react-redux'
import CustomSnackBarContent from './Common/CustomSnackBarContent';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid/Grid";
import Layout from "./Common/Layout";
import '../styles/components/login.scss'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  renderError() {
    const { errorMessage, clearMessage } = this.props
    if (errorMessage) {
      return <CustomSnackBarContent
        open={!!errorMessage}
        variant={'error'}
        message={errorMessage}
        onClose={clearMessage}
      />
    }
  }

  render() {
    return (
      <Layout>
        <Grid container spacing={24}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper className="login-container">
              <form onSubmit={this.handleLogin}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                      Login
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className="form-group">
                    <TextField
                      id="email"
                      label="Email"
                      // type="email"
                      // autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      value={this.state.email}
                      onChange={this.handleEmailChanged}
                      className="form-control"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className="form-group">
                    <TextField
                      variant="outlined"
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      margin="normal"
                      value={this.state.password}
                      onChange={this.handlePasswordChanged}
                      className="form-control"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {this.renderError()}
                  </Grid>
                  <Grid item xs={12} className="button-container">
                    <Button variant="contained" type="submit" color="primary">Login</Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Layout>
    );
  }

  handleEmailChanged = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChanged = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.props.login(this.state);
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.login.errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginActions.loginByEmail(payload)),
    clearMessage: () => dispatch(loginActions.clearMessage())
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
