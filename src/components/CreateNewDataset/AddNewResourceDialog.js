import { withStyles } from '@material-ui/core/styles';
import React, { useState, useCallback, useEffect } from 'react';
import CustomDialog from '../Common/CustomDialog';
import { OutlinedInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import DeleteIcon from '@material-ui/icons/Delete';
import CryptoES from 'crypto-es'
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment'
import uuidv4 from 'uuid/v4'

const styles = {
  zone: {
    border: '1px dotted grey',
    padding: "10px 10px",
    minHeight: '20px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  sectionTitle: {
    color: '#5e737d',
    fontSize: '13px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  section: {
    marginBottom: '10px'
  },
  sectionHorizontal: {
    marginBottom: '10px', display: 'flex', flexDirection: 'rows'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0px'
  },
  sectionTextContent: {
    fontSize: '13px',
    color: 'rgb(85, 85, 85)',
    marginLeft: '20px'
  }
}

function MyDropzone(props) {
  const { classes } = props
  const [fileInfo, setFileInfo] = useState(undefined)
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {

      // Do whatever you want with the file contents
      const binaryStr = reader.result
      const words = CryptoES.lib.WordArray.create(binaryStr);

      const hashFile = CryptoES.MD5(words).toString()
      const { lastModified, lastModifiedDate, name, size, type } = acceptedFiles[0]
      setFileInfo({ lastModified, lastModifiedDate, name, size, type, file_hash: hashFile, file: acceptedFiles[0] })
      if (props.onDrop) {
        props.onDrop({ url_type: 'upload', last_modified: lastModified, lastModifiedDate, name, size, minetype: type, format: type, file_hash: hashFile })
      }
    }
    acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}
      className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
      style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
      {!fileInfo && <><input {...getInputProps()} />
        <div style={{ fontSize: '13px', textAlign: 'center', color: 'rgba(85, 85, 85, 1)', display: 'flex', flexDirection: 'column' }}>
          <span>Drag and drop file</span>
          <span>or</span>
          <span>Click to upload</span>
        </div> </>}
      {fileInfo && <div style={{ fontSize: '13px', alignItems: 'center', textAlign: 'center', color: 'rgba(85, 85, 85, 1)', display: 'flex', flexDirection: 'row' }}>
        <span>{fileInfo.name}</span>
        <IconButton
          onClick={() => {
            if (props.onDrop) {
              props.onDrop(undefined)
              setFileInfo(undefined)
            }
          }}
          aria-label="delete">
          <DeleteIcon style={{ width: '15px', height: '15px', padding: '0px' }} />
        </IconButton>

      </div>}
    </div>
  )
}

function AddNewResourceDialog(props) {
  const { onClose, onComplete, open, classes, resource,  ...others } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [uploadedFile, setUploadedFile] = useState(undefined)
  // const { lastModified, lastModifiedDate, name, size, type } = acceptedFiles[0]
  useEffect( () => {
    if(resource) {
      setUploadedFile(resource)
      setDescription(resource.description)
      setName(resource.name)
    }
  }, [resource])
  const onDrop = (fileInfo) => {
    setUploadedFile({...uploadedFile, ...fileInfo})
  };


  useEffect(() => {
    if (uploadedFile && uploadedFile.name) {
      setName(uploadedFile.name)
      return
    }
    if (!uploadedFile) {
      setName('')
    }
  }, [uploadedFile])

  const handleClose = () => {
    onClose();
  };

  const renderZone = () => {
    return (
      <div className={classes.zone}>
        <MyDropzone
          onDrop={onDrop}
          classes
        />
      </div>
    );
  };
  return <CustomDialog
    onClose={handleClose}
    title={<div className='certifier-user-dialog-title'>Add Resource</div>}
    open={open}
    {...others}
  >
    <div className={classes.section}>
      <div className={classes.sectionTitle}>Upload</div>
      {renderZone()}
    </div>
    {uploadedFile && uploadedFile.size &&
      <div className={classes.sectionHorizontal}>
        <div className={classes.sectionTitle}>Size</div>
        <div className={classes.sectionTextContent}>{uploadedFile.size}</div>
      </div>
    }
    {uploadedFile && uploadedFile.type &&
      <div className={classes.sectionHorizontal}>
        <div className={classes.sectionTitle}>Type</div>
        <div className={classes.sectionTextContent}>{uploadedFile.type}</div>
      </div>
    }
    {uploadedFile && uploadedFile.lastModified &&
      <div className={classes.sectionHorizontal}>
        <div className={classes.sectionTitle}>Last Modified</div>
        <div className={classes.sectionTextContent}> {moment(uploadedFile.lastModified).format('LLL')}</div>
      </div>
    }
    <div className={classes.section}>
      <div className={classes.sectionTitle}>Name</div>
      <div style={{ marginTop: '9px' }}><OutlinedInput style={{ minWidth: '300px' }} value={name} fullWidth onChange={(event) => {
        setName(event.target.value)
      }} /></div>
    </div>
    <div className={classes.section}>
      <div className={classes.sectionTitle}>Description</div>
      <div style={{ marginTop: '9px' }}><OutlinedInput
        multiline
        rows="4"
        margin="normal"
        fullWidth
        onChange={(event) => {
          setDescription(event.target.value)
        }} /></div>
    </div>
    <div className={classes.actions}>
      <Button
        onClick={() => {
          console.log('====== uploadedFile ', uploadedFile)
//           file_hash: "e234258a0ec76232b07ebd0ac0631d96"
// format: "image/jpeg"
// lastModifiedDate: Fri Oct 18 2019 14:36:37 GMT+0700 (Indochina Time) {}
// last_modified: 1571384197368
// minetype: "image/jpeg"
// name: "tg_image_3145294534.jpeg"
// size: 39945
// url_type: "upload"
          onComplete({ ...uploadedFile, name, description })
          onClose()
          setName('')
          setUploadedFile(undefined)
          setDescription(undefined)
        }}
        disabled={!uploadedFile}
        variant="contained" color="primary">
        {resource ?  'Edit' : 'Add'}
      </Button>
    </div>
  </CustomDialog>
}
export default withStyles(styles, { withTheme: true })(AddNewResourceDialog);
