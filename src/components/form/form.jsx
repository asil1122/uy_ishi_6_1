import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(3, "Bratishka eng kamida 3 harf bolish kere!!!"),
  email: z.string().email("Email hato kiritildi!!!"),
});

function Form({ AddUser, setData2, updateUser }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (setData2) {
      setValue("name", setData2.name);
      setValue("email", setData2.email);
    }
  }, [setData2, setValue]);

  const onSubmit = async (data) => {
    if (setData2) {
      updateUser({ ...setData2, ...data });
      reset();
    } else {
      try {
        const response = await axios.post("http://localhost:3600/todos", data);
        AddUser(response.data);
        reset();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div >
        <input
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div >
        <input
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <button
        type="submit"
      >
        {setData2 ? "Edit" : "Send"}
      </button>
    </form>
  );
}

export default Form;
