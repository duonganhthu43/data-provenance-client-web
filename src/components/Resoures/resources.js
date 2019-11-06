
import React, { useState, useEffect } from 'react';
import BaseSettingComponent from '../BaseSettingComponent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { getDatasetOfCurrentUser } from '../../sagas/dataset/datasetActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton';
import EyeIcon from '@material-ui/icons/RemoveRedEye';

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
    rowInfo: {
        textDecoration: 'none'
    },
    datasetRow: {
        height: '40px',
        '&:hover': {
            backgroundColor: '#f0f8fb',
            cursor: 'pointer'
        },
        '&:hover $actionUtilities': {
            visibility: 'visible'
        },
        '&:hover  $rowInfo': {
            textDecoration: 'underline'
        }
    },
    actionUtilities: {
        visibility: 'hidden',
        padding: '5px'
    },
}
function Resources(props) {
    const { classes, history } = props
    const dispatch = useDispatch()
    const { dataset, loading } = useSelector(state => state.dataset)
    const { loadingDataset } = loading
    const [selectedDataset, setSelectedDataset] = useState(undefined)
    useEffect(() => {
        dispatch(getDatasetOfCurrentUser())
    }, [])

   
    const renderDataset = () => {
        return <Table >
            <TableHead >
                <TableRow>
                    <TableCell className={classes.cellHeader}>ID</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>Title</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>License</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>Modified</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>Resources</TableCell>
                    <TableCell align="left" className={classes.cellHeader}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dataset && dataset.length > 0 && dataset.map(data => {
                    return (<TableRow
                        className={classes.datasetRow}

                        onClick={() => {
                            history.push(`/dataset-detail?datasetId=${data.id}`)
                        }}
                        key={data.id}>
                        <TableCell
                            className={classes.rowInfo}>
                            {data.id}
                        </TableCell >
                        <TableCell
                            style={{ textTransform: 'capitalize' }}
                            className={classes.rowInfo}>
                            {data.title}
                        </TableCell >
                        <TableCell 
                        onClick={() => {
                            history.push(`/dataset-detail?datasetId=${data.id}`)
                        }}
                        style={{ textTransform: 'capitalize' }}
                         className={classes.rowInfo}>
                            {data.license_id}
                        </TableCell>
                        <TableCell 
                        style={{ textTransform: 'capitalize' }} 
                        className={classes.rowInfo}>
                            {moment(data.modified).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell 
                        onClick={() => {
                            history.push(`/dataset-detail?datasetId=${data.id}`)
                        }}
                        style={{ textTransform: 'capitalize' }} 
                        className={classes.rowInfo}>
                            {data.resources && data.resources.length > 0 ? data.resources.length : 0}
                        </TableCell>
                        <TableCell
                            align="right"
                            className='cell-action'
                        >
                            <IconButton
                                aria-label="View"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setSelectedDataset(data)
                                }}
                                className={classes.actionUtilities}
                            >
                                <EyeIcon fontSize="small" className='eye-icon' />
                            </IconButton>
                        </TableCell>
                    </TableRow>)
                })}
            </TableBody>
        </Table>
    }
    return (<BaseSettingComponent
        activeMenu='resources'
        isLoading={false}
        title={'Resources'}
    >
        {loadingDataset && <CircularProgress />}
        {!loadingDataset && renderDataset()}
    </BaseSettingComponent>)
}
export default withStyles(styles, { withTheme: true })(Resources);
