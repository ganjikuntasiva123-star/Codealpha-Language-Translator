# 🔥 Text Forge: The Ultimate AI Language Smithy

Text Forge is a high-performance, aesthetically pleasing language translation application. Built with a "smithy" theme, it treats raw text like molten metal, forging it into precise, polished translations.

![Text Forge UI](https://via.placeholder.com/1200x600.png?text=Text+Forge+Interface+Preview)

## ✨ Features

-   **120+ Languages:** Support for a vast array of global languages.
-   **Dynamic Theming:** Premium "Forge" aesthetic with micro-animations and heat-wave effects.
-   **Real-time Interaction:** Character counting and instant status feedback.
-   **One-Click Copy:** Seamlessly copy your forged translations to the clipboard.
-   **Robust Backend:** Powered by a Node.js/Express server for secure API interactions.

## 🛠️ Technology Stack

-   **Frontend:** Vanilla HTML5, CSS3 (Custom Variables, Animations), and Modern JavaScript (ES6+).
-   **Backend:** Node.js, Express.js.
-   **API Integration:** Axios for secure communication with translation services.

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/text-forge.git
    cd text-forge
    ```

2.  **Set up the Server:**
    ```bash
    cd server
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `server` directory and add your API credentials:
    ```env
    PORT=5000
    API_KEY=your_translation_api_key_here
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    # Inside the /server directory
    npm run dev
    ```

2.  **Launch the Frontend:**
    Open `frontend/index.html` in your favorite browser, or use a live server extension in VS Code.

## 📂 Project Structure

```text
.
├── frontend/           # UI components, styles, and logic
│   ├── index.html      # Main application structure
│   ├── style.css       # Forge-themed design system
│   └── script.js       # Client-side interactivity
├── server/             # Express backend
│   ├── controllers/    # Request handlers
│   ├── routes/         # API endpoints
│   ├── services/       # External API integrations
│   └── server.js       # Entry point
└── .gitignore          # Files to exclude from version control
```

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Crafted with ❤️ for the global forge.*
