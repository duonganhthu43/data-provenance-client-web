import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomDialog from '../Common/CustomDialog';
import { useSelector, useDispatch } from 'react-redux'
import { getUserByFingerPrint } from '../../sagas/userInfo/userInfoActions'
import CircularProgress from '@material-ui/core/CircularProgress';

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
function CertifierDialog(props) {
  const { classes, onClose, data, open, ...others } = props
  let dispatch = useDispatch()
  let loadingCertifier = useSelector(state => state.userInfo && state.userInfo.loading && state.userInfo.loading.loadingCertifier)
  let currentCertifier = useSelector(state => state.userInfo && state.userInfo.loading && state.userInfo.currentCertifier)
  useEffect(() => {
    if (data && open) {
      dispatch(getUserByFingerPrint({ fingerprint: data }))
    }
  }, data)
  const handleClose = () => {
    onClose();
  };

  const renderCertifierInfo = () => {
    const keysDisplay = ['id', 'name', 'fullname', 'email', 'apikey', 'state', 'source', 'sysadmin']

    return <>
      {
        currentCertifier && keysDisplay && keysDisplay.length > 0 && keysDisplay.map(key => {
          if (!key || !currentCertifier[key]) return <></>
          return (
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div className={classes.userDataKey}>{`${key} : `}</div>
              <div style={{ fontSize: '14px', color: '#5e737d' }}>{currentCertifier[key]}</div>
            </div>
          )
        })
      }
      {currentCertifier && currentCertifier.userData && <div style={{ display: 'flex', marginBottom: '6px' }}>
        <div className={classes.userDataKey}>{`${'User type'} : `}</div>
        <div style={{ fontSize: '14px', color: '#5e737d' }}>{currentCertifier.userData.user_type}</div>
      </div>}
    </>
  }
  return <CustomDialog
    onClose={handleClose}
    title={<div className='certifier-user-dialog-title'>Certifier detail</div>}
    open={open}
    {...others}
  >
    {loadingCertifier && <CircularProgress />}
    {!loadingCertifier && renderCertifierInfo()}
  </CustomDialog>
}

export default withStyles(styles, { withTheme: true })(CertifierDialog);
