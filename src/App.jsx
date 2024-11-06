import React from 'react';

const TodoList = React.lazy(() => import('./Pages/TodoList'));

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App
