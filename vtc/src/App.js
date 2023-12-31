import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('conservative');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleParaphrase = () => {
    // Here you would call the paraphrasing API
    // For the example, we're just mocking the output
    setOutputText(`Paraphrased (mode: ${mode}): ${inputText}`);
  };

  const isModeActive = (selectedMode) => {
    return mode === selectedMode ? 'active' : '';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Summarization</h1>
      </header>
      <main>
       
        <div className="mode-buttons">
          <button className={isModeActive('conservative')} onClick={() => handleModeChange('conservative')}>Most conservative</button>
          <button className={isModeActive('standard')} onClick={() => handleModeChange('standard')}>Standard Mode</button>
          <button className={isModeActive('fluent')} onClick={() => handleModeChange('fluent')}>Fluent Mode</button>
          <button className={isModeActive('creative')} onClick={() => handleModeChange('creative')}>Creative Mode</button>
        </div>
        <div className='Text'>
        <div className = "input-area">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter the code to be summarized"
        />
        </div>
        <div className = "output-text">
        <textarea
          value={outputText}
          readOnly
          placeholder="You will get the resulting summarization here!"
        />
        </div>
        </div>
        <button onClick={handleParaphrase}>Paraphrase</button>
      </main>
    </div>
  );
}

export default App;
