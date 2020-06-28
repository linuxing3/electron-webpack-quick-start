import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext, IGlobalContext } from '../contexts';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// import { Query } from '@apollo/react-components';
import { TableTypes } from '../../../typings';

const UserApolloList = () => {
  // hooks
  // global context
  const {
    state: { table, token },
    changeState,
  } = useContext<IGlobalContext>(GlobalContext);

  const [tableNameList, setTableNameList] = useState<string[]>(['users', 'games']);

  // history for routing
  const history = useHistory();

  // FIXME: useQuery钩子调用，因为非法使用钩子，好像是useEffect和useState之间的冲突问题。
  const { loading, error, data } = useQuery(QUERY_DATA);

  const onChangeTable = (e: React.ChangeEvent<any>) => {
    changeState({ table: e.target.value });
  };

  const renderFields = (item: TableTypes) => {
    const tableField = Object.keys(item) || ['id'];
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

  const renderCard = (item: TableTypes) => {
    const showDetail = (id: any) => {
      changeState({ currentItem: item });
      history.push(`/save/${id}`);
    };
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // return (
  //   // <div></div>
  //   <Query query={QUERY_DATA}>
  //     {({ error, loading, data }) => {
  //       return <div>{data}</div>;
  //     }}
  //   </Query>
  // );

  return (
    <div className='flex flex-wrap mb-4 justify-center py-30'>
      {renderSelect()}
      {data[table].map((item: TableTypes) => {
        return <div key={item.id}>{renderCard(item)}</div>;
      })}
    </div>
  );
};

/**
 * TODO: 查询本地缓存，启用分页等功能
 *  const { data: { todos, visibilityFilter } } = useQuery(GET_TODOS);
 *
 * const GET_USERS = gql`
  query GetUsers {
    todos @client (type: $type, offset: $offset, limit: $limit) {
      id
      completed
      text
    }
    visibilityFilter @client
  }
`;
 */
const QUERY_DATA = gql`
  query UserQuery {
    users(where: { is_public: { _eq: false } }, order_by: { created_at: desc }) {
      id
      name
      email
      password
    }
  }
`;

/**
 * TODO: 添加记录并写入缓存
 *  const [user_insert_one, mutate, { loading, error, data } ] = useMutation(
    MUTATION_INSERT,
    {
      update(cache, { data: { insert_users_one } }) {
        const { users } = cache.readQuery({ query: QUERY_DATA });
        cache.writeQuery({
          query: QUERY_DATA,
          data: { users: users.concat([insert_users_one]) },
        });
      }
    }
  );
 */
const MUTATION_INSERT = gql`
  mutation UserMutation($email: String = "", $name: String = "", $password: String = "") {
    insert_users_one(object: { email: $email, name: $name, password: $password }) {
      id
    }
  }
`;

/**
 * TODO: update and write Cache with cache.writeQuery
 *   const [
    updateTodo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_TODO);
 */

const MUTATION_UPDATE = gql`
  mutation MyMutation($id: Int, $email: String = "", $name: String = "", $password: String = "") {
    update_users_by_pk(pk_columns: { id: $id }, _set: { email: $email, name: $name, password: $password }) {
      id
    }
  }
`;

const MUTATION_DELETE = gql`
  mutation MyMutation($id: Int) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;

/**
 * TODO: useSubscription
 *   const { data: { userAdded }, loading } = useSubscription(
      QUERY_DATA,
      { variables: { id } }
  );
 */
const USERS_SUBSCRIPTION = gql`
  subscription OnUserAdded($name: String!) {
    user_create_one(name: $name) {
      id
      name
    }
  }
`;

/**
 * EXAMPLE: The data returned are as following...
 * {
  "data": {
    "users": [
      {
        "name": "x",
        "email": "x@gmail.com",
        "password": "xsss"
      },
      {
        "name": "xxxx",
        "email": "xxx@gmail.com",
        "password": "xsss"
      },
      {
        "name": "xyyx",
        "email": "8787xx@gmail.com",
        "password": "xsss"
      },
      {
        "name": "zzzz",
        "email": "zzzz@g.cn",
        "password": "zzz"
      },
      {
        "name": "zz",
        "email": "zzxxxzz@g.cn",
        "password": "zxxzz"
      }
    ]
  }
}
 */

export default UserApolloList;
