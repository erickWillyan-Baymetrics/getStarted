export default function TextBox({
  placeholder,
  name,
  register,
  required,
  type,
  value,
  readOnly,
  defaultValue,
}) {
  return (
    <input
      placeholder={placeholder}
      type={type ? type : "text"}
      value={value}
      readOnly={readOnly}
      defaultValue={defaultValue}
      className="py-2 rounded-sm w-11/12 px-3 font-bold text-sm bg-stone-200 select-none"
      {...register(name, { required })}
    />
  );
}
