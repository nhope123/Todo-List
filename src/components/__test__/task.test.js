import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Task from '../task';

let container = null;

beforeEach(()=>{
  // Setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(()=>{
  // Cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

describe('Task Component',()=>{
  it('Props testing',()=>{
    act(()=>{
      let taskProps = {id:'3', complete:false, task:'Feed the dog', user_input:false, callback: ()=>{},
      new_input: true}
      render(<Task {...taskProps} />,container);
    });
    expect(container.textContent).toContain('Feed the dog');
  });

  
})
