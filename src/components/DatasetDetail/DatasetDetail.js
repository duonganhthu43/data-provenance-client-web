
import React, { useState, useEffect } from 'react';
import BaseSettingComponent from '../BaseSettingComponent';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getDatasetDetailByIdRequest,getProvPDF, getDatasetDetailProvenanceByIdRequest, getProvenanceByFormat, getDatasetDetailHistoryByIdRequest, cleanupDatasetDetail, getProvN } from '../../sagas/dataset-detail/dataset-detail.actions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PrettyJson from '@loopmode/react-pretty-json';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

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
    rowInfo: {
        textDecoration: 'none'
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
    resourceRow: {
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
}

function DatasetDetail(props) {
    const { location, history, classes } = props
    const dispatch = useDispatch()
    const [provenanceExpanded, setProvenanceExpanded] = React.useState(false);
    const [historyExpanded, setHistoryExpanded] = React.useState(false);

    const [currentViewFormat, setCurrentViewFormat] = React.useState('json');
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleProvenanceExpandClick = () => {
        setProvenanceExpanded(!provenanceExpanded);
    };
    const getQueryVariable = (variable) => {
        var query = location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    }
    let datasetDetail = useSelector(state => state.datasetDetail && state.datasetDetail.dataset)
    let datasetDetailProvenance = useSelector(state => state.datasetDetail && state.datasetDetail.provenance)
    let datasetHistory = useSelector(state => state.datasetDetail && state.datasetDetail.history)
    const maxSteps = datasetHistory ? datasetHistory.length : 0;

    const datasetId = getQueryVariable('datasetId')
    useEffect(() => {
        dispatch(getDatasetDetailByIdRequest({ datasetId }))

        //ok
        //dispatch(getDatasetDetailProvenanceByIdRequest({ datasetId }))

        // ok
        //dispatch(getDatasetDetailHistoryByIdRequest({ datasetId }))
        return () => {
            dispatch(cleanupDatasetDetail())
        };

    }, [datasetId])
    useEffect(() => {
        if (datasetDetail && !datasetDetailProvenance)
            dispatch(getDatasetDetailProvenanceByIdRequest({ datasetId }))
    }, [datasetDetail])
    useEffect(() => {
        if (datasetDetailProvenance && !datasetHistory)
            dispatch(getDatasetDetailHistoryByIdRequest({ datasetId }))
    }, [datasetDetailProvenance])
    useEffect(() => {
        if (datasetDetailProvenance )
            dispatch(getProvPDF())
    }, [datasetDetailProvenance])
    

    const renderProvenanceModel = () => {
        return datasetDetailProvenance && (
            <>
                <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 1px lightgrey' }}>
                    <div style={{ textTransform: 'uppercase', color: '#5e737d', fontWeight: 'bold' }}>Provenance Info</div>
                    <IconButton
                        onClick={handleProvenanceExpandClick}
                        aria-expanded={provenanceExpanded}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
                <Collapse in={provenanceExpanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <Link
                                component="button"
                                onClick={() => {
                                    let newWindow = window.open("", "");
                                    console.log('=== datasetDetailProvenance.imageData ', datasetDetailProvenance.imageData)
                                    newWindow.document.write(datasetDetailProvenance.imageData);
                                }}>
                                View Provenance Image
                        </Link>
                            <div>
                                <Link component="button" style={{ marginLeft: '5px', marginRight: '5px' }}
                                    onClick={() => {
                                        setCurrentViewFormat('json')

                                    }}
                                >JSON</Link>
                                <Link component="button" style={{ marginLeft: '5px', marginRight: '5px' }} onClick={() => {
                                    dispatch(getProvN())
                                    setCurrentViewFormat('PROVN')
                                }} >PROVN</Link>
                                <Link component="button" style={{ marginLeft: '5px', marginRight: '5px' }} onClick={() => {
                                    dispatch(getProvenanceByFormat({ format: 'turtle' }))
                                    setCurrentViewFormat('turtle')
                                }}  >TURTLE</Link>
                            </div>
                        </div>
                        {currentViewFormat === 'json' && <PrettyJson json={datasetDetailProvenance && datasetDetailProvenance[currentViewFormat]} onError={console.error} />}
                        {currentViewFormat !== 'json' &&
                            <Typography style={{ marginTop: '10px', overflow: 'scroll', padding: '10px 20px', fontFamily: 'monospace', backgroundColor: 'ghostwhite', border: '1px solid silver' }} paragraph>
                                {datasetDetailProvenance[currentViewFormat]}
                            </Typography>
                        }
                    </CardContent>
                </Collapse> </>)

    }
    const renderHistoryInfo = () => {
        return datasetHistory && datasetHistory.length > 0 && (<>
            <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 1px lightgrey' }}>
                <div style={{ textTransform: 'uppercase', color: '#5e737d', fontWeight: 'bold' }}>History Info</div>
                <IconButton
                    onClick={() => { setHistoryExpanded(!historyExpanded) }}
                    aria-expanded={provenanceExpanded}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            <Collapse in={historyExpanded} timeout="auto" unmountOnExit>
                <div className={classes.root}>
                    <Paper square elevation={0} className={classes.header}>
                        <PrettyJson json={datasetHistory && datasetHistory[activeStep]} onError={console.error} />
                    </Paper>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="progress"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
            <KeyboardArrowRight />

                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                                Back
          </Button>
                        }
                    />
                </div>
            </Collapse></>)
    }
    const renderTitle = () => {
        return <div style={{ display: 'flex' }}>
            <Link
                onClick={() => {
                    history.push(`/dataset`)
                }}>Dataset Info</Link>
            <div style={{ marginLeft: '5px', marginRight: '5px' }}>/</div>
            <div>Dataset Detail</div>
        </div>
    }
    const keysDisplay = ['id', 'title', 'state', 'name', 'license_id', 'creator_user_id', 'tag_string', 'modifiedBy']


    const renderResourceInfo = () => {
        let resources = datasetDetail && datasetDetail.resources
        return (resources && resources.length > 0 && <div style={{ overflow: 'scroll' }}> <Table>
            <TableHead >
                <TableRow>
                    <TableCell align="left" className={classes.cellHeader}>name</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>format</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>file_hash</TableCell>
                    <TableCell align="left" className={classes.cellHeader}>size</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {resources.map(resource => {
                    return (<TableRow className={classes.resourceRow} key={resource.id}
                        onClick={() => {
                            history.push(`/resource-detail?resourceId=${resource.id}`)
                        }}
                    >
                        <TableCell className={classes.rowInfo}>
                            {resource.name}
                        </TableCell>
                        <TableCell className={classes.rowInfo}>
                            {resource.format}
                        </TableCell >
                        <TableCell className={classes.rowInfo}>
                            {resource.file_hash}
                        </TableCell>
                        <TableCell className={classes.rowInfo}>
                            {resource.size}
                        </TableCell>
                    </TableRow>)
                })}
            </TableBody>
        </Table>
        </div>
        )
    }
    return (datasetId && datasetDetail ? <BaseSettingComponent
        activeMenu='datasets'
        isLoading={false}
        title={renderTitle()}
    >
        {
            datasetDetail && keysDisplay && keysDisplay.length > 0 && keysDisplay.map(key => {
                if (!key || !datasetDetail[key]) return <></>
                return (
                    <div style={{ display: 'flex', marginBottom: '6px' }}>
                        <div className={classes.userDataKey}>{`${key} : `}</div>
                        <div style={{ fontSize: '14px', color: '#5e737d' }}>{datasetDetail[key]}</div>
                    </div>
                )
            })
        }
        {renderResourceInfo()}
        {renderProvenanceModel()}
        {renderHistoryInfo()}
    </BaseSettingComponent> : <></>)
}
export default withStyles(styles, { withTheme: true })(DatasetDetail);
