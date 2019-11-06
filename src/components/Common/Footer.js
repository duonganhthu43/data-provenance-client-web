import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
    footer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
    }
}

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updated: false,
        };
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} style={styles.footer}>
                    <Typography variant="caption" gutterBottom align="center">
                        © {(new Date()).getFullYear()} DUONG ANH THU ALL RIGHTS RESERVED
                    </Typography>
                </Grid>
            </Grid>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer))
