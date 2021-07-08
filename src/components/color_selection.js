import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { RgbaColorPicker} from 'react-colorful';
import colorwheel from '../resources/colorwheel3.png';


class ColorSelection extends Component {
  changeColor = (event) =>{
    console.log(event.target);
    this.props.callback(event)
  }
  render(){
    return (
      <div id={'color-selection'} className={'   '} >
        <img src={colorwheel}  alt={'Colorwheel with 6 different colors'} />
        <div className={'color-selector'} >
          <RgbaColorPicker color={this.props.color} onChange={this.changeColor} />



        </div >
      </div >
    )
  }
}

ColorSelection.propTypes = {
  callback: PropTypes.func.isRequired,
}

export default ColorSelection;
