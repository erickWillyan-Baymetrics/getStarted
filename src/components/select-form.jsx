export default function SelectForm({
  options,
  disbableText,
  name,
  required,
  register,
  fieldName,
  fieldId,
  size,
}) {
  return (
    <select
      defaultValue=""
      {...(register ? register(name, { required }) : {})}
      className={`py-2 rounded-sm ${size} px-3 font-bold text-sm bg-stone-200 select-none curso`}
    >
      <option disabled value="">
        {disbableText}
      </option>
      {options.map((option) => {
        return (
          <option key={option[fieldId]} value={option[fieldId]}>
            {option[fieldName]}
          </option>
        );
      })}
    </select>
  );
}
