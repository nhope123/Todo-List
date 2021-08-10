import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

import taskSelection from '../../resources/todo-sample'
import Card from '../card'


describe('Test for existing element', ()=>{

    let mockFunc = jest.fn()
    
    test('should contain element title', () => {

        render( <Provider store={store} >
            < Router >
                <Card {...taskSelection[0]} />
            </Router>          
        </Provider>   )

        // Title element exist 
        expect( screen.getByTestId( 'card-title')).toBeInTheDocument()
        // Delete button exist
        expect(screen.getByRole( 'img', {name: 'Delete this list' })).toBeInTheDocument()
        // Task list exist
        expect( screen.getByTestId( 'card-task-list' )).toBeInTheDocument()
        // Task Date element 
        expect( screen.getByTestId( 'card-date' )).toBeInTheDocument()

    });
     
})

