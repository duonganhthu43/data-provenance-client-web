import React from 'react'
import { SketchPicker } from 'react-color';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import './../../styles/components/Common/colorPicker.scss'

class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
            }
        };
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.props.onChange(color)
        this.setState({ color: color.rgb })
    };

    render() {
        return (
            <div className='color-picker-section'>
                <div className='swatch-display-section' onClick={this.handleClick}>
                    <div className='color' style={{ backgroundColor: this.props.value }} />
                    <div className='color-code'>{this.props.value}</div>
                    <div >
                        <Avatar style={{ width: '14px', height: '14px' }} src={require("./../../images/colorPalette.png")} >
                            <PageviewIcon />
                        </Avatar>
                    </div>
                </div>
                {this.state.displayColorPicker ? <div className='pop-over'>
                    <div className='cover' onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                </div> : null}

            </div>
        )
    }
}

export default ColorPicker