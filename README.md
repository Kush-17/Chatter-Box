# Chatter-Box

Welcome to **Chatter-Box**, a real-time chat application built with modern technologies. Chatter-Box allows users to connect, chat, and interact with each other in a vibrant and engaging environment.

## 🛠️ Features

- **Real-Time Chatting:** Users can chat in real-time with other users using WebSockets powered by [Socket.IO](https://socket.io/).
- **User Authentication:** Secure user registration and login.
- **Avatar Customization:** Users can set and change their avatar image.
- **Chat Functionality:** Engage in one-on-one chat conversations.
- **MongoDB Integration:** Data is stored and managed using [MongoDB](https://www.mongodb.com/).
- **Responsive Design:** A clean, modern UI designed to work on various devices.

  ## Technologies Used

**Chatter-Box** utilizes a variety of technologies to provide a modern and efficient chat experience. Here’s a breakdown of the technologies used in both the frontend and backend of the application:

### Frontend

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces. React allows for the creation of reusable UI components and provides an efficient way to manage the state of the application.

- **[styled-components](https://styled-components.com/)**: A library for styling React components using tagged template literals. It allows you to write CSS code within JavaScript files and helps keep the concerns of styling and component logic together.

### Backend

- **[Node.js](https://nodejs.org/)**: A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js allows for server-side scripting and provides an event-driven, non-blocking I/O model that makes it lightweight and efficient.

- **[Express](https://expressjs.com/)**: A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the creation of server-side logic and handling of HTTP requests and responses.

- **[Socket.IO](https://socket.io/)**: A JavaScript library for real-time web applications. Socket.IO enables real-time, bi-directional communication between web clients and servers, making it ideal for chat applications.

### Database

- **[MongoDB](https://www.mongodb.com/)**: A NoSQL database that uses a document-oriented data model. MongoDB allows for flexible schema design and efficient querying of large datasets, which is useful for storing user data and chat messages.



## 🖼️ Screenshots

Here are some screenshots of the Chatter-Box application:

![Chatter-Box Screenshot 1](./frontend/screenshots/Register.png)
![Chatter-Box Screenshot 2](./frontend/screenshots/Login.png)
![Chatter-Box Screenshot 3](./frontend/screenshots/Avatat.png)
![Chatter-Box Screenshot 4](./frontend/screenshots/Chat.png)

## 🚀 Getting Started

### Prerequisites

To run Chatter-Box locally, you need to have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/): Ensure you have MongoDB running locally or have a connection string for a remote MongoDB instance.


## 🌐 API Endpoints

Here are the available API endpoints for Chatter-Box:

- **`POST /`**: Register a new user.

- **`POST /login`**: Log in a user.

- **`POST /setAvatar`**: Set or update the user's avatar.

- **`POST /chat`**: Send a message in the chat.


## 🧪 Testing

To run tests for both frontend and backend:

- **Frontend:**

    ```bash
    cd frontend
    npm run dev
    ```

- **Backend:**

    ```bash
    cd backend
    npm start
    ```


## 📜 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication.
- [Emoji Mart](https://github.com/missive/emoji-mart) for the emoji picker.
- [React](https://reactjs.org/) for the frontend framework.
- [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) for the backend.
- [MongoDB](https://www.mongodb.com/) for the database management.

---

Thank you for checking out Chatter-Box!


