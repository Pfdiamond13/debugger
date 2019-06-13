import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Debugger from '../src/components/Debugger';
import Search from '../src/components/Search';

configure({adapter: new Adapter()});

describe('Debugger Test Suite', () => {

  it('Should render', () => {
    const wrapper = shallow(<Debugger />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have one <Search /> component', () => {
    const wrapper = mount(<Debugger />);
    expect(wrapper.find(Search)).toHaveLength(1);
  });

  it('Should render with isPaused as false', () => {
    const wrapper = mount(<Debugger />);
    expect(wrapper.state().isPaused).toBe(false);
  });

  it('Should render with isLive as true', () => {
    const wrapper = mount(<Debugger />);
    expect(wrapper.state().isLive).toBe(true);
  });
});
