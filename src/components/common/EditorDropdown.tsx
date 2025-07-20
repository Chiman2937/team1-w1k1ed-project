import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const EditorDropdownContext = createContext<{
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  // isOpen: boolean;
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
  listRef: RefObject<HTMLDivElement | null>;
} | null>(null);

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorDropdown = ({ children }: DropdownProps) => {
  const [selected, setSelected] = useState('');

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <EditorDropdownContext.Provider value={{ selected, setSelected, listRef }}>
      {children}
    </EditorDropdownContext.Provider>
  );
};

const useEditorDropdown = () => {
  const context = useContext(EditorDropdownContext);
  if (!context) {
    throw new Error('useEditorDropdown must be used within an EditorDropdown provider');
  }
  return context;
};

interface ButtonProps {
  className?: string;
}
const Button = ({ className }: ButtonProps) => {
  const { selected } = useEditorDropdown();

  return <div className={className}>{selected}</div>;
};

interface ListProps {
  children: React.ReactNode;
  className?: string;
}
const List = ({ children, className }: ListProps) => {
  return <div className={className}>{children}</div>;
};

interface ListItemProps {
  label: string;
  onClick: () => void;
  className?: string;
}
const ListItem = ({ label, onClick, className }: ListItemProps) => {
  const { selected, setSelected } = useEditorDropdown();
  const handleListItemClick = (label: string) => {
    setSelected(label);
    onClick();
  };

  useEffect(() => {
    setSelected((prev: string) => (prev === '' ? label : prev));
  }, [selected, setSelected, label]);

  return (
    <div className={className}>
      <button onClick={() => handleListItemClick(label)}>{label}</button>
    </div>
  );
};

EditorDropdown.button = Button;
EditorDropdown.list = List;
EditorDropdown.listItem = ListItem;

export default EditorDropdown;
