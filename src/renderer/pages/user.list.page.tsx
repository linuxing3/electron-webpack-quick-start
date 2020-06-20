import React from "react";
import { useHistory } from "react-router-dom";

const BASE_URL = "http://xunqinji.top:9007/api/v1/";

const LoginList = () => {

  const history = useHistory();

  const [list, setList] = React.useState([]);

  const findAll = async () => {
    const url = BASE_URL + 'users/';
    const response = await fetch(url);
    if (response.status !== 200) {
      setList([]);    
    }
    const data =  await response.json();
    setList(data);
  };

  const showDetail = (id: any) => {
    const selectedUser = list.filter(i => i.id === id);
    history.push(`/save/${id}`, { ...selectedUser });
  };

  React.useEffect(() => {
    findAll();
  }, []);

  return (
    <div className='flex flex-wrap mb-4 justify-center py-30'>
      {list.map((item) => {
        return (
          <div onClick={() => showDetail(item.id)} key={item.id} className='max-full-xs rounded overflow-hidden shadow-lg py-30'>
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
                <p className='text-gray-600'>{item.name}</p>
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
        );
      })}
    </div>
  );
};
export default LoginList;
