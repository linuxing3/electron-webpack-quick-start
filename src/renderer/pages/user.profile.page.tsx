import React from "react";
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

const LoginProfile = () => {

  const [ user, setUser ] = React.useState({
    name: "",
    password: "",
    email: ""
  });

  const findAll = async () => {
    const allUsers = await prisma.users.findMany();
    console.log(allUsers);
  };

  const findOne = async (where: any) => {
    const foundUser = await prisma.users.findOne({ where });
    console.log(foundUser);
    setUser(foundUser);
  };

  React.useEffect(() => {
    findOne({ id: 1 })
  },[])

  return (
    <div className='flex mb-4 justify-center py-30'>
      <div className='rounded overflow-hidden shadow-lg py-30'>
        <img
          className='w-full'
          src='https://tailwindcss.com/img/card-top.jpg'
          alt='Sunset in the mountains'
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{user.name}</div>
          <p className='text-gray-700 text-base'>
            {user.email}
          </p>
        </div>
        <div className='px-6 py-4 flex items-center'>
          <img
            className='w-10 h-10 rounded-full mr-4'
            src='https://tailwindcss.com/img/jonathan.jpg'
            alt='Avatar of Jonathan Reinink'
          />
          <div className='text-sm'>
            <p className='text-gray-900 leading-none'>{user.name}</p>
            <p className='text-gray-600'>{user.name}</p>
          </div>
        </div>
        <div className='px-6 py-4'>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
            #react
          </span>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
            #typescript
          </span>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
            #electron
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginProfile;
