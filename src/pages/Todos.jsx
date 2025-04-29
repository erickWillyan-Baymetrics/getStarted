import { useState, useEffect } from "react";
import { useNhostClient, useFileUpload } from "@nhost/react";
import { CgAttachment } from "react-icons/cg";
import { useForm } from "react-hook-form";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import ToDoItems from "../components/toDoItems";
import Header from "../components/Header";

const deleteTodo = `
    mutation($id: uuid!) {
      delete_todos_by_pk(id: $id) {
        id
      }
    }
  `;
const createTodo = `
    mutation($title: String!, $file_id: uuid) {
      insert_todos_one(object: {title: $title, file_id: $file_id}) {
        id
      }
    }
  `;
const getTodos = `
    query {
      todos {
        id
        title
        file_id
        completed
      }
    }
  `;

export default function Todos() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const [fetchAll, setFetchAll] = useState(false);
  const nhostClient = useNhostClient();
  const { upload } = useFileUpload();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);
      const { data, error } = await nhostClient.graphql.request(getTodos);

      if (error) {
        console.error({ error });
        return;
      }

      setTodos(data.todos);
      setLoading(false);
    }

    fetchTodos();

    return () => {
      setFetchAll(false);
    };
  }, [fetchAll]);

  const onSubmit = async (data) => {
    let todo = { title: data.title };
    if (data.file && data.file.length > 0) {
      const file = data.file[0];

      const { id, error } = await upload({
        file,
        name: file.name,
      });

      if (error) {
        console.error({ error });
        return;
      }

      todo.file_id = id;
    }

    const { error } = await nhostClient.graphql.request(createTodo, todo);

    if (error) {
      console.error({ error });
    }

    setFetchAll(true);
    reset();
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm("Você realmente deseja deletar está tarefa?")) {
      return;
    }

    const todo = todos.find((todo) => todo.id === id);
    if (todo.file_id) {
      await nhostClient.storage.delete({ fileId: todo.file_id });
    }

    const { error } = await nhostClient.graphql.request(deleteTodo, { id });
    if (error) {
      console.error({ error });
    }

    setFetchAll(true);
  };

  const completeTodo = async (id) => {
    const { error } = await nhostClient.graphql.request(
      `
      mutation($id: uuid!) {
        update_todos_by_pk(pk_columns: {id: $id}, _set: {completed: true}) {
          completed
        }
      }
    `,
      { id }
    );

    if (error) {
      console.error({ error });
    }

    setFetchAll(true);
  };

  const openAttachment = async (todo) => {
    const { presignedUrl, error } = await nhostClient.storage.getPresignedUrl({
      fileId: todo.file_id,
    });

    if (error) {
      console.error({ error });
      return;
    }

    window.open(presignedUrl.url, "_blank");
  };

  return (
    <>
      <Header />
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className="flex bg-white flex-col m-auto  w-96 items-center gap-4  px-5 pb-8 rounded-lg"
      >
        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-blue-500 font-bold text-2xl mt-4 mb-4 select-none">
            Cadastrar tarefa
          </h1>
          <label className="text-blue-500 font-extrabold text-base w-full ml-8 select-none">
            Título
          </label>
          <TextBox
            placeholder="Insira o título da tarefa"
            register={register}
            name="title"
            required={true}
          />
          <label
            htmlFor="file"
            className="flex justify-center items-center py-2 bg-emerald-500 rounded-sm w-11/12 cursor-pointer hover:scale-101 duration-500 delay-400 text-white font-bold tracking-wide text-base select-none"
          >
            Escolher Arquivo <CgAttachment className="ml-2" />
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            {...register("file", { required: false })}
          />
          <Button texto="Adicionar tarefa" type="submit" />
        </div>
      </form>

      <div className="flex flex-col m-auto mt-9 w-1/2 gap-1">
        {(!loading &&
          todos.map((todo) => (
            <ToDoItems
              key={todo.id}
              todo={todo}
              title={todo.title}
              arquivo={todo.file_id}
              onClickOpen={() => openAttachment(todo)}
              onClickDelete={() => handleDeleteTodo(todo.id)}
              onChangeCheckbox={() => completeTodo(todo.id)}
            />
          ))) || (
          <div className="todo-item">
            <label className="todo-title">Loading...</label>
          </div>
        )}
      </div>
    </>
  );
}
