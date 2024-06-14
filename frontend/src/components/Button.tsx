export default function Button({
  children,
  className = "",
  onClick,
  type
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: string
}) {
  return (
    <button
      className={`bg-btnColor px-5 py-2 text-white rounded-lg ${className} hover:bg-btnHover`}
      onClick={onClick} 
    >
      {children}
    </button>
  );
}
