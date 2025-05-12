export default function Button({ text, type, onClick }) {
  return (
    <button
      className="py-2 bg-blue-500 w-full rounded-sm cursor-pointer hover:bg-blue-700 hover:scale-101 duration-500 delay-400 mt-4"
      onClick={onClick}
      type={type}
    >
      <p className="text-white font-bold tracking-wide text-base select-none">
        {text ? text : "Cadastrar"}
      </p>
    </button>
  );
}
