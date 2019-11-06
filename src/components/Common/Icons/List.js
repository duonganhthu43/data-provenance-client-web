import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

export default function List(props) {
    return (
        <SvgIcon {...props}>
            <path
                d="M12.8 2.2v11.2H1.6V2.2h11.2zm.88-1.6H.72C.32.6 0 .92 0 1.32v12.96c0 .32.32.72.72.72h12.96c.32 0 .72-.4.72-.72V1.32c0-.4-.4-.72-.72-.72zM6.4 3.8h4.8v1.6H6.4V3.8zm0 3.2h4.8v1.6H6.4V7zm0 3.2h4.8v1.6H6.4v-1.6zM3.2 3.8h1.6v1.6H3.2V3.8zm0 3.2h1.6v1.6H3.2V7zm0 3.2h1.6v1.6H3.2v-1.6z"
            />
        </SvgIcon>
    );
}