import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent, {specialChars} from '@testing-library/user-event';
import {logRoles,} from '@testing-library/dom';
import moment from 'moment';

import TaskList from '../tasklist';

describe('TaskList Component', function () {



  test("Task list title testing", () => {
    render(<TaskList />)
    const title = screen.getByRole('textbox',{name:'title'})

    // Element existence
    expect(title).toBeInTheDocument()
    // Element accessibility
    expect(title).toHaveAccessibleDescription('title');
    expect(title).toHaveAccessibleName('title');
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
    render(<TaskList />)
    const date = screen.getByTitle('creation')
    // Element existence
    expect(date).toBeInTheDocument()
    // Element accessibility
    expect(date).toHaveAccessibleDescription('creation');
    expect(date).toHaveAccessibleName('creation date');
    // Element visibility
    expect(date).toBeVisible();
    // Date value
    expect(date).toHaveTextContent(moment().format('ddd, Do MMMM, YYYY'));
  });

  test("Todo list testing",async () => {
    render(<TaskList />)
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
    checkbox = screen.getByRole('checkbox',{name: 'Task completed'})
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    
  });

});
