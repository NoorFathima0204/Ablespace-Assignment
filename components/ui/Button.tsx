type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const base =
    "rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-[#171717] text-white hover:bg-[#333333]",
    secondary:
      "border border-[#e5e5e5] bg-white text-[#555555] hover:bg-[#f7f7f7]",
    ghost: "text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}