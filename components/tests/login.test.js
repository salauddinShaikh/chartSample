import expect from 'expect';
import React from 'react';
import {render} from 'enzyme';
import {LoginView} from '../login/login.view';

function setup() {
  const props = {
  };

  return render(<LoginView {...props}/>);
}

describe('Login Component Tests', () => {
  it('renders Login component', () => {
    const wrapper = setup();
    expect(wrapper.find('h3').first().text()).toEqual('Please Sign In');
  });
});