import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PrismaClient } from "@prisma/client";
import useForm from "../helpers/hooks/useForm";

const prisma = new PrismaClient();

const initialValues = {
  name: "test",
  email: "test@electron.com",
  password: "99999999"
};

const LoginForm = () => {
  const history = useHistory();
  const { id } = useParams();

  const update = async (data: any, where: any) => {
    const updatedUser = await prisma.users.update({
      data,
      where
    });
    console.log(updatedUser);
    history.push("/list");
  };

  const remove = async (where: any) => {
    const deletedUser = await prisma.users.delete({ where });
    console.log(deletedUser);
    history.push("/list");
  };

  /**
   * 通过路由参数获取数据，并设置状态
   */
  const findOne = async () => {
    const oneUser = await prisma.users.find(id);
    setitem(oneUser);
  };

  // Hooks
  /**
   * 定义状态
   */
  const [item, setitem] = useState(initialValues);

  /**
   * 使用状态中的数据，初始化表单
   */
  const { values, handleChange } = useForm({
    initialValues: item,
    onSubmit: ({ values }) => console.log(values)
  });

  /**
   * 需要在渲染组件前，执行一次获取数据
   */
  useEffect(() => {
    findOne();
  }, [id]);

  return (
    <div className="flex mb-4 justify-center py-30">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="id"
            value={values.id}
          ></input>
          {/* {errors.name && <span>This field is required</span>} */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            value={values.name}
            onChange={handleChange}
          ></input>
          {/* {errors.name && <span>This field is required</span>} */}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            value={values.email}
            onChange={handleChange}
          ></input>
          {/* {errors.email && <span>This field is required</span>} */}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
          ></input>
          {/* {errors.password && <span>This field is required</span>} */}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => update(values, { id: values.id })}
          >
            update
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => remove({ id: values.id })}
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
