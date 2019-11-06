import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Layout from "./Common/Layout"
import Menu from "./Common/Menu"
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from "../components/Common/Footer";
import PropTypes from 'prop-types';
import '../styles/components/baseSettingComponent.scss'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    mainTitle: { height: '56px', display: 'flex', alignItems: 'center', fontSize: '1.5rem', fontWeight: '600', fontFamily: 'Nunito Sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"' }
}
function BaseSettingComponent(props) {
    const { activeMenu, isLoading, children, title, classes, subTitle } = props;
    return <Layout >
        <div style={{ display: 'flex', flex: '1' }}>
            <div style={{ display: 'flex' }}>
                <Menu active={activeMenu} />
            </div>
            <div style={{ display: 'flex', flex: '1', flexDirection: 'column', marginLeft: '40px', marginRight: '40px' }}>
                <div className={classes.mainTitle}>{title}</div>
                <div className={classes.subTitle}>{subTitle}</div>

                <div style={{ marginTop: '24px', marginBottom: '24px', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.12)' }} />
                <Dialog open={isLoading}>
                    <CircularProgress size={40} />
                </Dialog>
                <div style={{borderRadius: '4px', flexDirection: 'column', display: 'flex', flex: '1' }}> {children}</div>
            </div>
        </div>
    </Layout>
}

BaseSettingComponent.propTypes = {
    title: PropTypes.any.isRequired,
    rightTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    activeMenu: PropTypes.string.isRequired,
    isLoading: PropTypes.bool
}
export default withStyles(styles)(BaseSettingComponent)