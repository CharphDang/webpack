import { useState } from 'react';
import SvgIcon from '@component/SvgIcon'
import './App.css';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <SvgIcon name="test"></SvgIcon>
      <SvgIcon name="ic_laoding"></SvgIcon>
      <header className='App-header'>
        <p>
          <button type='button' onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
