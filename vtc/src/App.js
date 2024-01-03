import React, { useState, useRef  } from 'react';
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
  const outputTextareaRef = useRef(null);
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleReset = () => {
    setInputText('');
    setOutputText('');
  };
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleSummarization = async () => {
    try {
      // Check if inputText is empty
      if (!inputText.trim()) {
        console.error('Input text is empty. Please enter code to be summarized.');
        setOutputText('Error: Input text is empty.');
        return;
      }
      let modelConfig;

      // Define different configurations for each mode
      switch (mode) {
        // case 'conservative':
        //   modelConfig = {
        //     // Define parameters for conservative mode
        //     temperature:1.7 /* Your value here */,
        //     max_tokens:256 /* Your value here */,
        //     // ... other parameters
        //   };
        //   break;
        case 'standard':
          modelConfig = {
            // Define parameters for standard mode
            temperature:1 /* Your value here */,
            max_tokens: 256/* Your value here */,
            // ... other parameters
          };
          break;
        case 'Medium':
          modelConfig = {
            // Define parameters for fluent mode
            temperature:0.7 /* Your value here */,
            max_tokens:270 /* Your value here */,
            // ... other parameters
          };
          break;
        case 'creative':
          modelConfig = {
            // Define parameters for creative mode
            temperature:1.3 /* Your value here */,
            max_tokens: 270/* Your value here */,
            // ... other parameters
          };
          break;
        default:
          modelConfig = {}; // Default configuration if needed
      }

      const response = await openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-1106:personal::8YcyoEOl",
        messages: [
          {
            "role": "user",
            "content": inputText,
          }
        ],
        ...modelConfig, // Spread the modelConfig into the API call
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
  const isEmptyInput = !inputText.trim();
  const copyToClipboard = () => {
    // Select the text inside the output textarea
    outputTextareaRef.current.select();
    // Copy the selected text to the clipboard
    document.execCommand('copy');
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Summarization</h1>
      </header>
      <main>
        <div className="mode-buttons">
          <button className={isModeActive('standard')} onClick={() => handleModeChange('standard')}>Standard Mode</button>
          <button className={isModeActive('Medium')} onClick={() => handleModeChange('fluent')}>Fluent Mode</button>
          <button className={isModeActive('creative')} onClick={() => handleModeChange('creative')}>Creative Mode</button>
        </div>
        <div className='Text'>
          <div className="input-area">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter the code to be summarized"
              required
            />
          </div>
          {!isEmptyInput && (
        <div className="output-text">
          <textarea
            ref={outputTextareaRef}
            value={outputText}
            readOnly
            placeholder="You will get the resulting summarization here!"
          />
          {outputText && (
            <button onClick={copyToClipboard}>Copy Summary</button>
          )}
        </div>
      )}
        </div>
        <div className='Button-handler'>
        <button onClick={handleSummarization}>Generate Summary</button>
        <button onClick={handleReset}>Reset</button>
        </div>
      </main>
    </div>
  );
}

export default App;