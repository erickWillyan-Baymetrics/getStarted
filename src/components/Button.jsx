export default function Button(props) {
  return (
    <button
      className="py-2 bg-blue-500 rounded-sm w-11/12 cursor-pointer hover:scale-101 duration-500 delay-400"
      type={props.type}
    >
      <p className="text-white font-bold tracking-wide text-base select-none">
        {props.texto}
      </p>
    </button>
  );
}
