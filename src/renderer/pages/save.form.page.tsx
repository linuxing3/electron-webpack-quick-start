import React from "react";
import { useHistory } from "react-router-dom";
import useForm from "../helpers/hooks/useForm";
import skipFields from "../helpers/skipFields";
import axios from "../helpers/axios.client";
import { GlobalContext } from '../contexts';

const SaveForm = () => {
  const history = useHistory();
  const {
    state: { table, currentItem, token },
    changeState
  } = React.useContext(GlobalContext);
  const options = token
    ? {
        headers: {
          Authorization: token
        }
      }
    : {};
  // const itemStore = window.localStorage.getItem("currentItem");

  const [tableField, setTableField] = React.useState([]);
  const fetchFields = async () => {
    const url = `/api/v1/fields/${table}`;
    const response = await axios.get(url, options);
    const tableFields = await response.data.data;
    setTableField(tableFields);
  };

  const update = async () => {
    const url =
      table === "users"
        ? `/api/v1/${table}/${currentItem.id}?table=${table}`
        : `/api/v1/${table}/${currentItem.id}`;
    await axios(url, {
      method: "put",
      data: JSON.stringify(skipFields(currentItem)),
      ...options
    });
    clear();
  };

  const clear = () => {
    changeState({ currentItem: {} });
    history.push("/list");
  };

  const remove = async () => {
    const url =
      table === "users"
        ? `/api/v1/${table}/${currentItem.id}?table=${table}`
        : `/api/v1/${table}/${currentItem.id}`;
    await axios(url, {
      method: "delete",
      ...options
    });
    clear();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    e.persist();
    const newItem = { [name]: value };
    changeState(newItem);
  };

  React.useEffect(() => {
    fetchFields();
  }, [table]);

  const renderInputs = () => {
    return (
      <>
        {tableField.map((field) => {
          return (
            <div key={field.name} className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                {field.name}
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name={field.name}
                value={currentItem[field.name]}
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
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        type='submit'
      >
        update
      </button>
      <button
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={remove}
      >
        Remove
      </button>
    </div>
  );
  
  return (
    <div className='flex mb-4 justify-center py-30'>
      <form
        onSubmit={update}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 mb-4'
      >
        {renderInputs()}
        {renderActions()}
      </form>
    </div>
  );
};
export default SaveForm;
