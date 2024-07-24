import React, { useState, useRef, useEffect } from "react";

interface PopoverProps {
  content: React.ReactNode[];
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button onClick={togglePopover} className="focus:outline-none">
        {children}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 right-3 shadow-lg rounded-lgbg-white flex flex-col justify-around gap-1">
          {content.map((item, idx) => (
            <div key={idx + 1} className="px-2 py-1 bg-black rounded-md">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Popover;