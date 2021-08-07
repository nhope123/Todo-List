import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { RgbaColorPicker} from 'react-colorful';

import {stringToRgbaObject, rgbaColorString, debounce} from '../redux/helper';


class ColorSelection extends Component {

  changeColor = debounce( (color) =>{
    this.props.callback(rgbaColorString(color))
  },20)

  shouldComponentUpdate(nextProps,nextState){
    return ((this.props.color !== nextProps.color) )? true : false;
  }


  render(){
    console.log(JSON.stringify(this.props.color));
    return (
      <div id={'color-selection'} className={'   '} >
        <img src={this.props.image}  alt={this.props.alt} className={(this.props.alt.includes('wheel'))? 'wheel': 'letter'} />
        <div className={'color-selector'} >
          <RgbaColorPicker color={stringToRgbaObject(this.props.color)} onChange={this.changeColor} />
        </div >
      </div >
    )
  }
}

ColorSelection.propTypes = {
  callback: PropTypes.func.isRequired,
}


export default ColorSelection;
