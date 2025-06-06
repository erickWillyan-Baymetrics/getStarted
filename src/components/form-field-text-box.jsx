import LabelForm from "./LabelForm";
import TextBox from "./TextBox";

export default function FormFieldTextBox({
  name,
  value,
  register,
  required,
  defaultValue,
  readOnly,
  type,
  placeholder,
  size,
  title,
}) {
  return (
    <div className={`${size} flex flex-col`}>
      <LabelForm title={title} />
      <TextBox
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
