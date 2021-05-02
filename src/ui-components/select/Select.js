import React, { useState, useRef, useEffect } from 'react'
import DropdownIcon from '../../assets/down-arrow.svg';
import SelectedIcon from '../../assets/check-light.svg';
import PropTypes, { any } from 'prop-types';
import './Select.scss';

const Select = (props) => {

  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  }

  const handleMenuClick = (item) => {
    toggleDropdown();
    setSelectedMenuItem(item);
    props.onChange(item);
  }

  const getGroupedData = (data) => {
    let groupedData = {};
    data.map(item => {
      if (!groupedData[item.group]) {
        groupedData[item.group] = [];
      }
      groupedData[item.group].push(item);
    });
    return groupedData;
  }

  const createMenuElement = (menuData) => {
    return (
      <ul className='dropdown-menu' data-testid='dropdown-menu'>
      {
        Object.keys(menuData).map(key => {
          return menuData[key].map((item, index) => {
            let menuItemClasses = selectedMenuItem.value === item.value ?
                                      'dropdown-menu-item dropdown-menu-item--selected' :
                                      'dropdown-menu-item';
            menuItemClasses += (index === menuData[key].length - 1) ? ' dropdown-menu-item--last' : '';
            return (
              <li className={menuItemClasses} key={item.value} onClick={() => handleMenuClick(item)} >
                <div className='selected-icon-container'>
                  {selectedMenuItem.value === item.value && <img src={SelectedIcon} alt="Selected" data-testid='selected-icon' className='selected-icon'/>}
                </div>
                <div className='menuItem-text-container'>
                  <div className='menuItem-label-text'>{item.label}</div>
                  {
                    props.extended &&
                    <div className='menuItem-description'>{item.description}</div>
                  }
                </div>
              </li>
            )
          })
        })
      }
      </ul>
    )
  }


  const menuData = getGroupedData(props.data);
  const dropdownClasses = props.theme === 'dark' ? 'dropdown dropdown-dark' : 'dropdown';
  const dropdownIconClass = open ? 'open' : '';
  return (
    <div className={dropdownClasses} ref={node}>
        <div className="dropdown-title-box" data-testid='dropdown-title-box' onClick={toggleDropdown}>
          <span>
            {
              selectedMenuItem.label ? selectedMenuItem.label : props.title
            }
          </span>
          <img src={DropdownIcon} alt="Open" className={dropdownIconClass}/>
        </div>
        { open && createMenuElement(menuData) }
      </div>
  )
}

Select.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.any.isRequired,
    description: PropTypes.any.isRequired,
    group: PropTypes.any
  })),
  title: PropTypes.string,
  extended: PropTypes.bool,
  theme: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Select;