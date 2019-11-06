import React from 'react'
import Button from '@material-ui/core/Button'
import Dropzone from "react-dropzone";
import './../../styles/components/Common/imagePicker.scss'
class ImagePicker extends React.Component {
    handleChange = (file) => {
        this.props.onChange(file)
    };

    render() {
        return (
            <Dropzone
                onDrop={this.handleChange}>
                {({ getRootProps, getInputProps }) => (
                    <section className='image-picker-section'>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {this.props.value ? <Button
                                className='file-name-display-section' component="span">
                                <img
                                    style={{ padding: '5px' }}
                                    alt=""
                                    src={require("./../../images/baseline-image-24-px.png")}
                                />
                                <div className={'image-name'}>{this.props.value}</div>
                            </Button> :
                                <div className='drop-file-section'>
                                    <div className='choose-image-label'>Choose Image</div>
                                    <div className='sub-label'>{this.props.subTitle}</div>
                                </div>
                            }
                        </div>
                    </section>
                )}
            </Dropzone>
        )
    }
}

export default ImagePicker