import { withStyles } from '@material-ui/core/styles';
import BaseSettingComponent from '../BaseSettingComponent';
import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { OutlinedInput } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InfoIcon from '@material-ui/icons/Info'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import IconButton from '@material-ui/core/IconButton';
import AddNewResourceDialog from './AddNewResourceDialog';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from "react-router";

import uuidv4 from 'uuid/v4'
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import { createNewDataset, clearMessage, getDatasetDetailForEdit, updateDataset } from '../../sagas/createNewDataset/create-new-dataset.actions'
import moment from 'moment';
import Popover from '@material-ui/core/Popover'
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomSnackBarContent from '../Common/CustomSnackBarContent';

const styles = {
    headCell: {
        fontWeight: 'bold',
        color: 'rgb(94, 115, 125)'
    }
}

function CreateNewDataset(props) {
    const { location, classes, history } = props
    const { userData } = useSelector(state => state.login && state.login.userInfo)
    const isCreating = useSelector(state => state.createDataset && state.createDataset.loading && state.createDataset.loading.isCreating)
    const isLoadingDetail = useSelector(state => state.createDataset && state.createDataset.loading && state.createDataset.loading.isLoadingDetail)
    const currentDataset = useSelector(state => state.createDataset && state.createDataset.dataset)


    const { errorMessage, successMessage } = useSelector(state => state.createDataset && state.createDataset)
    const [id, setId] = useState(undefined)
    const [title, setTitle] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [tags, setTags] = useState(undefined)
    const [source, setSource] = useState(undefined)
    const [version, setVersion] = useState(undefined)
    const [author, setAuthor] = useState(undefined)
    const [authorEmail, setAuthorEmail] = useState(undefined)
    const [maintainerEmail, setMaintainerEmail] = useState(undefined)
    const [maintainer, setMaintainer] = useState(undefined)
    const [licenseId, setLicenseId] = React.useState('cc-by');
    const [openAddResource, setOpenAddResource] = useState(false)
    let dispatch = useDispatch()
    const [resources, setResources] = useState([])
    const [addResources, setAddReSources] = useState([])
    const [deleteResources, setDeleteResources] = useState([])
    const [updateResources, setUpdateResources] = useState([])

    const [currentEditResource, setCurrentEditResource] = useState(undefined)


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
    const datasetId = getQueryVariable('datasetId')
    useEffect(() => {
        setName(title && title.replace(/\s/g, "-"))
    }, [title])

    useEffect(() => {
        setId(uuidv4())
    }, [])
    useEffect(() => {
        if (datasetId) {
            dispatch(getDatasetDetailForEdit({ datasetId }))
        }
    }, [datasetId])
    useEffect(() => {
        if (currentDataset && datasetId) {
            //             created: 1571469127192
            // createdBy: "69:32:89:5F:37:4B:7E:4F:4A:92:6E:3C:DF:A8:DD:5F:2A:38:8A:51"
            // creator_user_id: "a8e59b95-e8d5-4e9e-b2a6-69ab053fbcb1"
            // extras: []
            // id: "0ab11f21-1031-4ff0-8f8b-fb6cd18a64ee"
            // license_id: "cc-by"
            // modified: 1571469127191
            // modifiedBy: "69:32:89:5F:37:4B:7E:4F:4A:92:6E:3C:DF:A8:DD:5F:2A:38:8A:51"
            // name: "blank-dataset"
            // resources: []
            // source: "http://localhost:5000"
            // state: "draft"
            // tags: []
            // title: "blank dataset"
            // type: "dataset"
            setId(currentDataset.id)
            setName(currentDataset.name)
            setLicenseId(currentDataset.license_id)
            setTitle(currentDataset.title)
            setResources(currentDataset.resources)
        }
    }, [currentDataset])

    const renderAddingResourceSection = () => {
        console.log('=========== delete', deleteResources)
        console.log('=========== add', addResources)
        console.log('=========== update', updateResources)


        var combineArray = addResources.concat(updateResources)
        let combineArrayId = combineArray.map(r => r.id).concat(deleteResources.map(r => r.id))

        let newResources = resources.filter(r => !combineArrayId.includes(r.id))
        combineArray = combineArray.concat(newResources).sort(r => r.id)
        console.log('==== combineArray ', combineArray)
        // name, description format
        return <div style={{ marginTop: '20px' }}>
            <div
                style={{
                    color: '#5e737d',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'rows',
                    alignItems: 'center'
                }}>
                <div>Resources</div>
                <IconButton onClick={() => { setOpenAddResource(true) }} style={{ marginLeft: '20px', color: 'rgb(33, 150, 243)' }}> <LibraryAddIcon /></IconButton>
            </div>
            {combineArray && combineArray.length > 0 && <div>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headCell}>Name</TableCell>
                            <TableCell className={classes.headCell} align="left">Size</TableCell>
                            <TableCell className={classes.headCell} align="left">Type</TableCell>
                            <TableCell className={classes.headCell} align="left">Hash</TableCell>
                            <TableCell className={classes.headCell} align="left">  </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {combineArray.map(resource => {
                            return <TableRow key={resource.name}>
                                <TableCell component="th" scope="row">
                                    {resource.name}
                                </TableCell>
                                <TableCell align="left">{resource.size}</TableCell>
                                <TableCell align="left">{resource.format}</TableCell>
                                <TableCell align="left">{resource.file_hash}</TableCell>
                                <TableCell align="left">
                                    <IconButton
                                        onClick={() => {
                                            if (resources.concat(addResources).length < 2) {
                                                return
                                            }
                                            setResources(resources.filter(r => r.id !== resource.id))
                                            let existInAdd = addResources.findIndex(r => r.id === resource.id)
                                            if (existInAdd > 0) {
                                                setAddReSources(addResources.splice(existInAdd, 1))
                                                return
                                            }
                                            let existInUpdate = updateResources.findIndex(r => r.id === resource.id)
                                            if (existInUpdate > 0) {
                                                setUpdateResources(updateResources.splice(existInUpdate, 1))
                                            }
                                            setDeleteResources(deleteResources.concat(resource))
                                        }}
                                        aria-label="delete">
                                        <DeleteIcon style={{ width: '15px', height: '15px', padding: '0px' }} />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setCurrentEditResource(resource)
                                            setOpenAddResource(true)
                                        }}
                                        aria-label="delete">
                                        <EditIcon style={{ width: '15px', height: '15px', padding: '0px' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>

            </div>}
        </div>
    }
    const renderDialog = () => {
        return [<AddNewResourceDialog
            open={!!openAddResource}
            resource={currentEditResource}
            maxWidth={true}
            onComplete={(metadata) => {
                let newResource = { ...metadata, package_id: id }
                if(!newResource.mimetype) {
                    newResource.mimetype = newResource.format
                }
                if(!newResource.url) {
                    newResource.url = 'defined later'
                }
                if (!newResource.id) {
                    setAddReSources(addResources.concat({ ...newResource, id: uuidv4() }))
                } else {
                    let existAddIndex = addResources.findIndex(r => r.id === newResource.id)
                    if (existAddIndex < 0) {
                        let existUpdateIndex = updateResources.findIndex(r => r.id === newResource.id)
                        if (existUpdateIndex > 0) {
                            let newUpdatedArray = updateResources
                            newUpdatedArray[existUpdateIndex] = newResource
                            setUpdateResources(newUpdatedArray)
                            return
                        } else {
                            setUpdateResources(updateResources.concat(newResource))
                        }
                    } else {
                        addResources[existAddIndex] = newResource
                        setAddReSources(addResources)
                    }
                }
                //setResources(resources.concat({ ...metadata, package_id: id }))
            }}
            onClose={() => {
                setOpenAddResource(false)
                setCurrentEditResource(undefined)
            }}
        />]
    }

    const renderSubTitle = () => {
        return <Breadcrumbs aria-label="breadcrumb">
            <Link
                color="primary"
                onClick={() => {
                    return <Redirect to={'/datasets'} />
                    //history.push(`/datasets`)
                }}
                style={{ fontSize: '14px' }}>
                Datasets
    </Link>
            <Typography color="textPrimary" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>{datasetId ? "Edit dataset" : "Create new"}</Typography>
        </Breadcrumbs>
    }

    const renderMessage = () => {
        if (errorMessage || successMessage) {
            return <CustomSnackBarContent
                open={!!errorMessage || !!successMessage}
                variant={errorMessage ? 'error' : 'success'}
                message={errorMessage || successMessage}
                onClose={() => {
                    dispatch(clearMessage())
                    if (successMessage) {
                        history.push(`/datasets`)
                    }
                }}
            />
        }
    }

    const renderLicenseSelect = () => {
        return <Select
            value={licenseId}
            onChange={(event) => {
                setLicenseId(event.target.value);
            }}

            input={<OutlinedInput name="age" fullWidth id="age-customized-select" />}
        >
            <MenuItem value={'cc-by'}>Creative Commons Attribution</MenuItem>
            <MenuItem value={'cc-by-sa'}>Creative Commons Attribution Share-Alike</MenuItem>
            <MenuItem value={'cc-zero'}>Creative Commons CCZero</MenuItem>
            <MenuItem value={'cc-nc'}>Creative Commons Non-Commercial (Any)</MenuItem>
            <MenuItem value={'gfdl'}>GNU Free Documentation License</MenuItem>
            <MenuItem value={'notspecified'}>License not specified</MenuItem>
            <MenuItem value={'odc-by'}>Open Data Commons Attribution License</MenuItem>
            <MenuItem value={'odc-odbl'}>Open Data Commons Open Database License (ODbL)</MenuItem>
            <MenuItem value={'other-at'}>Other (Attribution)</MenuItem>
            <MenuItem value={'other-nc'}>Other (Non-Commercial)</MenuItem>
            <MenuItem value={'other-closed'}>Other (Not Open)</MenuItem>
            <MenuItem value={'other-open'}>Other (Open)</MenuItem>
            <MenuItem value={'other-pd'}>Other (Public Domain)</MenuItem>
            <MenuItem value={'uk-ogl'}>UK Open Government Licence (OGL)</MenuItem>
        </Select>
    }


    const disabledSubmit = () => {
        if (currentDataset && datasetId) {
            return (name === currentDataset.name && licenseId === currentDataset.license_id && currentDataset.title === title) && (addResources.length < 1 && deleteResources.length < 1 && updateResources.length < 1)
        }
        return addResources.length < 1 || !title
    }

    return (<BaseSettingComponent
        activeMenu='datasets'
        isLoading={false}
        title={datasetId ? 'Edit dataset' : 'Create new dataset'}
        subTitle={renderSubTitle()}
    >
        <Paper style={{ boxShadow: 'none', minHeight: '500px', padding: '20px' }}>
            {renderMessage()}
            {(isCreating || isLoadingDetail) && <Popover
                open={true}
                style={{ backgroundColor: 'rgb(0,0,0,0.5)' }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <CircularProgress style={{ backgroundColor: 'transparent' }} />
            </Popover>}
            <div>
                <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Title</div>
                <div style={{ marginTop: '9px' }}><OutlinedInput
                    fullWidth
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }} /></div>
            </div>
            {title && <div style={{ marginTop: '9px' }}>
                <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Name</div>
                <div style={{ marginTop: '9px', fontSize: '12px' }}>{name}</div>
            </div>}
            <div style={{ marginTop: '9px' }}>
                <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Description</div>
                <div style={{ marginTop: '9px' }}>
                    <OutlinedInput
                        fullWidth
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }}
                    />
                </div>
                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Tags</div>
                    <div style={{ marginTop: '9px' }}><OutlinedInput fullWidth onChange={(event) => {
                        setTags(event.target.value)
                    }} /></div>
                </div>

                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>License</div>
                    <div style={{ marginTop: '9px', display: 'flex' }}>
                        {renderLicenseSelect()}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '20px'
                        }}>
                            <InfoIcon style={{ width: '10px', height: '10px', color: '#aaaaaa' }} />
                            <div style={{ fontSize: '10px', color: '#aaaaaa', marginLeft: '10px' }}>License definitions and additional information can be found at <a style={{ color: '#aaaaaa' }} href="http://opendefinition.org/licenses/">opendefinition.org</a></div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Source</div>
                    <div style={{ marginTop: '9px' }}><OutlinedInput fullWidth onChange={(event) => {
                        setSource(event.target.value)
                    }} /></div>
                </div>
                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Version</div>
                    <div style={{ marginTop: '9px' }}><OutlinedInput fullWidth onChange={(event) => {
                        setVersion(event.target.value)
                    }} /></div>
                </div>

                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Author</div>
                    <div style={{ marginTop: '9px' }}><OutlinedInput fullWidth onChange={(event) => {
                        setAuthor(event.target.value)
                    }} /></div>
                </div>
                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Author Email</div>
                    <div style={{ marginTop: '9px' }}><OutlinedInput fullWidth onChange={(event) => {
                        setAuthorEmail(event.target.value)
                    }} /></div>
                </div>
                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Maintainer</div>
                    <div style={{ marginTop: '9px' }}><OutlinedInput fullWidth onChange={(event) => {
                        setMaintainer(event.target.value)
                    }} /></div>
                </div>
                <div style={{ marginTop: '9px' }}>
                    <div style={{ color: '#5e737d', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>Maintainer Email</div>
                    <div style={{ marginTop: '9px' }}><OutlinedInput fullWidth onChange={(event) => {
                        setMaintainerEmail(event.target.value)
                    }} /></div>
                </div>
                {renderAddingResourceSection()}
                {renderDialog()}
                <div style={{ marginTop: '9px' }}>
                    <p style={{ fontSize: '10px', color: '#707070' }}>The <i>data license</i> you select above only applies to the contents
              of any resource files that you add to this dataset. By submitting
          this form, you agree to release the <i>metadata</i> values that you enter into the form under the
          <a style={{ color: '#aaaaaa' }} href="http://opendatacommons.org/licenses/odbl/1-0/"> Open Database License</a>.</p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0px' }}>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={() => {

                        let unchange = []
                        if (currentDataset && datasetId) {
                            let combineList = addResources.concat(updateResources).concat(deleteResources)
                            let combineListID = combineList && combineList.length > 0 ? combineList.map(r => r.id) : []
                            unchange = combineListID && combineListID.length > 0 ? resources.filter(r => !combineListID.includes(r.id)) : resources
                        }
                        console.log('==== userData.id', userData.id)
                        const datasetInfo = {
                            license_id: licenseId,
                            type: 'dataset',
                            tag_string: tags,
                            creator_user_id: userData.id,
                            id, state: 'active',
                            version,
                            maintainer,
                            name,
                            title,
                            author,
                            author_email: authorEmail,
                            notes: description,
                            'resources': currentDataset && datasetId ? {
                                add: addResources,
                                update: updateResources,
                                delete: deleteResources,
                                unchange: unchange
                            } : addResources
                        }
                        dispatch(currentDataset && datasetId ? updateDataset({ datasetInfo }) : createNewDataset({ datasetInfo }))
                    }}
                    disabled={disabledSubmit()}
                    color="primary">
                    Submit
        </Button>
            </div>
        </Paper>
    </BaseSettingComponent >)
}
export default withStyles(styles, { withTheme: true })(CreateNewDataset);
