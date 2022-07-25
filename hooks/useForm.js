import { useState } from "react";
import axios from "axios";
import { capitalize } from "../libs/capitalizeLibs";
import { useRouter } from "next/router";
const useForm = (initForm, validations = null, execute) => {
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState(initForm);
  const router = useRouter();

  const initDataApi = {
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    dni: "",
    codVerifica: "",
  };

  const [dataForCompleteForm, setDataForCompleteForm] = useState(initDataApi);
  const genUrlForConsult = (dni) => {
    const urlForConsult = `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVyaWNrc29ucmF1bHF1aXNwZWNodXJhdGFAZ21haWwuY29tIn0.MS0_Wz8VIjDishI9EkCTYu_pK43QzJLWpNn3dWkGbkI`;
    return urlForConsult;
  };
  const handlerChange = (e) => {
    if (
      e.target.name === "n_document" &&
      e.target.value.length === 8 &&
      (router.route == "/register" || router.route == "/practitioners/register")
    ) {
      axios
        .get(genUrlForConsult(e.target.value))
        .then((res) => {
          setForm({
            ...form,
            n_document: e.target.value,
            names: capitalize(res.data.nombres),
            last_names: capitalize(
              `${res.data.apellidoPaterno} ${res.data.apellidoMaterno}`
            ),
          });
          setDataForCompleteForm(res.data);
        })
        .catch((err) => {
          //nothing
        });
    }
    if (
      e.target.value.length !== 8 &&
      dataForCompleteForm.dni &&
      e.target.name === "n_document"
    ) {
      setDataForCompleteForm(initDataApi);
      const { name, value } = e.target;
      setForm({ ...form, [name]: value, names: "", last_names: "" });
      return;
    }
    const { name, value } = e.target;

    if (e.target.name === "role") {
      setForm({ ...form, [name]: [value] });
    }

    setErrors([]);
    setForm({ ...form, [name]: value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const arrayValidations = validations(form);
    if (!validations) {
      throw new Error("Not validations");
    } else {
      setErrors(arrayValidations);
    }

    if (arrayValidations.length === 0) {
      execute(form);
    }
  };

  return {
    errors,
    setErrors,
    form,
    handlerChange,
    handlerSubmit,
    dataForCompleteForm,
  };
};

export { useForm };
