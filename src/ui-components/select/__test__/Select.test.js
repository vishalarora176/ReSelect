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
    shallow(<Select data={dropdownData} onChange={function() {}}/>);
  })

  it('Renders select title component without text', () => {
    const wrapper = shallow(<Select data={dropdownData} onChange={function() {}}/>);
    const title = wrapper.find('.dropdown-title-box').find('span').html();
    expect(title).toContain('')
  });

  it('Renders select title component with provided title', () => {
    const wrapper = shallow(<Select data={dropdownData} title='cars' onChange={function() {}}/>);
    const title = wrapper.find('.dropdown-title-box').find('span').html();
    expect(title).toContain('cars')
  });

  it('Renders all the menu items when the title box is clicked', () => {
    const wrapper = shallow(<Select data={dropdownData} onChange={function() {}}/>);
    wrapper.find('.dropdown-title-box').simulate('click');
    expect(wrapper.find("li").length).toEqual(3);
  });

  it('Closes the menu when an item is clicked', () => {
    const wrapper = shallow(<Select data={dropdownData} onChange={function() {}}/>);
    wrapper.find('.dropdown-title-box').simulate('click');
    const firstMenuItem = wrapper.find('.dropdown-menu-item').first();
    firstMenuItem.simulate('click');
    const menu = wrapper.find('.dropdown-menu');
    expect(menu.exists()).toBeFalsy();
  });

  it('Selects the value when item is clicked', () => {
    const wrapper = shallow(<Select data={dropdownData} onChange={function() {}}/>);
    wrapper.find('.dropdown-title-box').simulate('click');
    const menuItem = wrapper.find('.dropdown-menu').childAt(1);
    menuItem.simulate('click');
    const title = wrapper.find('.dropdown-title-box').find('span').html();
    expect(title).toContain('Two')
  });

  it('Renders the selection icon only once when an item is selected', () => {
    const wrapper = shallow(<Select data={dropdownData} onChange={function() {}}/>);
    wrapper.find('.dropdown-title-box').simulate('click');
    const firstMenuItem = wrapper.find('.dropdown-menu-item').first();
    firstMenuItem.simulate('click');
    wrapper.find('.dropdown-title-box').simulate('click');
    const selectedIconsLength = wrapper.find('.selected-icon').length;
    expect(selectedIconsLength).toBe(1);
  });

  it('onChange function is called when a list item is clicked', async () => {
    const onChangeFunction = jest.fn();
    const wrapper = shallow(<Select data={dropdownData} onChange={onChangeFunction}/>);
    wrapper.find('.dropdown-title-box').simulate('click');
    const firstMenuItem = wrapper.find('.dropdown-menu-item').first();
    firstMenuItem.simulate('click');
    expect(onChangeFunction).toHaveBeenCalled();
  });

  it('shows description with extended version', async () => {
    const wrapper = shallow(<Select data={dropdownData} extended={true} onChange={function() {}}/>);
    wrapper.find('.dropdown-title-box').simulate('click');
    const descriptionsLength = wrapper.find('.menuItem-description').length;
    expect(descriptionsLength).toBe(3)
  });

  it('does not render dark mode when theme is not passed', async () => {
    const wrapper = shallow(<Select data={dropdownData} onChange={function() {}}/>);
    const component = wrapper.find('.dropdown-dark');
    expect(component.exists()).toBeFalsy()
  });

  it('renders in dark mode when dark theme is not passed', async () => {
    const wrapper = shallow(<Select data={dropdownData} theme='dark' onChange={function() {}}/>);
    const component = wrapper.find('.dropdown-dark');
    expect(component.exists()).toBeTruthy()
  });
});