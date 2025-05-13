export default function FormRegister({
  children,
  title,
  weight,
  titlePostion,
  titleSize,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`${weight} bg-white m-auto mt-6 px-5 py-8 rounded-lg`}
    >
      <div className={`flex w-full justify-${titlePostion}`}>
        <h6 className={`text-blue-500 font-bold mb-4 text-${titleSize}`}>
          {title}
        </h6>
      </div>
      <div>{children}</div>
    </form>
  );
}
