import React from "react";
import { useHistory } from "react-router-dom";
import useForm from "../helpers/hooks/useForm";
import skipFields from "../helpers/skipFields";
import axios from "../helpers/axios.client";
import { GlobalContext } from "./main.page";

const SaveForm = () => {
  const history = useHistory();
  const context = React.useContext(GlobalContext);
  const options = context.state.token? {
    headers: {
      'Authorization': context.state.token
    }
  } : {}
  const [table] = React.useState(context.state.table);
  const itemStore = window.localStorage.getItem("currentItem");

  const update = async (data: any, where: any) => {
    const url =
      table === "users"
        ? `/api/v1/${table}/${where.id}?table=${table}`
        : `/api/v1/${table}/${where.id}`;
    await axios(url, {
      method: "put",
      data: JSON.stringify(skipFields(data)),
      ...options
    });
    history.push('/list')
  };

  const remove = async (where: any) => {
    const url =
      table === "users"
        ? `/api/v1/${table}/${where.id}?table=${table}`
        : `/api/v1/${table}/${where.id}`;
    await axios(url, {
      method: "delete",
      ...options
    });
    history.push('/list')
  };

  /**
   * 使用状态中的数据，初始化表单
   */
  const { values, handleChange } = useForm({
    initialValues: JSON.parse(JSON.stringify(itemStore)),
    onSubmit: ({ values }) => console.log(values)
  });

  return (
    <div className='flex mb-4 justify-center py-30'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            {values.id}
          </label>
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
