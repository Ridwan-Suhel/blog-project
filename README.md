## Project Brief:

Welcome to my Blog project a robust, scalable and feature rich API for creating beautiful blog. Designed to facilitate user interaction through creating, updating, and deleting blogs while ensuring secure and efficient access control.

### Key features:
User role and permission
- Admin role: 
    - Manage users, including editing, or blocking user accounts.
    - Admin delete any blog but Cannot update any blog.

- User role: 
    - User can register and log in.
    - Manage blogs, including adding, editing, or deleting blogs (only when logged in).

    - Enforced access control based on user roles to restrict unauthorized actions and enhance platform security.

    - Implemented user authentication using JWT (JSON Web Tokens) to ensure secure login

### Public API for Blogs:
A publicly accessible API to allow blog viewing with advanced functionalities:
- search: Search blogs by title or content (e.g., search=technology).
- sortBy: Sort blogs by specific fields such as createdAt or title.
- sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending).
- filter: Filter blogs by author ID.

### Getting Started
Follow these instructions to set up the project locally.

### Prerequisites
Make sure you have the following installed:

 - node.js (v22.11.0)
 - mongoose
 - express
 - dotenv
 - cors
 - zod
 - typescipt
 - bcrypt
 - jsonwebtoken

use a package manager such as (npm, yarn)

also use "typescript" for devDependencies. 

here is the all dependency lists with versions
```json
"dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.1",
    "zod": "^3.23.8"
  },
```

### Installation guide

Here is github repositories link : https://github.com/Ridwan-Suhel/blog-project.git
please use: git clone https://github.com/Ridwan-Suhel/blog-project.git

then install npm: npm install

Setup .env file in locally  

DATABASE_URL=""  
PORT=5000

use "npm run start" to run the server
use "npm run lint" to check for any issues

### Built with 💗:

    - Backend Framework: Node.js with Express.js.
    - Language: TypeScript for improved type safety and maintainable code.
    - Database: MongoDB for storing user data and blogs.
    - Authentication: JWT for secure access.
    - Middleware: Custom and third-party middleware for validation and security.

### About Me 🙋‍♂️
Hi! My name is **Ridwan Suhel**. I'm a passionate developer who loves creating efficient and user-friendly solutions. This project reflects my skills in backend development and API design.

### Links 🔗
- **GitHub Repository**: [Blog Platform Backend Project Github Repo](https://github.com/Ridwan-Suhel/blog-project.git)
- **Live API**: [Blog Project API on Vercel](https://blog-project-api-github.vercel.app/)

Feel free to explore the API