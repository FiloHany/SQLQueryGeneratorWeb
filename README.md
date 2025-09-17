# SQL Query Generator with AI

A modern, full-stack web application that leverages OpenAI's GPT models to convert natural language descriptions into SQL queries. Built with React, Express.js, and styled with a professional dark theme interface.

![SQL Generator Demo](https://via.placeholder.com/800x400/212121/ffffff?text=SQL+Query+Generator+Demo)

## 🚀 Features

- **Natural Language to SQL**: Convert plain English descriptions into accurate SQL queries using OpenAI's advanced language models
- **Interactive Chat Interface**: Seamless conversation-style query generation with real-time responses
- **Chat History Management**: Save, organize, and revisit previous query sessions with persistent local storage
- **Responsive Design**: Optimized for desktop and mobile devices with a collapsible sidebar
- **Dark Theme UI**: Professional, eye-friendly dark interface inspired by modern AI tools
- **Error Handling**: Robust error management with user-friendly feedback messages
- **Modern Tech Stack**: Built with React 19, Express.js, and Vite for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks and concurrent features
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling for maintainable component styles
- **ESLint** - Code linting and quality assurance

### Backend
- **Express.js** - Lightweight and flexible Node.js web framework
- **OpenAI API** - GPT-4o-mini model for natural language processing
- **CORS** - Cross-origin resource sharing support
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **OpenAI API Key** - Get yours from [OpenAI Platform](https://platform.openai.com/api-keys)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd openai_api_sql
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3005
   ```

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**

   Open your browser and navigate to `http://localhost:5174`

## 📖 Usage

### Basic Query Generation

1. **Start a New Chat**: Click the "New chat" button in the sidebar
2. **Describe Your Query**: Type a natural language description in the input field
   - Example: "Show all users who joined in the last 30 days"
   - Example: "Find the total sales by product category"
3. **Generate SQL**: Press Enter or click the send button
4. **View Results**: The generated SQL query will appear in the chat

### Managing Chat History

- **View Previous Chats**: Browse your chat history in the sidebar
- **Select a Chat**: Click on any chat to load its conversation
- **Delete Chats**: Hover over a chat and click the × button to delete
- **Persistent Storage**: Your chat history is automatically saved locally

### Advanced Features

- **Responsive Sidebar**: Toggle the sidebar on mobile devices using the hamburger menu
- **Auto-scroll**: Messages automatically scroll to show the latest content
- **Error Recovery**: Automatic retry and error messaging for failed requests

## 🏗️ Project Structure

```
openai_api_sql/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images and icons
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # React entry point
│   │   └── style.module.css # Component styles
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── server/                # Express.js backend
│   ├── api.js            # OpenAI API configuration
│   ├── generate.js       # SQL generation logic
│   ├── index.js          # Server entry point
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## 🔍 API Endpoints

### POST /generate
Generates SQL queries from natural language descriptions.

**Request Body:**
```json
{
  "queryDescription": "Show all users from New York"
}
```

**Response:**
```json
{
  "response": "SELECT * FROM users WHERE city = 'New York';"
}
```

## 🎨 Customization

### Styling
The application uses CSS Modules for component-scoped styling. Key style variables are defined in `client/src/style.module.css`.

### AI Model Configuration
Modify the AI model and parameters in `server/generate.js`:
- Change model: Update the `model` parameter in the OpenAI API call
- Adjust temperature: Modify the `temperature` value for creativity vs. precision
- Token limits: Configure `max_tokens` for response length

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Deploy the `server` directory to a Node.js hosting service (Heroku, Railway, etc.)
3. Update the API endpoint in the frontend accordingly

### Frontend Deployment
1. Build the production bundle:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to a static hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing powerful language models
- **React Team** for the excellent frontend framework
- **Express.js** for the robust backend framework
- **Vite** for the blazing-fast development experience

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Made with ❤️ using React, Express.js, and OpenAI**
