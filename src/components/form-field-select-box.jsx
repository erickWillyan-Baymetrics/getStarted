import LabelForm from "./LabelForm";
import SelectForm from "./select-form";

export default function FormFieldSelectBox({
  options,
  disableText,
  name,
  required,
  register,
  fieldName,
  fieldId,
  title,
  size,
  selectedText,
  defaultValue,
}) {
  return (
    <div className={`${size} flex flex-col`}>
      <LabelForm title={title} />
      <SelectForm
        name={name}
        fieldId={fieldId}
        fieldName={fieldName}
        register={register}
        options={options}
        required={required}
        disableText={disableText}
        selectedText={selectedText}
        defaultValue={defaultValue}
        size="w-full"
      />
      {/* <div className="h-44 w-[800px]"></div> */}
    </div>
  );
}
