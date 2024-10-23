# React CRUD

This is a React application that implements a CRUD operation along with a user management system. It includes features such as signup, login, profile editing, password changes, product listing via API, and viewing product details via API.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [React Library](#react-library)

## Installation

To set up and run this project locally, follow the steps below:

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd React-CRUD

   ```

2. **Install dependencies:**:

   ```bash
   npm install
   ```

3. **Run the development server:**:

   ```bash
   npm run start
   ```

## Project Structure

```bash
 src/
├── components/
│   └── Auth/
│       └── SignUp/
│           ├── SignUp.js
│           └── SignUp.module.css
│   └── Products/
│           ├── ProductList.js.js
│           └── ProductList.module.css
├── context/
│   └── AuthContext.js
├── Routes/
│   └── Routes.js
├── styles/
│   └── variable.css
├── utils/
│   ├── common.js
│   ├── config.js
│   └── functions.js
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── ProtectedRoute.js
├── reportWebVitals.js
├── setupTests.js
└── .gitignore
```

## Features

### 1. Authentication

- **Login**: A simple login page that authenticates users. If the password is correct, the user should be logged in. If the password is incorrect, an error message should be displayed. Additionally, if the email does not exist, another error message should indicate this.
- **Register**: A registration page for new users. It should check whether the email already exists; if it does, an error message should be displayed. When a user signs up, their data should be stored in local storage, and the password must be encrypted for security purposes.
- **Forgot Password**: A password reset feature that provides error messages in the following scenarios: if the current password does not match the user's existing password, if the new password and the confirm new password fields do not match, and if the new password does not meet the required format. The password format must consist of 8 to 32 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.

### 2. Product Module

- List all the products
- Implement pagination, showing 8 products per page.
- Each product listing should display a thumbnail image, title, category, brand name, rating, price, and discount percentage

### 3. View Product

- Display details of a selected product
- Show all product data except the ID. This data should be retrieved from the API.

## React Library

1. **Validation**  
   We use React Hook Form for validation.

2. **Design Choices**  
   We use Material UI for the design.

3. **Encrypted Password**  
   We use CryptoJS for encrypting passwords.
