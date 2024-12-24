

# Book Search Engine

This is a full-stack web application that allows users to search for books using the Google Books API and save their favorite books to their profile. The application is built with React on the client side and Node.js with Express and Apollo Server on the server side. It uses MongoDB for data storage and GraphQL for API queries and mutations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Live Site](#Render) 
- [License](#license)

## Installation

1. Clone the repository:

   git clone https://github.com/briantb555/18-book-search
2. Install dependencies for both client and server:

   npm run install

   npm run build
3. Create a .env file in the server directory and add your MongoDB URI and JWT secret key:

   MONGODB_URI='mongodb://localhost:27017/googlebooks'

   JWT_SECRET_KEY=''
4. Start the development server:

   npm run develop

## Usage

1. Open your browser and navigate to http://localhost:3000.
2. Use the search bar to search for books.
3. Sign up or log in to save your favorite books.
4. View your saved books by navigating to the "See Your Books" page.

## Features

- User authentication with JWT
- Search for books using the Google Books API
- Save and remove books from your profile
- Responsive design with React Bootstrap

## Technologies

- Client:

  • React

  • Apollo Client

  • React Router

  • Bootstrap

  • Vite
- Server:

  • Node.js

  • Express

  • Apollo Server

  • MongoDB

  • JWT

## Render

https://one8-book-search.onrender.com

## License

This project is licensed under the MIT License 🪪.