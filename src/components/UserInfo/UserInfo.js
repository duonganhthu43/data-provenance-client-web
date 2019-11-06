
import React, { useState } from 'react';
import BaseSettingComponent from '../BaseSettingComponent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import Truncate from "react-truncate";
import CertifierDetailDialog from './CertifierDetailDialog'
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

const styles = {
    cellHeader: {
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#9ea5a9',
        textTransform: 'uppercase'
    },
    userDataKey: {
        fontWeight: 'bold',
        marginRight: '10px',
        fontSize: '14px',
        textTransform: 'capitalize',
        color: '#5e737d'
    },
    tableBody: {
        fontSize: '13px'
    },
    cellElement: {
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#2a3236',
        paddingBottom: '0px'
    },
    certifierId: {
        textDecoration: 'none',
        color: 'blue',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: '0.45em',
        fontFamily: 'Nunito Sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    },
    sectionPaper: {
        padding: '20px',
        marginBottom: '20px',
        boxShadow: 'none'
    },
    sectionContent: {
        fontFamily: 'Nunito Sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol',
        fontWeight: '400'
    }
}
function UserInfo(props) {
    const pathname = window.location.pathname
    const { userData } = useSelector(state => state.login && state.login.userInfo)
    console.log('==== UserInfo ', userData)
    if (!userData && pathname !== '/login') {
        window.location.href = `${window.location.origin}/login`
        return
    }
    const { classes } = props
    const { identities, attributes } = userData
    const [selectedCertifierId, setSelectedCertifierId] = useState(undefined)
    const keysDisplay = ['id', 'name', 'fullname', 'email', 'apikey', 'state', 'source', 'sysadmin',]

    const renderSubTitle = () => {
        return <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" style={{ fontSize: '14px' }} href="/user-info">
                Users
        </Link>
            <Typography color="textPrimary" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>Current User</Typography>
        </Breadcrumbs>
    }
    const renderAttributes = () => {
        return attributes && attributes.length > 0 &&
            (
                <Paper className={classes.sectionPaper}>
                    <div className={classes.sectionTitle}>Attributes</div>
                    <Table >
                        <TableHead >
                            <TableRow>
                                <TableCell align="left" className={classes.cellHeader}>Certifier ID</TableCell>
                                <TableCell align="left" className={classes.cellHeader}>Issued Date</TableCell>
                                <TableCell align="left" className={classes.cellHeader}>Attribute Name</TableCell>
                                <TableCell align="left" className={classes.cellHeader}>Attribute Value</TableCell>
                                <TableCell align="left" className={classes.cellHeader}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attributes.map(attribute => {
                                return (<TableRow key={attribute.value}>
                                    <TableCell className={classes.certifierId} onClick={() => {
                                        setSelectedCertifierId(attribute.certifierID)
                                    }}>
                                        <Truncate lines={1} width={210}>
                                            {attribute.certifierID}
                                        </Truncate>
                                    </TableCell>
                                    <TableCell>
                                        {moment(attribute.issuedDate).format('YYYY-MM-DD')}
                                    </TableCell>
                                    <TableCell>
                                        {attribute.name}
                                    </TableCell>
                                    <TableCell>
                                        {attribute.value}
                                    </TableCell>
                                    <TableCell style={{ color: attribute.expired ? 'red' : 'green', textTransform: 'capitalize' }}>
                                        {`${attribute.expired ? 'Expired' : 'Active'}`}
                                    </TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            )
    }
    const renderIndentities = () => {
        return identities && identities.length > 0 &&
            (
                <Paper className={classes.sectionPaper}>
                    <div className={classes.sectionTitle}>Identities</div>
                    <Table >
                        <TableHead >
                            <TableRow>
                                <TableCell className={classes.cellHeader}>FingerPrint</TableCell>
                                <TableCell align="left" className={classes.cellHeader}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {identities.map(identity => {
                                return (<TableRow key={identity.fingerprint}>
                                    <TableCell>
                                        {identity.fingerprint}
                                    </TableCell>
                                    <TableCell style={{ color: identity.status ? 'green' : 'red', textTransform: 'capitalize' }}>
                                        {`${identity.status ? 'Active' : 'Inactive'}`}
                                    </TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            )
    }
    const renderDialogInside = (showAccessFilter) => {
        return ([<CertifierDetailDialog
            className='modify-user-dialog-container'
            key='certifier-user-dialog'
            data={selectedCertifierId}
            open={!!selectedCertifierId}
            maxWidth={'xs'}
            onClose={() => {
                setSelectedCertifierId(undefined)
            }}
        />])
    }


    const renderGeneralInfo = () => {
        return <Paper className={classes.sectionPaper}>
            <div className={classes.sectionTitle}>General Info</div>
            <div className={classes.sectionContent}>
                {
                    userData && keysDisplay && keysDisplay.length > 0 && keysDisplay.map(key => {
                        if (!key || !userData[key]) return <></>
                        return (
                            <div style={{ display: 'flex', marginBottom: '6px' }}>
                                <div className={classes.userDataKey}>{`${key} : `}</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '0.875rem' }}>{userData[key]}</div>
                            </div>
                        )
                    })
                }
            </div>
        </Paper>
    }

    return (<BaseSettingComponent
        activeMenu='user-info'
        isLoading={false}
        title={'User Info'}
        subTitle={renderSubTitle()}
    >
        {renderGeneralInfo()}
        {renderIndentities()}
        {renderAttributes()}
        {renderDialogInside()}
        {/* {renderIndentities()}
        {renderAttributes()}
        {renderDialogInside()} */}

    </BaseSettingComponent>)
}
export default withStyles(styles, { withTheme: true })(UserInfo);
