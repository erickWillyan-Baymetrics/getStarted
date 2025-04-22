export default function TextBox(props) {
  return (
    <input
      placeholder={props.placeholder}
      className="py-2 rounded-sm  w-11/12 px-3 font-bold text-sm bg-stone-200 select-none"
      {...props.register(props.name, { required: props.required })}
    />
  );
}
