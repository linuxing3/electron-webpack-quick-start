import React, { useState, useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';
import { TableTypes } from '../../../typings';

const QueryComponent = () => {
  return (
    <Query query={QUERY_DATA}>
      {(data) => {
        return (
          <div className='flex flex-wrap mb-4 justify-center py-30'>
            {data['users'].map((item) => {
              return <div key={item.id}>{item.name}</div>;
            })}
          </div>
        );
      }}
    </Query>
  );
};

const PlaygroundComponent = () => {
  // const { loading, error, data } = useQuery(QUERY_DATA);
  const { loading, error, data } = {
    loading: true,
    error: true,
    data: {
      users: [
        {
          id: 1,
          name: 'playgournd',
        },
      ],
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className='flex flex-wrap mb-4 justify-center py-30'>
      {data['users'].map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
      {/* <QueryComponent></QueryComponent> */}
    </div>
  );
};

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

export default PlaygroundComponent;
