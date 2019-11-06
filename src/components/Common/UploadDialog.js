import React from "react";
import Grid from "@material-ui/core/Grid/index";
import Button from "@material-ui/core/Button/index";
import TextField from "@material-ui/core/TextField/index";
import CustomDialog from "./CustomDialog";

const UploadDialog =  (props) => {
  const [file, setFile] = React.useState(undefined);

  function close() {
    props.onClose();
    setFile(undefined)
  }

  return (
    <CustomDialog
      onClose={close}
      title="Upload"
      open={props.open}
    >
      <Grid container spacing={16}>
        {
          props.template && <Grid item xs={12}>
            <div>
              <a href={props.template} style={{textDecoration: 'none',}}>Download template</a>
            </div>
          </Grid>
        }
        <Grid item xs={12}>
          <div>
            <TextField
              fullWidth
              variant="outlined"
              margin="none"
              onChange={(event) => setFile(event.target.files[0])}
              type="file"
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              props.onUpload(file);
              close()
            }}
            style={{float: "right",
            width: '96px',
            height: '30px',
            borderRadius: '4px',
            fontSize: '13px',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            boxShadow: 'none',
            marginTop: '15px'
            }}
            className='save-btn'
            disabled={!file}
          >
            UPLOAD
          </Button>
        </Grid>
      </Grid>
    </CustomDialog>
  )
};

export default  UploadDialog

