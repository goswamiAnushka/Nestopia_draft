# Nestopia

**Nestopia** is a cutting-edge home rental website that facilitates direct interaction between buyers and sellers, eliminating the need for third-party intermediaries or broker charges. Built with the MERN stack, Nestopia leverages JWT for authentication, Socket.io for real-time chat functionality, and Dialogflow for an intelligent chatbot, creating a seamless and engaging user experience.

## Features

- **Direct Buyer-Seller Interaction**: Connect with sellers directly without intermediaries.
- **Real-Time Chat**: Engage in live conversations with sellers using Socket.io.
- **Responsive Design**: Fully responsive layout ensuring optimal user experience on all devices.
- **Secure Authentication**: Implemented JWT for secure user authentication and authorization.
- **OTP Verification**: Used Nodemailer for OTP (One-Time Password) email verification.
- **Intelligent Chatbot**: Integrated Dialogflow chatbot to assist users with queries and support.
- **Comprehensive API Testing**: Utilized Postman for thorough API testing.
- **Prisma ORM**: Used Prisma for efficient database management and interactions.

## Tech Stack

- **Frontend**: React, Vite, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Real-Time Communication**: Socket.io
- **ORM**: Prisma
- **Chatbot**: Dialogflow
- **Email Service**: Nodemailer
- **Testing**: Postman

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB instance running locally or remotely
- npm or Yarn package manager

### Installation Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/nestopia.git
    cd nestopia
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Environment Configuration**

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGO_URI=mongodb://localhost:27017/nestopia
    JWT_SECRET=your_secret_key
    EMAIL_SERVICE=your_email_service_provider
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_password
    SOCKET_PORT=3000
    ```

4. **Database Setup**

    Run the following command to start MongoDB:

    ```bash
    mongod --dbpath=data/db
    ```

5. **Run the Application**

    Start the backend server with Nodemon on port 8800:

    ```bash
    nodemon index.js
    ```

    Start the frontend development server on port 5173:

    ```bash
    npm run dev
    ```

    Navigate to `http://localhost:5173` to view the application.

## Features Overview

### Home Rental Listings

- **Search and Filter**: Easily search and filter properties based on various criteria.
- **Detailed Listings**: View detailed information about each property.

### Real-Time Chat

- **Live Interaction**: Engage with sellers in real-time using the chat feature.

### OTP Verification

- **Email Verification**: Secure user registration with OTP sent via email using Nodemailer.

### Chatbot Support

- **Dialogflow Integration**: Get instant responses to common queries and support requests.

### User Authentication

- **Sign Up / Log In**: Secure user registration and login with JWT.
- **Profile Management**: Update and manage user profiles.

### API Testing

- **Postman Collection**: Test APIs using the provided Postman collection.

## Screenshots
Homepage:

![Untitled design (5)](https://github.com/user-attachments/assets/16665a39-065e-4eca-8f0f-e9e00d917723)

Login and otp generation:

![Untitled design (6)](https://github.com/user-attachments/assets/29c04af3-7f7f-4f86-975c-d620280655ce)

Direct Interaction and real time chat:

![Untitled design (7)](https://github.com/user-attachments/assets/7c08f19d-8bd4-4ebc-805f-1e3fefd40dc6)

Dialogflow Chatbot:

<img width="959" alt="chat bot" src="https://github.com/user-attachments/assets/5a64f163-4eba-4858-896f-eeeabd6348d5">


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For support or inquiries, contact us at [support@nestopia.com](mailto:anushka.goswami2520@gmail.com).
