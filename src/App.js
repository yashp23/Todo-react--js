import { tab } from '@testing-library/user-event/dist/tab';
import './App.css';
import { useState } from 'react';
import { tabs } from './tabs';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [activeTabs, setActiveTabs] = useState(0);
  const [activeContent, setactiveContent] = useState(tabs[0]);

  const saveTodoList = (event) => {
    event.preventDefault();

    const toname = event.target.toname.value.trim();

    if (toname && !todoList.includes(toname)) {
      setTodoList([...todoList, toname]);
    } else if (todoList.includes(toname)) {
      alert("Todo name already exists!");
    }

    event.target.toname.value = '';
  };

  const changeData = (index) => {
    setActiveTabs(index);
    setactiveContent(tabs[index]);
  }

  return (
    <div className="App">
      <div className="tabsOuter">
        <h1 style={{ textAlign: 'left' }}>Law Prep Vision Mission and Values</h1>

        <ul>
          {
            tabs.map((tabsItem, index) => {
              return (
                <li>
                  <button onClick={() => changeData(index)} className={activeTabs == index ? 'activeButton' : ''}>{tabsItem.title}
                  </button>
                </li>)
            })
          }



        </ul>
        {activeContent !== undefined ? <p>{activeContent.description}</p> : ''}

      </div>



      <h1 className="h">Add Todo</h1>
      <form onSubmit={saveTodoList}>
        <input type="text" name="toname" />
        <button type="submit">Save</button>
      </form>

      <div className="outerDiv">
        <ul>
          {todoList.map((value, index) => (
            <TodoListItem
              key={index}
              value={value}
              indexNumber={index}
              todoList={todoList}
              setTodoList={setTodoList} // Ensure correct setter function here
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

const TodoListItem = ({ value, indexNumber, todoList, setTodoList }) => {

  const [status, setStatus] = useState(false);

  const deleteTodo = () => {
    // Filter out the todo item to delete and update the state
    setTodoList(todoList.filter((v, i) => i !== indexNumber));
  };

  const checkStatus = () => {
    setStatus(!status);
  }

  return (
    <li onClick={checkStatus}
      className={(status) ? 'completeTodo' : ''}>
      {indexNumber + 1}. {value}
      <span onClick={deleteTodo} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
        &times;
      </span>
    </li>
  );
};
