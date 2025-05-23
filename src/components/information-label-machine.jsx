export default function InformationLabelMachine({ title, information }) {
  return (
    <div>
      <label className="text-blue-500  font-bold">{title}</label>{" "}
      <label>{information}</label>
    </div>
  );
}
