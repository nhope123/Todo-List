import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import CreateList from './CreateList'

const Header = (props) => {

  return (
    <header className={'container-fluid mx-0 py-4 '}       >
      <div className={' container-lg  d-block position-relative'}>
        <div role={'document'} aria-label={'Application header'} title={'Home'}
            className={'col-12 d-flex flex-row justify-content-center align-items-canter'} >
          <Link to={'/'} className={'text-decoration-none'} >
            <h2 className={'mb-0'}>{'Todo Manager'}</h2>
          </Link >
        </div >

        {/* Create list button */}
        { (props.setButton)? <CreateList /> : ''  }

      </div>
    </header>
  )
  
}

const mapStateToProps = (state) =>{
  return {
    setButton: state.todolist.isButtonVisible,
  }
}

export default connect(mapStateToProps) (Header)
