# 💬 Real‑Time Chat Application in Python

[![Python Version](https://img.shields.io/badge/python-3.7%2B-blue)](https://www.python.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A simple **client‑server** chat application built from scratch in Python using the `socket` and `threading` modules. It supports two‑way, real‑time messaging in the terminal and demonstrates core networking and concurrency concepts.

---

## 📝 Table of Contents

1. [Features](#features)  
2. [Prerequisites](#prerequisites)  
3. [Getting Started](#getting-started)  
   - [Clone the Repo](#clone-the-repo)  
   - [Run the Server](#run-the-server)  
   - [Run the Client](#run-the-client)  
4. [Project Structure](#project-structure)   
5. [What I Learned](#what-i-learned)  
6. [Future Improvements](#future-improvements)  
7. [Contributing](#contributing)  
8. [License](#license)  

---

## 🔥 Features

- 🔄 **Two‑way real‑time chat** over TCP (localhost)  
- 🤖 **Multithreading** for simultaneous send/receive  
- 🌐 **Client‑Server architecture** using Python’s `socket` API  
- 🛡️ Graceful shutdown via the `"exit"` command  
- 📚 Clean, well‑commented code for learning and extension  

---

## ⚙️ Prerequisites

- Python 3.7 or higher  
- Basic familiarity with command‑line/terminal  
- (Optional) Git for version control

---

## 🚀 Getting Started

### Clone the Repo

```bash
git clone https://github.com/Ansh-1019/chat_application.git
cd chat_application
```
---

### Run the server

Open terminal 1:
```bash
python server.py
```
---
### Run the client

Open terminal 2:
```bash
python client.py
```

## 📁 Project Structure
```bash
chat_application/
├── server.py           # Starts the chat server
├── client.py           # Connects as chat client
├── README.md           # Project overview and instructions
└── LICENSE             # MIT License
```
## 📚 What I Learned

- Fundamental socket programming (AF_INET, SOCK_STREAM, bind, listen, accept, connect).

- Multithreading in Python and thread lifecycle (start(), join()).

- Handling I/O‑bound tasks concurrently despite the GIL.

- Graceful error handling (using try/except) in network code.

- Debugging real‑world issues: thread start/join errors, port conflicts, Git branch problems.

## 🚧 Future Improvements

- ✅ Multi‑client support (broadcast to all clients).

- ✅ Message history storage (e.g., in a file or database).

- ✅ GUI front‑end (Tkinter, PyQt, or web-based with Flask + WebSockets).

- ✅ Encryption using SSL/TLS.

- ✅ Dockerization for easy deployment.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1.Fork the repository

2.Create a feature branch (git checkout -b feature/YourFeature)

3.Commit your changes (git commit -m "Add YourFeature")

4.Push to the branch (git push origin feature/YourFeature)

5.Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

Made with ❤️ by Ansh Jaiswal

---