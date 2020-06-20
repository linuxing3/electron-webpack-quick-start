import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../helpers/axios.client";

import { GlobalContext } from "./main.page";

const LoginList = () => {
  const context = React.useContext(GlobalContext);

  const [list, setList] = React.useState([]);
  const [table] = React.useState(context.state.table);

  const history = useHistory();

  const findAll = async () => {
    const url =
    table === "users"
      ? `/${table}?table=${table}`
      : `/${table}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      setList([]);
    }
    const data = await response.data.data;
    setList(data);
  };

  const showDetail = (id: any) => {
    const selectedItem = list.filter((i) => i.id === id);
    history.push(`/save/${id}`, { ...selectedItem });
  };

  React.useEffect(() => {
    findAll();
  }, [table]);

  return (
    <div className='flex flex-wrap mb-4 justify-center py-30'>
      {list.map((item) => {
        return (
          <div
            onClick={() => showDetail(item.id)}
            key={item.id}
            className='max-full-xs rounded overflow-hidden shadow-lg py-30'
          >
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
