import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

export default function Notifications(props) {
    return (
        <SvgIcon {...props}>
            <path
                d="M6.5 16c.894 0 1.625-.738 1.625-1.641h-3.25c0 .903.723 1.641 1.625 1.641zm4.875-4.923V6.974c0-2.519-1.332-4.627-3.656-5.185V1.23C7.719.55 7.174 0 6.5 0S5.281.55 5.281 1.23v.559c-2.332.558-3.656 2.658-3.656 5.185v4.103L0 12.717v.821h13v-.82l-1.625-1.641z"
            />
        </SvgIcon>
    );
}