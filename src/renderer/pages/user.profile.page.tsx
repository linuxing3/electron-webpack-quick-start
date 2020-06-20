import React from "react";
import { GlobalContext } from "./main.page";
import axios from "../helpers/axios.client";

const LoginProfile = () => {
  const context = React.useContext(GlobalContext);
  console.log(context);
  const [table] = React.useState(context.state.table);

  const [item, setItem] = React.useState({
    name: "",
    password: "",
    email: ""
  });

  /**
   * 通过路由参数获取数据，并设置状态
   */
  const findOne = async (where: any) => {
    const url =
    table === "users"
      ? `/${table}/${where.id}?table=${table}`
      : `/${table}/${where.id}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      console.log("No item found!")
    }
    const currentItem = await response.data.data;
    setItem(currentItem);
  };

  React.useEffect(() => {
    findOne({ id: 1 });
  }, []);

  return (
    <div className='flex mb-4 justify-center py-30'>
      <div className='rounded overflow-hidden shadow-lg py-30'>
        <img
          className='w-full'
          src='https://tailwindcss.com/img/card-top.jpg'
          alt='Sunset in the mountains'
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{item.name}</div>
          <p className='text-gray-700 text-base'>{item.email}</p>
        </div>
        <div className='px-6 py-4 flex items-center'>
          <img
            className='w-10 h-10 rounded-full mr-4'
            src='https://tailwindcss.com/img/jonathan.jpg'
            alt='Avatar of Jonathan Reinink'
          />
          <div className='text-sm'>
            <p className='text-gray-900 leading-none'>{item.name}</p>
            <p className='text-gray-600'>{item.email}</p>
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
