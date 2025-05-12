import LabelForm from "./LabelForm";
import SelectForm from "./select-form";

export default function FormFieldSelectBox({
  options,
  disbableText,
  name,
  required,
  register,
  fieldName,
  fieldId,
  title,
  size,
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
        disbableText={disbableText}
        size="w-full"
      />
      {/* <div className="h-44 w-[800px]"></div> */}
    </div>
  );
}
