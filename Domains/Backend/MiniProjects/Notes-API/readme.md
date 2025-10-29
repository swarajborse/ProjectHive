# 🗒️ Simple Notes API

A **simple backend API** built using **Node.js** and **Express.js** that allows users to create, view, and delete notes. It's a great project for beginners learning **RESTful APIs** and **Express basics** 🚀.

---

## 🧠 Features

* **➕ Add a new note**: Create a new note entry.
* **📋 View all notes**: Retrieve a list of all existing notes.
* **❌ Delete a note**: Remove a specific note by its ID.
* **💾 Local Data Storage**: All data is stored in a local `notes.json` file.

---

## ⚙️ Tech Stack

* **Node.js**: JavaScript runtime environment.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
* **File System (`fs`) module**: Used for reading and writing data to `notes.json`.

---

## 📂 Folder Structure

Notes-API/ ├── server.js # Main backend server application ├── notes.json # Local data storage file └── package.json # Project dependencies and scripts


---

## 🛠️ Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/](https://github.com/)<your-username>/Notes-API.git
    cd Notes-API
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the server**:
    ```bash
    npm start
    ```
    The server will start on 👉 **http://localhost:3000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/notes` | Get all notes |
| **POST** | `/notes` | Add a new note |
| **DELETE** | `/notes/:id` | Delete a note by its ID |

### Example Request (POST /notes)

To add a new note, send a JSON body like this:

```json
{
  "text": "Learn Express.js"
}
```

### 🧪 Example Usage
You can easily test the API using:

> Postman

> cURL

> Any frontend application or browser client.

### 🎯 Future Improvements
> ✏️ Edit existing notes (PUT route): Implement functionality to update note content.

> 🗗️ Replace JSON with MongoDB: Migrate from file-based storage to a proper database for persistent and scalable data storage.

>🧍 Add user authentication: Secure the API with user sign-up and login features.ith user sign-up and login features.
