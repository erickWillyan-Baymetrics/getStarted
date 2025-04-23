import { MdDelete } from "react-icons/md";
import { CgAttachment } from "react-icons/cg";

export default function ToDoItems(props) {
  return (
    <div className="flex justify-between items-center rounded-sm shadow-sm py-2 px-4">
      <input
        className="cursor-pointer"
        type="checkbox"
        id={`todo-${props.todo.id}`}
        checked={props.todo.completed}
        disabled={props.todo.completed}
        onChange={() => props.onChangeCheckbox()}
      />
      <div className="flex justify-center">
        <label className="text-base font-semibold">{props.todo.title}</label>
      </div>
      <div className="flex w-20 justify-end">
        {props.todo.file_id ? (
          <button
            onClick={() => props.onClickOpen()}
            className="p-1 bg-emerald-400 rounded-sm cursor-pointer h-7 mr-2"
          >
            <CgAttachment color="#fff" size={20} />
          </button>
        ) : (
          <></>
        )}
        <button
          onClick={() => props.onClickDelete()}
          className="p-1 bg-blue-500 rounded-sm h-7 cursor-pointer"
        >
          <MdDelete color="#fff" size={20} />
        </button>
      </div>
    </div>
  );
}
