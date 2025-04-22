import { MdDelete } from "react-icons/md";
import { CgAttachment } from "react-icons/cg";

export default function ToDoItems(props) {
  return (
    <div className="flex justify-between items-center rounded-sm shadow-sm py-2 px-4">
      <input
        className="cursor-pointer"
        type="checkbox"
        name=""
        id=""
        checked={props.checked}
        disabled={props.checked}
      />
      <label className="text-base font-semibold">{props.title}</label>
      <div>
        {props.arquivo ? (
          <button
            onClick={() => {
              props.onClickOpen();
            }}
            className="p-1 bg-emerald-400 rounded-sm cursor-pointer m-2"
          >
            <CgAttachment color="#fff" size={20} />
          </button>
        ) : (
          <></>
        )}
        <button
          onClick={() => {
            props.onClickDelete();
          }}
          className="p-1 bg-blue-500 rounded-sm cursor-pointer"
        >
          <MdDelete color="#fff" size={20} />
        </button>
      </div>
    </div>
  );
}
