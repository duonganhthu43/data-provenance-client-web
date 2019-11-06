import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomDialog from '../Common/CustomDialog';
import { useSelector, useDispatch } from 'react-redux'
import { getUserByFingerPrint } from '../../sagas/userInfo/userInfoActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; 
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
    }
}
function DatasetDetailDialog(props) {
    const { onClose, open, data, classes, ...others } = props
    const handleClose = () => {
        onClose();
    };
    const keysDisplay = ['id', 'title', 'state', 'name', 'license_id', 'creator_user_id', 'tag_string', 'modifiedBy']

    const renderReSources = () => {
        return data && data.resources &&  data.resources.length > 0 &&<Table>
            <TableHead >
                <TableRow>
                    <TableCell className={classes.cellHeader}>Id</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>name</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>url_type</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>mimetype</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>format</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
               { data.resources.map( resource => {
                    return (<TableRow key={resource.id}>
                        <TableCell>
                            {resource.id}
                        </TableCell>
                        <TableCell>
                            {resource.name}
                        </TableCell>
                        <TableCell>
                            {resource.url_type}
                        </TableCell>
                        <TableCell>
                            {resource.mimetype}
                        </TableCell>
                        <TableCell>
                            {resource.format}
                        </TableCell>
                        <TableCell>
                            {resource.description}
                        </TableCell>
                    </TableRow>)
               })}
            </TableBody>
        </Table>
    }
    return <CustomDialog
        onClose={handleClose}
        title={<div className='certifier-user-dialog-title'>Dataset detail</div>}
        open={open}
        {...others}
    >
        {
            data && keysDisplay && keysDisplay.length > 0 && keysDisplay.map(key => {
                if (!key || !data[key]) return (<></>)
                return (
                    <div style={{ display: 'flex', marginBottom: '6px' }}>
                        <div className={classes.userDataKey}>{`${key} : `}</div>
                        <div style={{ fontSize: '14px', color: '#5e737d' }}>{ JSON.stringify(data[key])}</div>
                    </div>
                )
            })
        }
        {data && data['modified'] && <div style={{ display: 'flex', marginBottom: '6px' }}>
            <div className={classes.userDataKey}>{'Modified'}</div>
            <div style={{ fontSize: '14px', color: '#5e737d' }}>{moment(data.modified).format('YYYY-MM-DD')}</div>
        </div>}
        {renderReSources()}
    </CustomDialog>
}

export default withStyles(styles, { withTheme: true })(DatasetDetailDialog);
