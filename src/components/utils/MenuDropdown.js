const MenuDropdown = ({
  menuOptions,
  toggleMenu,
  menuOpen,
  activeOption,
  NavLink,
  setActiveOption,
}) => {
  const hideMenu = () => {
    setActiveOption(null);
  };

  return (
    <ul className="navbar-nav mr-auto">
      {menuOptions.map((option) => (
        <li className="nav-item dropdown" key={option.name}>
          <NavLink
            className={`nav-link dropdown-toggle ${
              option.name === activeOption ? "active" : ""
            }`}
            to="/#"
            id={`dropdown-${option.name}`}
            role="button"
            onClick={() => toggleMenu(option.name)}
            onBlur={hideMenu}
          >
            {option.name}
          </NavLink>
          <div
            className={`dropdown-menu ${
              option.name === activeOption ? "show" : ""
            }`}
            aria-labelledby={`dropdown-${option.name}`}
          >
            {option.subOptions.map((subOption) => (
              <NavLink
                className="dropdown-item"
                to={subOption.path}
                key={subOption.name}
              >
                {subOption.name}
              </NavLink>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
export default MenuDropdown;
