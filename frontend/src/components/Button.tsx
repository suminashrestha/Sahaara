export default function Button({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`bg-btnColor px-5 py-2 text-white rounded-lg ${className} hover: bg-btnHover`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
