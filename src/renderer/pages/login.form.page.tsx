import React from "react";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";

const prisma = new PrismaClient();

type Inputs = {
  user: string;
  password: string;
  email: string;
};

const LoginForm = () => {

  // const { register, handleSubmit, watch, errors } = useForm<Inputs>();

  const onSubmit = async (data: any) => {
    await create(data);
  };

  const create = async (data: any) => {
    // Create a new user
    const newUser = await prisma.users.create({
      data
    });
    console.log(newUser);
  };

  const update = async (data: any, where: any) => {
    const updatedUser = await prisma.users.update({
      data,
      where
    });
    console.log(updatedUser);
  };

  const remove = async (where: any) => {
    const deletedUser = await prisma.users.delete({ where });
    console.log(deletedUser);
  };

  // React.useEffect(() => {
  //   create({
  //     name: "electron",
  //     password: "99999999",
  //     email: "electron@qq.com"
  //   })
  //   return () => {
  //     // cleanup
  //   }
  // }, [])

  return (
    <div className='flex mb-4 justify-center py-30'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 mb-4'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='name'
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
            // ref={register({ required: true })}
          ></input>
          {/* {errors.email && <span>This field is required</span>} */}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            name='password'
            // ref={register({ required: true })}
            type='password'
          ></input>
          {/* {errors.password && <span>This field is required</span>} */}
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            Sign In
          </button>
          <a
            className='px-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            href='/recover'
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
