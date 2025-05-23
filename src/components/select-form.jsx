export default function SelectForm({
  options,
  disableText,
  name,
  required,
  register,
  fieldName,
  fieldId,
  size,
  selectedText,
  defaultValue,
}) {
  return (
    <select
      defaultValue={defaultValue ? defaultValue : ""}
      {...(register ? register(name, { required }) : {})}
      className={`py-2 rounded-sm ${size} px-3 font-bold text-sm bg-stone-200 select-none curso`}
    >
      {selectedText && (
        <option value="" selected hidden>
          {selectedText}
        </option>
      )}
      {disableText && (
        <option value={disableText} disabled hidden>
          {disableText} (atual)
        </option>
      )}
      {options.map((option) => (
        <option key={option[fieldId]} value={option[fieldId]}>
          {option[fieldName]}
        </option>
      ))}
    </select>
  );
}
