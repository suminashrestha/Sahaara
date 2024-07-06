import { ReactNode, useState } from "react";

function FlipCard({ front, back }: { front: ReactNode; back: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="p-10 h-[100%] w-[40%] flex flex-col  justify-center gap-2 items-center font-sans text-white shadow-md bg-btnColor rounded-md  transition-all ease-in-out duration-500 transform hover:bg-white hover:text-zinc-600 "
      onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}
    >
      {!isOpen ? front : back}
    </button>
  );
}

export default FlipCard;
