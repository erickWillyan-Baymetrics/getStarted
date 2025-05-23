import LabelForm from "./LabelForm";
import TextareaForm from "./textarea-form";

export default function FormFieldTextarea({
  placeholder,
  name,
  register,
  required,
  type,
  value,
  readOnly,
  defaultValue,
  size,
  title,
}) {
  return (
    <div className={`${size} flex flex-col`}>
      <LabelForm title={title} />
      <TextareaForm
        name={name}
        register={register}
        required={required}
        defaultValue={defaultValue}
        readOnly={readOnly}
        type={type}
        value={value}
        placeholder={placeholder}
        size="w-full"
      />
    </div>
  );
}
