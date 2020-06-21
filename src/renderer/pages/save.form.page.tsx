import React from 'react';
import { useHistory } from 'react-router-dom';
import { pull, omit } from 'lodash';
import axios from '../helpers/axios.client';
import { GlobalContext, IGlobalContext } from '../contexts';
// import { pick } from 'lodash';

const SaveForm = () => {
  const history = useHistory();
  const {
    state: { table, currentItem, token },
    changeState,
  } = React.useContext<IGlobalContext>(GlobalContext);
  const options = token
    ? {
        headers: {
          Authorization: token,
        },
      }
    : {};

  const [editing, setEditing] = React.useState<boolean>(true);

  const [tableField, setTableField] = React.useState<string[]>([]);

  const fetchFields = async () => {
    const url = `/api/v1/fields?table=${table}`;
    const response = await axios.get(url, options);
    const tableFields: string[] = await response.data.data;
    console.log('[ Fetched ]: table fields');
    console.log(tableFields);
    setTableField(pull(tableFields, 'updated_at', 'created_at'));
  };

  const update = async () => {
    const url =
      table === 'users' ? `/api/v1/${table}/${currentItem.id}?table=${table}` : `/api/v1/${table}/${currentItem.id}`;
    const res = await axios(url, {
      method: 'put',
      data: JSON.stringify(omit(currentItem, ['created_at', 'updated_at'])),
      ...options,
    });
    return res;
  };

  const create = async () => {
    const url = table === 'users' ? `/api/v1/${table}?table=${table}` : `/api/v1/${table}}`;
    const res = await axios(url, {
      method: 'post',
      data: JSON.stringify(omit(currentItem, ['id', 'created_at', 'updated_at'])),
      ...options,
    });
    return res;
  };

  const save = async () => {
    let res;
    if (editing) {
      res = await update();
    } else {
      res = await create();
    }
    console.log(res);
    clear();
  };

  const remove = async () => {
    const url =
      table === 'users' ? `/api/v1/${table}/${currentItem.id}?table=${table}` : `/api/v1/${table}/${currentItem.id}`;
    const res = await axios(url, {
      method: 'delete',
      ...options,
    });
    console.log(res);
    clear();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const newItem = { [name]: value };
    changeState({ currentItem: { ...currentItem, ...newItem } });
  };

  const clear = () => {
    changeState({ user: 'names', currentItem: {} });
    history.push('/list');
  };

  React.useEffect(() => {
    fetchFields();
  }, [table]);

  const renderInputs = () => {
    return (
      <>
        {tableField.map((field) => {
          return (
            <div key={field} className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>{field}</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name={field}
                value={currentItem[field]}
                onChange={handleChange}
              ></input>
              {/* {errors.name && <span>This field is required</span>} */}
            </div>
          );
        })}
      </>
    );
  };

  const renderActions = () => (
    <div className='flex items-center justify-between'>
      {editing ? (
        <>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Update
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={remove}
          >
            Remove
          </button>
        </>
      ) : (
        <>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Create
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className='flex w-2/3 mb-4 justify-center py-30'>
      <div className='w-full py-4 px-4 align-left' onClick={() => setEditing(!editing)}>
        <h1 className='text-lg text-green-900 '>{editing ? 'Change To Create' : 'Change to Edit'}</h1>
      </div>
      <div className='w-full text-lg text-green-900 py-4 px-4'>
        <form onSubmit={save} className='bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 mb-4'>
          {renderInputs()}
          {renderActions()}
        </form>
      </div>
    </div>
  );
};
export default SaveForm;
