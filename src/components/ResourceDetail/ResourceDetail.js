
import React, { useState, useEffect } from 'react';
import BaseSettingComponent from '../BaseSettingComponent';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getResourceDetailByIdRequest, cleanupResourceDetail, getProvenanceByFormat, getResourceDetailProvenanceByIdRequest, getResourceDetailHistoryByIdRequest, getProvN } from '../../sagas/resource-detail/resource-detail.actions'
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

function ResourceDetail(props) {
    const { location, history, classes } = props
    const dispatch = useDispatch()
    const [provenanceExpanded, setProvenanceExpanded] = React.useState(false);
    let resourceDetail = useSelector(state => state.resourceDetail && state.resourceDetail.resource)
    let resourceDetailProvenance = useSelector(state => state.resourceDetail && state.resourceDetail.provenance)
    let resourceHistory = useSelector(state => state.resourceDetail && state.resourceDetail.history)
    const maxSteps = resourceHistory ? resourceHistory.length : 0;

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
    // let datasetDetail = useSelector(state => state.datasetDetail && state.datasetDetail.dataset)
    // let datasetHistory = useSelector(state => state.datasetDetail && state.datasetDetail.history)
    // const maxSteps = datasetHistory ? datasetHistory.length : 0;

    const resourceId = getQueryVariable('resourceId')
    useEffect(() => {
        dispatch(getResourceDetailByIdRequest({ resourceId }))
        dispatch(getResourceDetailProvenanceByIdRequest({ resourceId }))
        dispatch(getResourceDetailHistoryByIdRequest({ resourceId }))
        return () => {
            dispatch(cleanupResourceDetail())
        };

    }, [resourceId])

    const renderTitle = () => {
        return <div style={{ display: 'flex' }}>
            <Link
                onClick={() => {
                    history.push(`/dataset`)
                }}>Dataset Info</Link>
            <div style={{ marginLeft: '5px', marginRight: '5px' }}>/</div>
            <div>Resource Detail</div>
        </div>
    }
    const keysDisplay = ['id', 'name', 'state', 'file_hash', 'size', 'format', 'type', 'url_type', 'package_id', 'modifiedBy', 'file_path']
    
    
    const renderHistoryInfo = () => {
        return resourceHistory && resourceHistory.length > 0 && (<>
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
                        <PrettyJson json={resourceHistory && resourceHistory[activeStep]} onError={console.error} />
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

    const renderProvenanceModel = () => {
        return resourceDetailProvenance && (
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
                                    newWindow.document.write(resourceDetailProvenance.imageData);
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
                        {currentViewFormat === 'json' && <PrettyJson json={resourceDetailProvenance && resourceDetailProvenance[currentViewFormat]} onError={console.error} />}
                        {currentViewFormat !== 'json' &&
                            <Typography style={{ marginTop: '10px', overflow: 'scroll', padding: '10px 20px', fontFamily: 'monospace', backgroundColor: 'ghostwhite', border: '1px solid silver' }} paragraph>
                                {resourceDetailProvenance[currentViewFormat]}
                            </Typography>
                        }
                    </CardContent>
                </Collapse> </>)

    }
    return resourceId && resourceDetail ? <BaseSettingComponent
        activeMenu='datasets'
        isLoading={false}
        title={renderTitle()}>
        {
            resourceDetail && keysDisplay && keysDisplay.length > 0 && keysDisplay.map(key => {
                if (!key || !resourceDetail[key]) return <></>
                return (
                    <div style={{ display: 'flex', marginBottom: '6px' }}>
                        <div className={classes.userDataKey}>{`${key} : `}</div>
                        <div style={{ fontSize: '14px', color: '#5e737d' }}>{resourceDetail[key]}</div>
                    </div>
                )
            })
        }
        {renderProvenanceModel()}
        {renderHistoryInfo()}

    </BaseSettingComponent> : <></>
}
export default withStyles(styles, { withTheme: true })(ResourceDetail);
