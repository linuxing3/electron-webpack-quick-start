import React from "react";
import { useHistory } from "react-router-dom";
import useForm from "../helpers/hooks/useForm";
import axios from "../helpers/axios.client";
import { GlobalContext, IGlobalContext } from '../contexts';
import { IUser } from "../typings";

const LoginForm = () => {
  
  const initialValues: IUser = {
    name: "xingwenju",
    email: "xingwenju@gmail.com",
    password: "20090909"
  };

  const history = useHistory();

  const { changeState } = React.useContext<IGlobalContext>(GlobalContext);

  const create = async (data: IUser) => {
    // Create a new user
    try {
      const response = await axios.post(`/auth/register`, data);
      const user: IUser = await response.data.user;
      if (user) { 
        history.push("/login");
        console.log(user);
      }
    } catch (error) {
      const response = await axios.post(`/auth/login`, data);
      if (response.status === 200) {
        const token: string = response.data.data.accessToken;
        if (token) {
          // set token to global context
          changeState({ token: 'bearer '+ token });
          history.push("/profile");
        }
      } else {
        console.log(response.status);
      }
    }
  };

  const onSubmit = async (data: IUser) => {
    await create(data);
  };

  // Hook
  const { values, handleChange, handleSubmit } = useForm<IUser>({
    initialValues,
    onSubmit: ({ values }) => onSubmit(values)
  });

  return (
    <div className='flex mb-4 justify-center py-30'>
      <form
        onSubmit={handleSubmit}
        className='w-1/4 bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 mb-4'
      >
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='name'
            value={values.name}
            onChange={handleChange}
            // ref={register({ required: true })}
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
            // ref={register({ required: true })}
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
            // ref={register({ required: true })}
            type='password'
          ></input>
          {/* {errors.password && <span>This field is required</span>} */}
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Sign In
          </button>
          <a
            className='px-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            href='/'
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
