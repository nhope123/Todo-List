import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent, {specialChars} from '@testing-library/user-event';
import {logRoles,} from '@testing-library/dom';
import moment from 'moment';
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { BrowserRouter as Router } from 'react-router-dom' 

import TaskList from '../tasklist';

describe('TaskList Component', function () {

  test("Task list title testing", () => {
    
    render( <Provider store={store} >
                < Router >
                <TaskList />
                </Router>          
            </Provider>   )
    const title = screen.getByRole('textbox',{name:'Title'})

    // Element existence
    expect(title).toBeInTheDocument()
    // Element accessibility
    expect(title).toHaveAccessibleName('Title');
    // Element visibility
    expect(title).toBeVisible();
    // Element content
    expect(title).toBeEmptyDOMElement()
    // Change element content
    userEvent.type(title,'daily task')
    expect(screen.getByTestId('list-title')).toHaveValue('Daily task')
    title.setSelectionRange(0,5)
    userEvent.type(title,`${specialChars.backspace}Good`)
    expect(screen.getByTestId('list-title')).toHaveValue('Good task')

  });

  test("Creation date testing", () => {
    render( <Provider store={store} >
              < Router >
                <TaskList />
              </Router>          
            </Provider>   )
    const date = screen.getByTitle('Creation date')
    // Element existence
    expect(date).toBeInTheDocument()
    // Element accessibility
    expect(date).toHaveAccessibleName('creation date');
    // Element visibility
    expect(date).toBeVisible();
    // Date value
    expect(date).toHaveTextContent(moment().format('ddd, Do MMMM, YYYY'));
  });

  test("Todo list testing",async () => {
    render( <Provider store={store} >
              < Router >
                <TaskList />
              </Router>          
            </Provider>   )
    const input = screen.getByRole('textbox',{name:'Input task'})
    let checkbox;

    // Element existence
    expect(input).toBeInTheDocument()
    // Element accessibility
    expect(input).toHaveAccessibleDescription('Input task');
    expect(input).toHaveAccessibleName('Input task');
    // Element visibility
    expect(input).toBeVisible();
    // Change task input
    userEvent.type(input,'Sleep')
    // Click the checkbox
    checkbox = screen.getByRole('button',{name: 'Completed task'})
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    
  });

});
