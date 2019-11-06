import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import NotificationsIcon from './Icons/Notifications'
import IconButton from '@material-ui/core/IconButton';
import querryString from 'query-string'
import { IncludeURL } from './Utitlities'


const styles = theme => ({
    primary: {
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 'normal',
    },
    rootIconButton: {
        fontSize: '0px'
    }
})
export const ACTIVITY_TYPES = {
    DRIVER_REPORTED_TASK: 'driver_reported_task',
    DRIVER_REJECTED_TASK_GROUP: 'driver_rejected_task_group',
    PARTNER_REPORTED_ITEM: 'partner_reported_item',
    PARTNER_REJECTED_TRANSFER: 'partner_rejected_transfer',
    COMPANY_CREATED_TRANSFER: 'company_created_transfer',
    COMPANY_SENT_PARTNERSHIP_INVITATION: 'company_sent_partnership_invitation',
    COMPANY_ACCEPTED_PARTNERSHIP_INVITATION: 'company_accepted_partnership_invitation',
    COMPANY_REJECTED_PARTNERSHIP_INVITATION: 'company_rejected_partnership_invitation',
    BROADCAST_TIMEOUT: 'broadcast_timeout',
};

class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            anchorEl: null,
            notificationsCount: undefined
        };
    }
    componentDidMount() {
        window.addEventListener('message', this.handleFrameTasks, true);
    }
    componentWillUnmount() {
        window.removeEventListener('message', this.handleFrameTasks, true);
    }

    handleFrameTasks = (e) => {
        if (!e || !e.data || !e.data.type || !this._iframe || !e.origin) { return; }
        if (this._iframe.src.startsWith(e.origin)) {
            switch (e.data.type) {
                case 'FRAME_LISTENING':
                    const { id, socketToken, company } = this.props;
                    this._iframe.contentWindow.postMessage({
                        type: 'SUBSCRIBE_NOTIFICATIONS',
                        userId: id,
                        socketToken,
                        slug: company && company.slug,
                    }, '*');
                    break;
                case 'CHANGED_UNSEEN_COUNT':
                    this.setState({ notificationsCount: e && e.data && e.data.unseen_count })
                    break;
                case 'CLOSE_NOTIFICATIONS':
                    this.setState({ open: false })
                    break;
                case 'REDIRECT_NOTIFICATION': {
                    if (!e || !e.data || !e.data.notification_type) { return; }
                    switch (e.data.notification_type) {
                        case ACTIVITY_TYPES.DRIVER_REJECTED_TASK_GROUP: {
                            if (!e.data.payload.associated_task_group_ids) { return; }
                            window.location.assign(`/items/all?${querryString.stringify({ associated_task_group_ids: e.data.payload.associated_task_group_ids })}`)
                            break;
                        }
                        case ACTIVITY_TYPES.PARTNER_REPORTED_ITEM: {
                            if (!e.data.payload.order_item_tracking_number) { return; }
                            window.location.assign(`/items/all?${querryString.stringify({ order_item_tracking_number: e.data.payload.order_item_tracking_number })}`)
                            break;
                        }
                        case ACTIVITY_TYPES.BROADCAST_TIMEOUT: {
                            if (!e.data.payload.order_item_ids) { return; }
                            window.location.assign(`/items/all?${querryString.stringify({ order_item_ids: e.data.payload.order_item_ids })}`)
                            break;
                        }
                        case ACTIVITY_TYPES.COMPANY_CREATED_TRANSFER: {
                            if (!e.data.payload.order_number) { return; }
                            window.location.assign(`/orders?${querryString.stringify({ order_number: e.data.payload.order_number })}`)
                            break;
                        }
                        case ACTIVITY_TYPES.DRIVER_REPORTED_TASK: {
                            if (!e.data.payload.order_item_ids) { return; }
                            window.location.assign(`/items/all?${querryString.stringify({ order_item_ids: e.data.payload.order_item_ids })}`)
                            break;
                        }
                        case ACTIVITY_TYPES.COMPANY_ACCEPTED_PARTNERSHIP_INVITATION:
                        case ACTIVITY_TYPES.COMPANY_REJECTED_PARTNERSHIP_INVITATION:
                        case ACTIVITY_TYPES.COMPANY_SENT_PARTNERSHIP_INVITATION: {
                            window.location.assign('/partners')
                            break;
                        }
                        default:

                    }
                    break;
                }
                default:

            }
        }

    }

    resetUnseenCount = () => {
        const { notificationsCount } = this.state
        if (this._iframe && notificationsCount && notificationsCount > 0) {
            const { id, socketToken, company } = this.props;
            this._iframe.contentWindow.postMessage({
                type: 'RESET_UNSEEN_COUNT',
                userId: id,
                socketToken,
                slug: company && company.slug,
            }, '*');
        }
        return;
    }


    handleClose = () => {
        this.setState(state => ({ open: false }));
    };
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };
    handleClick = (event) => {
        const { currentTarget } = event;
        this.resetUnseenCount()
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open
        }));
    };
    render() {
        const { classes } = this.props
        const { open, anchorEl, notificationsCount } = this.state;
        return (<div style={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
                onClick={this.handleClick}
                classes={{ root: classes.rootIconButton }}
            >
                <div>
                    <NotificationsIcon style={{ color: this.props.header_cta_color, fontSize: '16px' }} viewBox='0 0 20 20' />
                    {notificationsCount && notificationsCount > 0 && <div style={{
                        color: 'white',
                        backgroundColor: 'red',
                        fontSize: '9.3px',
                        fontFamily: 'Arial',
                        borderRadius: '7px',
                        position: 'absolute',
                        width: '14px',
                        height: '14px',
                        top: '7px',
                        right: '7px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <span>{notificationsCount > 99 ? '99+' : notificationsCount}</span>
                    </div>}
                </div>
            </IconButton>
            <Popper open={true}
                placement='bottom-end'
                anchorEl={anchorEl}
                style={{ display: open ? 'block' : 'none' }}
                disablePortal>
                <iframe
                    title={'notifications'}
                    style={{ height: '430px' }}
                    ref={(f) => { this._iframe = f; }}
                    src={`${IncludeURL}/notifications`}
                ></iframe>
            </Popper>
        </div>)
    }
}

const mapStateToProps = (state) => {
    const { accountInfo } = state.login
    const { id, socketToken, company } = accountInfo && accountInfo.dispatcher_info
    const header_cta_color = state.company &&
        state.company.companyData &&
        state.company.companyData.settings &&
        state.company.companyData.settings.branding.header_cta_color
    return {
        id, socketToken, company, header_cta_color
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
        },
    }
};
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Notifications))