import Header from "../../components/header";
import FormRegister from "../../components/form-register";
import { useForm } from "react-hook-form";
import FormFieldTextBox from "../../components/form-field-text-box";
import Button from "../../components/button-register";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import FormFieldSelectBox from "../../components/form-field-select-box";
import { useMutation, useQuery } from "@apollo/client";
import { LIST_BRAND } from "../../graphql/queries/brand/list-brand";
import { CREATE_MODEL } from "../../graphql/mutations/model/create-model";
import LoadingPage from "../../components/loadingComponent";
LoadingPage;

export default function registerModel() {
  const [brands, setBrands] = useState([]);
  const { register, reset, handleSubmit } = useForm();
  const { data, loading, error } = useQuery(LIST_BRAND);
  const [CreateModel] = useMutation(CREATE_MODEL);

  useEffect(() => {
    if (data && data.marca) {
      setBrands(data.marca);
    }
  }, [data]);

  if (loading) {
    return <LoadingPage />;
  }
  const insertModel = async (values) => {
    try {
      await CreateModel({
        variables: values,
      });

      toast.success("Modelo cadastrado com sucesso");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar modelo");
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Header />
      <FormRegister
        title="Cadastrar Modelo"
        titlePostion="center"
        titleSize="xl"
        weight="w-96"
        onSubmit={handleSubmit(insertModel)}
      >
        <FormFieldTextBox
          name="mod_nome"
          register={register}
          required={true}
          placeholder="Digite o nome do modelo"
          title="Nome do modelo"
        />
        <FormFieldSelectBox
          name="fk_marca_id"
          fieldId="mar_id"
          fieldName="mar_nome"
          register={register}
          options={brands}
          required={true}
          size="w-full"
          disableText="Selecione uma marca"
          title="Marca do modelo"
        />

        <Button text="Cadastrar" />
      </FormRegister>
    </>
  );
}
