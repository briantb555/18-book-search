import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
        }
        }
    }
    `;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
        }
        }
    }
    `;

export const SAVE_BOOK = gql`
mutation SaveBook($authors: [String], $description: String, $title: String, $bookId: ID, $image: String, $link: String) {
  saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
    _id
    bookCount
    email
    username
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    bookCount
    email
    username
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}`;