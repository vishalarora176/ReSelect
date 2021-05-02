

class Select extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    const node = useRef();
  }

  toggleDropdown = () => {
    this.setState({open: !this.state.open});
  }

  handleMenuClick = (item) => {
    this.toggleDropdown();
    props.onChange(item);
  }

  getGroupedData = (data) => {
    let groupedData = {};
    data.map(item => {
      if (!groupedData[item.group]) {
        groupedData[item.group] = [];
      }
      groupedData[item.group].push(item);
    });
    return groupedData;
  }

  createMenuElement = (menuData) => {
    return (
      <ul className='dropdown-menu' data-testid='dropdown-menu'>
      {
        Object.keys(menuData).map(key => {
          return menuData[key].map((item, index) => {
            let menuItemClasses = props.selected?.value === item.value ?
                                      'dropdown-menu-item dropdown-menu-item--selected' :
                                      'dropdown-menu-item';
            menuItemClasses += (index === menuData[key].length - 1) ? ' dropdown-menu-item--last' : '';
            return (
              <li className={menuItemClasses} key={item.value} onClick={() => this.handleMenuClick(item)} >
                <div className='selected-icon-container'>
                  {props.selected?.value === item.value && <img src={SelectedIcon} alt="Selected" data-testid='selected-icon' className='selected-icon'/>}
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

  render() {
    const menuData = this.getGroupedData(props.data);
    const dropdownClasses = props.theme === 'dark' ? 'dropdown dropdown-dark' : 'dropdown';
    const dropdownIconClass = this.state.open ? 'open' : '';
    return (
      <div className={dropdownClasses} ref={this.node}>
        <div className="dropdown-title-box" data-testid='dropdown-title-box' onClick={this.toggleDropdown}>
          <span>
            {
              props.selected?.label ? props.selected.label : 'Please select a value'
            }
          </span>
          <img src={DropdownIcon} alt="Open" className={dropdownIconClass}/>
        </div>
        { this.state.open && this.createMenuElement(menuData) }
      </div>
    )
  }
}

Select.propTypes = {
  selected: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.any.isRequired,
    description: PropTypes.any.isRequired
  })),
  extended: PropTypes.bool,
  theme: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Select;
