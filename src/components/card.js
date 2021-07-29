import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {X} from 'react-bootstrap-icons';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

import {deleteTaskList, editTaskList} from '../redux/listSlice'

class Card extends Component {

  static propTypes = {
    id: PropTypes.string,
    creation_date: PropTypes.string,
    title: PropTypes.string,
    task_list: PropTypes.array,
    list_color: PropTypes.string,
    font_color: PropTypes.string,
    deleteTaskList: PropTypes.func,
  }

  render() {

    return (
      <section className={'card card-container'}
               style={{ border: `3px solid ${this.props.list_color}`,
                        backgroundColor: this.props.list_color }} >

        <div className={'card-header left-border d-flex flex-row justify-content-center'}  >

          <div className={'card-title  m-0 text-truncate fw-bold '} style={{color: this.props.font_color}} >
            {this.props.title}
          </div >

          <X role={'img'} aria-label={'Delete this list'} tabIndex={'0'}
             className={'fs-6 d-inline-block  delete  position-absolute '}
             style={{color: this.props.font_color}}
             onClick={()=> { this.props.deleteTaskList(this.props.id)
             }} />
        </div >

        <Link to={'/create-list'}  className={'text-decoration-none'}
              onClick={()=> this.props.editTaskList(this.props)} >

          <div className={'card-body py-1 px-2 bg-white overflow-hidden'} >
            <ul className={'list-group list-group-flush list-style-circle'} >

              {this.props.task_list.map((item, index) => {
                return (<li key={`${index}`} className={'list-group-item overflow-hidden text-truncate'}
                            style={{textDecorationLine: item.complete? 'line-through': 'none' }} >
                            {item.task}
                        </li >)
              })}

            </ul >
          </div >

          <div className={'card-footer right-border text-center fw-bold'}
               style={{color: this.props.font_color}} >
            {this.props.creation_date}
          </div >
        </Link >
      </section >
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({
    deleteTaskList,
    editTaskList
  },dispatch)
}

export default connect(null,mapDispatchToProps)(Card)
