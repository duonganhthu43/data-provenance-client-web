import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

export default function Item(props) {
    return (
        <SvgIcon {...props}>
            <path
                d="M14.167 8.333H.833A.836.836 0 0 0 0 9.167v5c0 .458.375.833.833.833h13.334a.836.836 0 0 0 .833-.833v-5a.836.836 0 0 0-.833-.834zm-10.834 5c-.916 0-1.666-.75-1.666-1.666 0-.917.75-1.667 1.666-1.667C4.25 10 5 10.75 5 11.667c0 .916-.75 1.666-1.667 1.666zM14.167 0H.833A.836.836 0 0 0 0 .833v5c0 .459.375.834.833.834h13.334A.836.836 0 0 0 15 5.833v-5A.836.836 0 0 0 14.167 0zM3.333 5c-.916 0-1.666-.75-1.666-1.667 0-.916.75-1.666 1.666-1.666.917 0 1.667.75 1.667 1.666C5 4.25 4.25 5 3.333 5z" />
        </SvgIcon>
    );
}