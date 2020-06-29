import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../helpers/axios.client';
import { GlobalContext, IGlobalContext } from '../contexts';
import { useStoreState, useStoreActions } from '../store/hooks';
import { pull } from 'lodash';

export default function LoginList() {
  // global context
  const {
    state: { table, token },
    changeState,
  } = React.useContext<IGlobalContext>(GlobalContext);
  const options = token
    ? {
        headers: {
          Authorization: token,
        },
      }
    : {};

  // easy peasy global store
  const users = useStoreState((state) => state.users.items);
  // const add = useStoreActions(actions => actions.users.add)

  const [tableNameList, setTableNameList] = React.useState<string[]>(['users', 'games']);
  // list to hold data
  const [list, setList] = React.useState<any[]>([]);

  // array to hold field names
  const [tableField, setTableField] = React.useState<string[]>(['']);

  // history for routing
  const history = useHistory();

  const fetchFields = async () => {
    const url = `/api/v1/fields?table=${table}`;
    const response = await axios.get(url, options);
    const tableFields: string[] = await response.data.data;
    console.log('[ Fetched ]: table fields');
    console.log(tableFields);
    setTableField(pull(tableFields, 'updated_at', 'created_at'));
  };

  const fetchData = async () => {
    const url = table === 'users' ? `/api/v1/${table}?table=${table}` : `/api/v1/${table}`;
    const response = await axios.get(url, options);
    const data = await response.data.data;
    console.log('[ Fetched ]: table data, totally records ' + data.length);
    setList(data);
  };

  const showDetail = (id: any) => {
    const currentItem = list.filter((i) => i.id === id)[0];
    changeState({ currentItem });
    history.push(`/save/${id}`);
  };

  const onChangeTable = (e: React.ChangeEvent<any>) => {
    changeState({ table: e.target.value });
  };

  React.useEffect(() => {
    console.log('[ Testing ]: Global Store');
    // console.log(users);
    // console.log(add);

    console.log('[ Fetching ]: from Api server');
    fetchFields();
    fetchData();
  }, [table]);

  const renderFields = (item) => {
    return (
      <div>
        {tableField.map((field) => {
          return (
            <div key={field}>
              <p className='text-gray-900 leading-none'>{field}</p>
              <p className='text-gray-600'>{item[field]}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelect = () => (
    <div className='relative'>
      <select
        onChange={onChangeTable}
        className='block appearance-none w-full bg-gray-200 border boder-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
      >
        {tableNameList.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </div>
  );

  const renderCard = (item) => {
    return (
      <div
        onClick={() => showDetail(item.id)}
        key={item.id}
        className='max-full-xs rounded overflow-hidden shadow-lg py-30'
      >
        <img className='w-full' src='https://tailwindcss.com/img/card-top.jpg' alt='Sunset in the mountains' />
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
          <div key={item.id} className='text-sm'>
            {renderFields(item)}
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
  };

  return (
    <div className='flex flex-wrap mb-4 justify-center py-30'>
      {renderSelect()}
      {list.map((item) => {
        return <div key={item.id}>{renderCard(item)}</div>;
      })}
    </div>
  );
}
