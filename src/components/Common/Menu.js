import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { withStyles } from '@material-ui/core/styles'
import "../../styles/components/Common/menu.scss";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import UsersIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/PersonOutline'
import FolderIcon from '@material-ui/icons/Folder'
import PermDataSetting from '@material-ui/icons/PermDataSetting'
import FolderSharedIcon from '@material-ui/icons/FolderSharedOutlined'

import LoginUser from  './LoginUser'
const styles = {
  rootMenuItem: {

    color: 'rgb(238, 238, 238)',
    fontWeight: 'normal',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '24px',
    paddingRight: '20px'
  },
  selectedMenuItem: {
    backgroundColor: 'rgb(16, 21, 28)',
    color: 'rgb(238, 238, 238)',
    borderRadius: 4,
    fontWeight: 'bold',

  },
  selectedLink: {
    // color: 'white'
  },
  normalLink: {
    // color: '#5e737d'
  },
  menuText: {
    color: 'white'
  },
  subMenuText: {
    color: 'white',
    fontSize: '14px'
  }
}

function Menu(props) {
  const { active, classes } = props;
  const [openUsers, setOpenUsers] = useState(false)
  const [openDatasets, setOpenDatasets] = useState(false)

  const renderMenuItem = ({ displayName, key, selected, classes, icon }) => {
    return (<Link
      component="button"
      key={key}
      style={{ textDecoration: 'none' }}
      to={`/${key}`}
    >
      <MenuItem
        classes={{
          root: classes.rootMenuItem,
          selected: classes.selectedMenuItem
        }}
        selected={selected}
      >
        <div style={{ color: 'rgb(238, 238, 238)' }}>{icon}</div>
        <div style={{ padding: '0 16px' }}>{displayName}</div>
      </MenuItem>
    </Link>);
  }

  return (
    <div style={{ backgroundColor: 'rgb(27, 36, 48)', width: '259px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
      <div style={{ height: '56px', color: 'white', backgroundColor: 'rgb(35, 47, 62)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PermDataSetting style={{ color: 'rgb(33, 150, 243)' }} />
        <div style={{ textTransform: 'uppercase', fontWeight: 'bold', marginLeft: '10px' }}>Data Provenance</div>
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >

        <ListItem button onClick={() => { setOpenUsers(!openUsers) }}>
          <ListItemIcon>
            <UsersIcon style={{ color: 'rgb(238, 238, 238)' }} />
          </ListItemIcon>
          <ListItemText primary="Users Info" classes={{ primary: classes.menuText }} />
          {openUsers ? <ExpandLess style={{ color: 'rgb(238, 238, 238)' }} /> : <ExpandMore style={{ color: 'rgb(238, 238, 238)' }} />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" style={{ marginLeft: '20px' }} disablePadding>
            <Link
              component="button"
              key={'user-info'}
              style={{ textDecoration: 'none' }}
              to={`/${'user-info'}`}
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <PersonIcon style={{ color: 'rgb(238, 238, 238)' }} />
                </ListItemIcon>
                <ListItemText primary="Current User" classes={{ primary: classes.subMenuText }} />
              </ListItem>
            </Link>
          </List>

        </Collapse>
        <ListItem button onClick={() => { setOpenDatasets(!openDatasets) }}>
          <ListItemIcon>
            <FolderIcon style={{ color: 'rgb(238, 238, 238)' }} />
          </ListItemIcon>
          <ListItemText primary="Datasets" classes={{ primary: classes.menuText }} />
          {openDatasets ? <ExpandLess style={{ color: 'rgb(238, 238, 238)' }} /> : <ExpandMore style={{ color: 'rgb(238, 238, 238)' }} />}
        </ListItem>
        <Collapse in={openDatasets} timeout="auto" unmountOnExit>
          <List component="div" style={{ marginLeft: '20px' }} disablePadding>
            <Link
              component="button"
              key={'datasets'}
              style={{ textDecoration: 'none' }}
              to={`/${'datasets'}`}
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FolderSharedIcon style={{ color: 'rgb(238, 238, 238)' }} />
                </ListItemIcon>
                <ListItemText primary="Current User's datasets" classes={{ primary: classes.subMenuText }} />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
      </div>
      <div><LoginUser></LoginUser></div>
    </div>
  )

}

const mapStateToProps = (state) => {
  const location = state && state.router && state.router.location
  return {
    pathname: location.pathname
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Menu))
