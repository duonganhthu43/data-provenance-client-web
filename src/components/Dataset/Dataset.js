
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
import DatasetDetailDialog from './DatasetDetailDialog'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


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
        textTransform: 'uppercase',
        padding: '14px 40px 14px 16px'
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
        padding: '14px 40px 14px 16px'
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
        textDecoration: 'none',
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#2a3236',
        padding: '14px 40px 14px 16px'
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
function Dataset(props) {
    const { classes, history } = props
    const dispatch = useDispatch()
    const { dataset, loading } = useSelector(state => state.dataset)
    const { loadingDataset } = loading
    const [selectedDataset, setSelectedDataset] = useState(undefined)
    useEffect(() => {
        dispatch(getDatasetOfCurrentUser())
    }, [])

    const renderDialog = () => {
        return [<DatasetDetailDialog
            open={!!selectedDataset}
            data={selectedDataset}
            maxWidth={false}
            onClose={() => {
                setSelectedDataset(undefined)
            }}
        />]
    }
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
                            align="center"

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

                            <IconButton
                                aria-label="View"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    history.push(`/datasets/edit-dataset?datasetId=${data.id}`)
                                }}
                                className={classes.actionUtilities}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>)
                })}
            </TableBody>
        </Table>
    }

    const renderCreateNewButton = () => {
        return (
            <>
            <Link
            type={'button'}
            style={{
                float: 'right'
            }}
                onClick={() => {
                    history.push(`/datasets/new-dataset`)
                }}><AddIcon /></Link>
                
                </>
           
        )
    }
    const renderSubTitle = () => {
        return <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" style={{ fontSize: '14px' }} href="/datasets">
                Datasets
        </Link>
            <Typography color="textPrimary" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>Current User's Dataset</Typography>
        </Breadcrumbs>
    }
    return (<BaseSettingComponent
        activeMenu='datasets'
        isLoading={false}
        title={"Current User's Dataset"}
        subTitle={renderSubTitle()}
    >
        <Paper style={{ boxShadow: 'none', minHeight: '500px', padding: '20px' }}>
            {loadingDataset && <CircularProgress />}
            {renderCreateNewButton()}
            {!loadingDataset && renderDataset()}
            {renderDialog()}
        </Paper>
    </BaseSettingComponent>)
}
export default withStyles(styles, { withTheme: true })(Dataset);
