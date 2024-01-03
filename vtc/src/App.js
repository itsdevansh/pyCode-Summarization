import React, { useState } from 'react';
import './App.css';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
  
});


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

  const handleSummarization = async () => {
    try {
      let modelConfig;

      // Set different API configurations based on the selected mode
      const response = await openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-1106:personal::8YcyoEOl",
        messages: [
          {
            "role": "user",
            "content": inputText,
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      // Check if the response contains the expected data
      if (response.choices && response.choices[0] && response.choices[0].message) {
        // Extract the generated summary from the API response
        const summary = response.choices[0].message.content.trim();
        console.log(summary);
        setOutputText(summary);
      } else {
        // Handle cases where the response doesn't contain the expected data
        console.error('Unexpected response structure:', response);
        setOutputText('Error: Unexpected response from API');
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setOutputText(`Error: ${error.message}`);
    }
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
        <button onClick={handleSummarization}>Generate Summary</button>
      </main>
    </div>
  );
}

export default App;
