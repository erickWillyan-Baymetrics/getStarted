export default function TextBox({
  placeholder,
  name,
  register,
  required,
  type,
}) {
  return (
    <input
      placeholder={placeholder}
      type={type ? type : "text"}
      className="py-2 rounded-sm w-11/12 px-3 font-bold text-sm bg-stone-200 select-none"
      {...register(name, { required })}
    />
  );
}
