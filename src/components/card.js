import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {X} from 'react-bootstrap-icons';

const tasks = {
 title: 'Grocery Shopping',
 creation_date: 'Thu, 1 July,2021',
 task_list: [
   {
     id: '8774',
     complete: false,
     task: '2pk White Bread',
   },
   {
     id: '2133',
     complete: true,
     task: '1pk Sugar Cookies',
   },
   {
     id: '328',
     complete: false,
     task: 'Orange Juice',
   },
 ],
 list_color: 'rgba(255, 51, 51, 1)',
 font_color: 'rgba(255,255,255,1)',
}


class Card extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {



    return (
      <section className={'card card-container'} style={{border: `3px solid ${this.props.list_color}`,backgroundColor: this.props.list_color }} >
        <div className={'card-header left-border d-flex flex-row justify-content-center'}  >
          <div className={'card-title  m-0'} style={{color: this.props.font_color}} >{this.props.title}</div >
          <X role={'img'} aria-label={'Delete this list'} tabIndex={'0'}
             className={'fs-6 d-inline-block  delete  position-absolute '}
             style={{color: this.props.font_color}}  />
        </div >
        <div className={'card-body py-1 px-2 bg-white'} >
          <ul className={'list-group list-group-flush list-style-circle'} >
            {this.props.task_list.map((item, index) => {
              return (<li key={`${index}`} className={'list-group-item'} style={{textDecorationLine: item.complete? 'line-through': 'none' }} >{item.task}</li >)
            })}

          </ul >
        </div >
        <div className={'card-footer right-border text-center'} style={{color: this.props.font_color}} >{this.props.creation_date}</div >

      </section >
    )
  }
}

export default Card
