import React from "react";
import { GlobalContext } from "./main.page";

const BASE_URL = "http://xunqinji.top:9007/api/v1/";

const LoginProfile = () => {
  const context = React.useContext(GlobalContext);
  const [table] = React.useState(context.value.state.table);

  const [item, setItem] = React.useState({
    name: "",
    password: "",
    email: ""
  });

  /**
   * 通过路由参数获取数据，并设置状态
   */
  const findOne = async (where: any) => {
    const url = `${BASE_URL}/${table}/${where.id}`;
    const response = await fetch(url);
    if (response.status !== 200) {
      setItem({});    
    }
    const currentItem =  await response.json();
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
          <div className='font-bold text-xl mb-2'>{item.Item}</div>
          <p className='text-gray-700 text-base'>{item.eItem}</p>
        </div>
        <div className='px-6 py-4 flex items-center'>
          <img
            className='w-10 h-10 rounded-full mr-4'
            src='https://tailwindcss.com/img/jonathan.jpg'
            alt='Avatar of Jonathan Reinink'
          />
          <div className='text-sm'>
            <p className='text-gray-900 leading-none'>{item.Item}</p>
            <p className='text-gray-600'>{item.Item}</p>
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
