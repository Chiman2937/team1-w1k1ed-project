import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const EditorDropdownContext = createContext<{
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorDropdown = ({ children }: DropdownProps) => {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <EditorDropdownContext.Provider value={{ selected, setSelected, isOpen, setIsOpen }}>
      <div ref={dropdownRef}>{children}</div>
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
  const { selected, setIsOpen } = useEditorDropdown();

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button className={className} onClick={handleButtonClick}>
      {selected}
    </button>
  );
};

interface ListProps {
  children: React.ReactNode;
  className?: string;
}
const List = ({ children, className }: ListProps) => {
  const { isOpen } = useEditorDropdown();

  return <div className={`${isOpen ? 'block' : 'hidden'} ${className}`}>{children}</div>;
};

interface ListItemProps {
  value: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}
const ListItem = ({ value, onClick, className, children }: ListItemProps) => {
  const { setSelected, setIsOpen } = useEditorDropdown();
  const handleListItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const value = target.dataset.value;
    if (!value) return;
    setSelected(value);
    onClick();
    setIsOpen(false);
  };

  return (
    <button data-value={value} className={className} onClick={handleListItemClick}>
      {children}
    </button>
  );
};

EditorDropdown.button = Button;
EditorDropdown.list = List;
EditorDropdown.listItem = ListItem;

export default EditorDropdown;
