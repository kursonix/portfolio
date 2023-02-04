import React, { PropsWithChildren } from "react";

export const CompoundPatternExample = () => {
  return (
    <div>
      <Menu>
        <Menu.Toggle />
        <Menu.List>
          <Menu.Item onClick={() => {}}>Edit</Menu.Item>
          <Menu.Item onClick={() => {}}>Delete</Menu.Item>
        </Menu.List>
      </Menu>
    </div>
  );
};

const MenuContext = React.createContext({
  open: false,
  toggle: (open: boolean) => {},
});

interface IMenu extends PropsWithChildren {}

const Menu = ({ children }: IMenu) => {
  const [open, toggle] = React.useState(false);

  return (
    <MenuContext.Provider value={{ open, toggle }}>
      {children}
    </MenuContext.Provider>
  );
};

const Toggle = () => {
  const { open, toggle } = React.useContext(MenuContext);
  return (
    <button
      className="p-2 bg-orange-600 text-white"
      onClick={() => toggle(!open)}
    >
      Toggle
    </button>
  );
};

interface IList extends PropsWithChildren {}

const List = ({ children }: IList) => {
  const { open } = React.useContext(MenuContext);
  return (
    <>
      {open && (
        <div className="flex flex-col-reverse divide-y divide-y-reverse">
          {children}
        </div>
      )}
    </>
  );
};

interface IItem extends PropsWithChildren {
  onClick: () => void;
}

const Item = ({ children, onClick }: IItem) => {
  return (
    <button onClick={onClick} className="p-2 bg-emerald-900 text-white w-32">
      {children}
    </button>
  );
};

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Item = Item;
