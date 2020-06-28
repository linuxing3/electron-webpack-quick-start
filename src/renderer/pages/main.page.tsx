import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from '../pages/login.form.page';
import UserProfile from '../pages/user.profile.page';
import UserList from '../pages/user.list.page';
import ApolloList from '../pages/user.list.apollo.page';
import SaveForm from '../pages/save.form.page';

import { GlobalContext, IGlobalState, IGlobalContext } from '../contexts';

const MainPage = () => {
  /**
   * initial values of global context
   */

  const [state, setState] = useState<IGlobalState>({
    table: 'users',
    currentItem: {},
    token: '',
  });

  const { table, currentItem, token } = state;
  /**
   * FIXME: 虽然使用了useCallback进行记忆，仍然出现了重复渲染错误
   * Here are the method of context, which can be called from child component
   * useCallback to avoid infinite render
   */
  const changeState: IGlobalContext['changeState'] = useCallback(
    (s: Partial<IGlobalState>) => {
      const newState = { ...state, ...s };
      setState(newState);
      return newState;
    },
    [state],
  );

  /**
   * Snapshot state to localStorage
   */

  useEffect(() => {
    window.localStorage.setItem('table', table);
    window.localStorage.setItem('currentItem', JSON.stringify(currentItem));
    window.localStorage.setItem('token', token);
  }, [table, currentItem, token]);

  return (
    <GlobalContext.Provider value={{ state, changeState }}>
      <Router>
        <nav className='flex items-center justify-between flex-wrap bg-teal-500 p-6'>
          <div className='flex items-center flex-shrink-0 text-white mr-6'>
            <svg
              className='fill-current h-8 w-8 mr-2'
              width='54'
              height='54'
              viewBox='0 0 54 54'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
            </svg>
            <span className='font-semibold text-xl tracking-tight'>Game Monitor App</span>
          </div>
          <div>
            <div className='block lg:hidden'>
              <button className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
                <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <title>Menu</title>
                  <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                </svg>
              </button>
            </div>
            <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
              <div className='text-sm lg:flex-grow'>
                <Link to='/'>
                  <div className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>Home</div>
                </Link>
                {token ? (
                  <>
                    <Link to='/profile'>
                      <div className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
                        Profile
                      </div>
                    </Link>
                    <Link to='/list'>
                      <div className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>List</div>
                    </Link>
                    <Link to='/apollo'>
                      <div className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
                        Apollo
                      </div>
                    </Link>
                    <Link to='/table'>
                      <div className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
                        Detail
                      </div>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <Link to='/login'>
                <div className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'>
                  {state.token ? 'Logout' : 'login'}
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/profile' render={(props) => (token ? <UserProfile {...props} /> : <Redirect to='/' />)} />
            <Route path='/list' render={(props) => (token ? <UserList {...props} /> : <Redirect to='/' />)} />
            <Route path='/apollo' render={(props) => (token ? <ApolloList {...props} /> : <Redirect to='/' />)} />
            <Route path='/save/:id' render={(props) => (token ? <SaveForm {...props} /> : <Redirect to='/' />)} />
            <Route path='/login'>
              <LoginForm />
            </Route>
            <Route exact={true} path='/'>
              <LoginForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalContext.Provider>
  );
};

export default MainPage;
