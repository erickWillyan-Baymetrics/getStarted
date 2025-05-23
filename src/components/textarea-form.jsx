export default function TextareaForm({
  placeholder,
  name,
  register,
  required,
  type,
  value,
  size,
  height,
}) {
  return (
    <textarea
      placeholder={placeholder}
      type={type}
      value={value}
      className={`py-2 rounded-sm px-3 ${size} ${height} h-16 font-bold text-sm bg-stone-200 select-none`}
      {...(register ? register(name, { required }) : {})}
    />
  );
}
