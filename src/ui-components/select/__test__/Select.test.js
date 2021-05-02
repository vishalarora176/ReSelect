import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../Select';

configure({ adapter: new Adapter() });

const dropdownData = [
  {
    value: '1',
    label: 'One',
    description: 'First Description'
  },
  {
    value: '2',
    label: 'Two',
    description: 'Second Description'
  },
  {
    value: '3',
    label: 'Three',
    description: 'Third Description'
  },
];

describe('Select component', () => {
  it('renders correctly', () => {
    shallow(<Select data={dropdownData} selected={{}} onChange={function() {}}/>);
  })

  it('Renders select title component with default text', () => {
    const wrapper = shallow(<Select data={dropdownData} selected={{}} onChange={function() {}}/>);
    const title = wrapper.find('.dropdown-title-box').find('span').html();
    expect(title).toContain('Please select a value')
  });

  it('Renders select title component with selected text', () => {
    const selectedValue = {
      value: '2',
      label: 'Two',
      description: 'Second Description'
    };
    const wrapper = shallow(<Select data={dropdownData} selected={selectedValue} onChange={function() {}}/>);
    const title = wrapper.find('.dropdown-title-box').find('span').html();
    expect(title).toContain('Two')
  });

  it('Renders all the menu items when the title box is clicked', () => {
    const wrapper = shallow(<Select data={dropdownData} selected={{}} onChange={function() {}}/>);
    wrapper.find('.dropdown-title-box').simulate('click');
    expect(wrapper.find("li").length).toEqual(3);
  });

  it('Renders the selection icon only once when a selected item is passed', () => {
    const selectedValue = {
      value: '2',
      label: 'Two',
      description: 'Second Description'
    };
    const wrapper = shallow(<Select data={dropdownData} selected={selectedValue} onChange={function() {}}/>);
    wrapper.setState({open: true})
    const selectedIconsLength = wrapper.find('.selected-icon').length;
    expect(selectedIconsLength).toBe(1);
  });

  it('onChange function is called when a list item is clicked', async () => {
    const selectedValue = {
      value: '2',
      label: 'Two',
      description: 'Second Description'
    };
    const onChangeFunction = jest.fn();
    const wrapper = shallow(<Select data={dropdownData} selected={selectedValue} onChange={onChangeFunction}/>);
    wrapper.setState({open: true})

    const firstMenuItem = wrapper.find('.dropdown-menu-item').first();
    firstMenuItem.simulate('click');
    expect(onChangeFunction).toHaveBeenCalled();
  });

  it('closes the menu when a list item is clicked', async () => {
    const selectedValue = {
      value: '2',
      label: 'Two',
      description: 'Second Description'
    };
    const onChangeFunction = jest.fn();
    const wrapper = shallow(<Select data={dropdownData} selected={selectedValue} onChange={onChangeFunction}/>);
    wrapper.setState({open: true})

    const firstMenuItem = wrapper.find('.dropdown-menu-item').first();
    firstMenuItem.simulate('click');
    const menu = wrapper.find('.dropdown-menu');
    expect(menu.exists()).toBeFalsy();
  });
  
  it('shows description with extended version', async () => {
    const onChangeFunction = jest.fn();
    const wrapper = shallow(<Select data={dropdownData} extended={true} selected={{}} onChange={onChangeFunction}/>);
    wrapper.setState({open: true})
    const descriptionsLength = wrapper.find('.menuItem-description').length;
    expect(descriptionsLength).toBe(3)
  });

  it('does not render dark mode when theme is not passed', async () => {
    const onChangeFunction = jest.fn();
    const wrapper = shallow(<Select data={dropdownData} selected={{}} onChange={onChangeFunction}/>);
    const component = wrapper.find('.dropdown-dark');
    expect(component.exists()).toBeFalsy()
  });

  it('renders in dark mode when dark theme is not passed', async () => {
    const onChangeFunction = jest.fn();
    const wrapper = shallow(<Select data={dropdownData} theme='dark' selected={{}} onChange={onChangeFunction}/>);
    const component = wrapper.find('.dropdown-dark');
    expect(component.exists()).toBeTruthy()
  });
});