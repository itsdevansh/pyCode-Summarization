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
  const [isError, setIsError] = useState(false);
  const outputTextareaRef = useRef(null);
  const pythonKeywords = ["def", "return", "if", "elif", "else", "for", "while", "break", "continue", "import", "from", "as", "try", "except", "finally", "class", "with", "assert", "async", "await", "print"];
  const handleInputChange = (event) => {
    const code = event.target.value;
    setInputText(code);
    
    // Check if the code contains Python keywords
    const containsPythonCode = pythonKeywords.some(keyword => code.includes(keyword));
    
    // Basic check for Python syntax
    if (containsPythonCode) {
      setIsError(false);
    } else if (code.trim() !== '') {
      setIsError(true);
    }
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
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
    <div className={`App ${mode === 'dark' ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <h1>Code Summarization</h1>
        <button onClick={toggleMode}>{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
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
          placeholder="Enter Python code here"
          required
        />
        {isError && (
            <div className="error-card">
              <p style={{ textAlign: 'center' }}>
  Error: The input does not appear to be Python code.
  </p>
            </div>
        )}
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