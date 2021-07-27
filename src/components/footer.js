import React from 'react'
import {Linkedin, Github} from 'react-bootstrap-icons';

function Footer() {
  return (
    <footer className={'container-fluid mx-0 px-0 position-absolute '}>
      <div className={'container-lg px-0'}>

        <div className={'d-flex flex-row justify-content-around align-items-center'} >

          <div >
            <a href={'https://www.linkedin.com/in/nialhope/'} target={'_top'}
               tabIndex={'0'} title={'Go to Linkedin'}>
              <Linkedin className={'fs-6 me-1 link '} role={'img'} aria-label={'Go to Linkedin'} />
            </a >
            <a href={'https://github.com/nhope123/todo-list'} target={'_top'}
               tabIndex={'0'} title={'Go to Github repository'}>
              <Github  className={'fs-6 me-1 link'} role={'img'} aria-label={'Go to Github repository'}  />
            </a >
          </div >
        </div >

        <div className={'d-flex flex-row justify-content-center align-items-center'} >
          <div id={'copyright'} className={'py-1 '} >
            {'nhope'} &copy; {'2021'}
          </div >
        </div >

      </div >
    </footer >
  )
}

export default Footer
