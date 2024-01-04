# Code Summarization App

## Introduction

This application is designed to provide an intuitive and efficient way to summarize Python code using a custom fine-tuned GPT-3.5 Turbo model. It's an ideal tool for developers, educators, and anyone interested in understanding or documenting code more effectively.

## Features

- **Code Input**: Allows users to input Python code for summarization.
- **Summarization Modes**: Offers different modes like Standard, Fluent, and Creative for varied types of summaries.
- **Dark/Light Mode**: Toggle between dark and light themes for user comfort.
- **Copy to Clipboard**: Easily copy the summarized code to the clipboard.
- **Error Detection**: Detects when the input is not Python code and alerts the user.
- **Responsive Design**: Adapts to different screen sizes for a seamless experience on desktops and mobile devices.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-link]
   ```

2. Navigate to the project directory:
   ```bash
   cd code-summarization-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```

5. Start the application:
   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

1. **Input Python Code**: In the input area, paste or write the Python code you wish to summarize.
2. **Choose Mode**: Select the summarization mode (Standard, Fluent, Creative) according to your need.
3. **Generate Summary**: Click on 'Generate Summary' to get the summarized version of the code.
4. **Copy or Reset**: Use the 'Copy Summary' button to copy the text to the clipboard or 'Reset' to clear the fields.

## Contributing

Contributions to improve the application are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b new-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin new-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the GPT-3.5 Turbo model.
- React community for the excellent framework.

---

Note: Replace `[repository-link]` with the actual link to the GitHub repository where this project is hosted.
