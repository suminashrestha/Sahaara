export default function Button({
  children,
  className = "",
  onClick
}:{
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`bg-red-500 px-5 py-2 text-white rounded-lg ${className}`}  onClick={onClick}
    >
      {children}
    </button>
  );
}

