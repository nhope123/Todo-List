import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskList from '../tasklist';

describe('TaskList Component', function () {

  render(<TaskList />)

  test("Task list title testing", async () => {

    const title = screen.getByRole('textbox',{name:'title'})

    // Element existence

    // Element accessibility

    // Element visibility

    // Element content

    // Change element content


    




    expect(title).toBeInTheDocument()
    expect(title).toBeEmptyDOMElement()

    await userEvent.type(title,'daily task')
    expect(screen.getByTestId('list-title')).toHaveValue('Daily task')

    title.setSelectionRange(0,3)
    userEvent.type(title,'{backspace}new1')
    console.log(screen.getByTestId('list-title').value);

    //await fireEvent.change(screen.getByRole('textbox',{name:'title'}),{target: {value:'daily task'}})



  });

});
