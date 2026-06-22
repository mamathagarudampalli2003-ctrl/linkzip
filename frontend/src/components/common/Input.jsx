export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full
        p-3
        rounded-lg
        bg-gray-800
        border border-gray-700
        outline-none
        focus:border-blue-500
        ${className}
      `}
    />
  );
}