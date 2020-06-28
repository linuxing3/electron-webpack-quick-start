import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';

// The component AND the query need to be exported
import { GET_DOG_QUERY, Dog } from './dog';

it('renders without error', () => {
  const mocks = [
    {
      request: {
        query: GET_DOG_QUERY,
        variables: {
          name: 'Buck',
        },
      },
      result: {
        data: {
          dog: { id: '1', name: 'Buck', breed: 'bulldog' },
        },
      },
    },
  ];
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name='Buck' />
    </MockedProvider>,
  );
});

it('should render loading state initially', () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <Dog />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});

it('should render dog', async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: 'Buck' },
    },
    result: {
      data: { dog: { id: 1, name: 'Buck', breed: 'poodle' } },
    },
  };

  const component = renderer.create(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name='Buck' />
    </MockedProvider>,
  );

  await new Promise((resolve) => setTimeout(resolve, 0));

  const p = component.root.findByType('p');
  expect(p.children).toContain('Buck is a poodle');
});