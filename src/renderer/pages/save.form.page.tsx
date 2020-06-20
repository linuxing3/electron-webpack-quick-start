import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useForm from "../helpers/hooks/useForm";
import { GlobalContext } from "./main.page";

const BASE_URL = "http://xunqinji.top:9007/api/v1";

const SaveForm = () => {
  const { id } = useParams();
  const context = React.useContext(GlobalContext);
  const [table] = React.useState(context.state.table);
  const [token] = React.useState(context.state.token);

  const update = async (data: any, where: any) => {
    const url = `${BASE_URL}/${table}/${where.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Authorizatioin': token
      },
      credentials: 'include',
      mode: "no-cors",
      body: data
    });
    if (response.status !== undefined) {
      const currentItem = await response.json();
      console.log(currentItem);
    }
    // history.push("/list");
  };

  const remove = async (where: any) => {
    const url = `${BASE_URL}/${table}/${where.id}`;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "no-cors",
      headers: {
        'Authorizatioin': token
      }
    });
    if (response.status !== undefined) {
      const deletedItem = await response.json();
      console.log(deletedItem);
    }
  };

  /**
   * 通过路由参数获取数据，并设置状态
   */
  const findOne = async (where: any) => {
    const url = `${BASE_URL}/${table}/${where.id}?table=${table}`;
    const response = await fetch(url, {
      mode: "no-cors",
      headers: {
        'Authorizatioin': token
      }
    });
    if (response.status !== 200) {
      setitem({});
    }
    const currentItem = await response.json();
    setitem(currentItem);
  };

  // Hooks
  /**
   * 定义状态
   */
  const [item, setitem] = useState({});

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
    findOne({ id });
  }, []);

  return (
    <div className='flex mb-4 justify-center py-30'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            id
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='id'
            value={values.id}
          ></input>
          {/* {errors.name && <span>This field is required</span>} */}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='name'
            value={values.name}
            onChange={handleChange}
          ></input>
          {/* {errors.name && <span>This field is required</span>} */}
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='email'
            value={values.email}
            onChange={handleChange}
          ></input>
          {/* {errors.email && <span>This field is required</span>} */}
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password
          </label>
          <input
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            name='password'
            value={values.password}
            onChange={handleChange}
            type='password'
          ></input>
          {/* {errors.password && <span>This field is required</span>} */}
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={() => update(values, { id: values.id })}
          >
            update
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={() => remove({ id: values.id })}
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
export default SaveForm;
