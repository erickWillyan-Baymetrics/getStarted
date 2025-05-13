export default function TextBox({
  placeholder,
  name,
  register,
  required,
  type,
  value,
  readOnly,
  defaultValue,
  size,
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      readOnly={readOnly}
      defaultValue={defaultValue}
      className={`py-2 rounded-sm px-3 ${size} font-bold text-sm bg-stone-200 select-none`}
      {...(register ? register(name, { required }) : {})}
    />
  );
}
