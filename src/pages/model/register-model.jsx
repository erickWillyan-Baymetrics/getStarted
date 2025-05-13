import Header from "../../components/header";
import FormRegister from "../../components/form-register";
import { useForm } from "react-hook-form";
import FormFieldTextBox from "../../components/form-field-text-box";
import Button from "../../components/button-register";
import { useNhostClient } from "@nhost/react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import SelectForm from "../../components/select-form";
import { data } from "react-router-dom";
import FormFieldSelectBox from "../../components/form-field-select-box";

const createModel = `
  mutation($mod_nome: String!, $fk_marca_id: Int!) {
  insert_modelo_one(object: {mod_nome: $mod_nome, fk_marca_id: $fk_marca_id}) {
    mod_id
    mod_nome
    fk_marca_id 
  }
}
`;

const getBrands = `
query{
  marca {
    mar_id
    mar_nome
  }
}

`;

export default function registerModel() {
  const [brands, setBrands] = useState([]);
  const nhostClient = useNhostClient();
  const { register, reset, handleSubmit } = useForm();

  useEffect(() => {
    const getBrandFunction = async () => {
      const { data, error } = await nhostClient.graphql.request(getBrands);

      if (error) {
        console.log(error);
      } else {
        setBrands(data.marca);
      }
    };

    getBrandFunction();
  }, []);

  const insertModel = async (values) => {
    const { error } = await nhostClient.graphql.request(createModel, values);

    if (error) {
      toast.error(`Erro: ${error[0].message}`);
    } else {
      toast.success("Modelo cadastrado com sucesso");
    }

    reset();
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
          disbableText="Selecione uma marca"
          title="Marca do modelo"
        />

        <Button text="Cadastrar" />
        {/* <SelectForm
          name="fk_marca_id"
          fieldId="mar_id"
          fieldName="mar_nome"
          register={register}
          options={brands}
          required={true}
          size="w-full"
          disbableText="Selecione uma marca"
        /> */}
      </FormRegister>
    </>
  );
}
