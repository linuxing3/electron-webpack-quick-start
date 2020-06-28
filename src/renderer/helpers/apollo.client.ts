import ApolloClient, { HttpLink, InMemoryCache } from 'apollo-boost';
// import { WebSocketLink } from '@apollo/link-ws';

const HASURA_TOKEN =
  'IDToken eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzoyMzIyM2JiNi1lODQ3LTRhMTAtOThhNS02Yzk1YjZlYWUxOGEiLCJ0eXAiOiJKV1QifQ.eyJhbGxvd2VkX3NjaGVtYXMiOltdLCJhbGxvd2VkX3RhYmxlcyI6e30sImF0X2hhc2giOiJiZ0Z3bFl0MzRuUmxKZkZqOHdiSF9nIiwiYXVkIjpbIjhmNzE2MDc5LTgyOTYtNDA4Yy1iMjkxLWNkYzdjY2Q2N2ZkNl9jb25zb2xlIl0sImF1dGhfdGltZSI6MTU5MzIwMzY4NiwiY29sbGFib3JhdG9yX3ByaXZpbGVnZXMiOlsiYWRtaW4iLCJncmFwaHFsX2FkbWluIiwidmlld19tZXRyaWNzIl0sImV4cCI6MTU5MzIwNzI5NSwiaWF0IjoxNTkzMjAzNjk1LCJpc3MiOiJodHRwczovL29hdXRoLnByby5oYXN1cmEuaW8vIiwianRpIjoiMWEwYzFkZmMtODdmZS00NjJlLWJjNjUtZTkwMTQ1Zjg5OTFlIiwibWV0cmljc19mcWRuIjoidXMtZWFzdC0yLWF3cy1tZXRyaWNzLWNsb3VkLmhhc3VyYS1hcHAuaW8iLCJub25jZSI6IiIsInByb2plY3QiOnsiaWQiOiJkNmMxNjY3Zi05OTY5LTQ4NmQtODg4NS1hYmQ5ZGQ5NGY2NGQiLCJuYW1lIjoicHJlcGFyZWQtcGFuZ29saW4tMTAifSwicmF0IjoxNTkzMjAzNjgyLCJzaWQiOiI0YjRmYThiYy00NWRjLTRjYjItOWNjZS03ZGUzNWVhN2RiNTgiLCJzdWIiOiJmY2Q2ODlhZS1iYWY3LTRjNTctOGQ2NS02YWE3MzdiNGJhMjQifQ.I4m1Sw1sUkIynaHUQNwf7LAKCxG0PNS11IAcijEIaoTBYWnX2dcDMRb-BkR3ZJdkXwRkJMIBKWXPObNs_S_bTuhav1mr9hGuoH33uVkBmJKyKXmD_wuL9Kx9cL3hPo37Y9opwV0dkFwmQlQjM3s7lDgMgcjoL9YEWolAM4AxFVHMBWdlC3IMp-v0ztH9d0ES7Qhnt1Cn28S1m7Zzq5-4Bl9d6q0KDVZcLA7ZK8E0nFhEMcpxZ-qTMsn0oI2whsgiQz0X5axu7X0BoB4r9AFlBybXuUnDhgRHTUw7Wzx1SC2rLS1OOt6rs9b-UKRTDEf81Byb6oRfADGAXwFdmOLEhCSg7uB5PLy26W6Ekjks8J24NM2cxQAy_coRqFb8ViiYy-eqd6G1r20FwqctIVXbfhRwlco8sGwBEezIhUr-Q6qf1pPZdguPVgY91KEJYMrsh_w5b_9u8KQAJACY9R6d7hXYGe62V6zUm1L77BVu2W5hiJyt_rsDDcaCQlQ1mD0HTX5looVoINR8kxxKhV-vguSYSlR8QdmyU6edDP7Shyfzit2Z-kApuNu3rliEUrvkF1TFBTBEm-mVO75tG_Wgs0zh9pL8ERAq3GcJonFx8_C_7bW6SqGaixQy_dzzhPH31WLMDfRsgQ1u7s2CZp2-LzWp57tkG7cCakGFZP1A9gc';

/**
 * TODO: add subscription
 * const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true
  }
});
*/

export const prepareApolloClient = (authToken) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://prepared-pangolin-10.hasura.app/v1/graphql',
    headers: {
      'Hasura-Client-Name': 'hasura-console',
      'Content-Type': 'applicaiton/json',
      'basura-collaborator-token': HASURA_TOKEN,
      Authorization: authToken,
    },
  });
};
