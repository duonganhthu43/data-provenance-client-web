import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

export default function Dashboard(props) {
    return (
        <SvgIcon {...props}>
            <path d="M0 8.333h6.667V0H0v8.333zM0 15h6.667v-5H0v5zm8.333 0H15V6.667H8.333V15zm0-15v5H15V0H8.333z" />
        </SvgIcon>
    );
}