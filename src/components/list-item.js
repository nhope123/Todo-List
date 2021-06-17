import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ListItem extends Component{
  handleKeyPress = (e) =>{
    console.log(e.key);
    switch (e.key) {
      case 'Enter':
        console.log('enter pressed');
        break;
      default:

    }
  }
  render(){
    return (
      <div className={''} key={this.props.key}>
        <form onKeyPress={this.handleKeyPress}>
          <div >
            <input type={'checkbox'} name={'uuid'} value={'complete'} />
          </div >
          <div >
          <input id={''} type={'text'} tabIndex={'0'} value={this.props.title}
                 placeholder={'title'} onKeyPress={event => this.handleKeyPress(event)}
                 onChange={(event) =>{this.props.inputChange(event.target.value)}}/>
          </div >

          <span >&#65049;</span >
        </form >
      </div>
    )
  }
}

export default ListItem;
