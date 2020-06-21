import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../helpers/axios.client";

import { GlobalContext } from "./main.page";

const LoginList = () => {
  const {
    state: { table, token },
    changeState
  } = React.useContext(GlobalContext);
  const options = token
    ? {
        headers: {
          Authorization: token
        }
      }
    : {};

  const [list, setList] = React.useState([]);
  const [tableField, setTableField] = React.useState([]);

  const history = useHistory();

  const fetchFields = async () => {
    const url = `/api/v1/fields/${table}`;
    const response = await axios.get(url, options);
    const tableFields = await response.data.data;
    setTableField(tableFields);
  };

  const fetchData = async () => {
    const url =
      table === "users"
        ? `/api/v1/${table}?table=${table}`
        : `/api/v1/${table}`;
    const response = await axios.get(url, options);
    const data = await response.data.data;
    setList(data);
  };

  const showDetail = (id: any) => {
    const currentItem = list.filter((i) => i.id === id)[0];
    window.localStorage.setItem("currentItem", JSON.stringify(currentItem));
    changeState({ currentItem });
    history.push(`/save/${id}`);
  };

  React.useEffect(() => {
    fetchFields();
    fetchData();
  }, [table]);

  const renderFields = (item) => {
    return (
      <div className='text-sm'>
        {tableField.map((field) => {
          return (
            <div key={field.name}>
              <p className='text-gray-900 leading-none'>{field.name}</p>
              <p className='text-gray-600'>{item[field.name]}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCard = (item) => {
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
          {renderFields(item)}
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
  };

  return (
    <div className='flex flex-wrap mb-4 justify-center py-30'>
      {list.map((item) => {
        renderCard(item);
      })}
    </div>
  );
};
export default LoginList;
