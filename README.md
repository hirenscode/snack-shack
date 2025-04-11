# Snack Shack - Food Ordering System

A React-based food ordering system with admin dashboard for managing menus and orders.

## Features

- User-friendly food ordering interface
- Real-time order tracking
- Admin dashboard for managing:
  - Menu items
  - Orders
  - User authentication
- Firebase integration for:
  - Authentication
  - Real-time database
  - Storage for menu images

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Firebase account

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snack-shack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Create a `.env` file in the root directory with your Firebase config:
     ```
     REACT_APP_API_KEY=your-api-key
     REACT_APP_AUTH_DOMAIN=your-auth-domain
     REACT_APP_DATABASE_URL=your-database-url
     REACT_APP_PROJECT_ID=your-project-id
     REACT_APP_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_APP_ID=your-app-id
     ```

4. **Firestore Setup**
   - Create a collection named `users_type`
   - Add a document with the following structure:
     ```json
     {
       "uid": "admin-user-uid",
       "type": "admin"
     }
     ```
   - Replace `admin-user-uid` with the UID of your admin user from Firebase Authentication

5. **Firestore Security Rules**
   Update your Firestore security rules to:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users_type/{document=**} {
         allow read: if request.auth != null;
       }
       
       match /menus/{document=**} {
         allow read: if true;
         allow write: if request.auth != null && 
           exists(/databases/$(database)/documents/users_type/$(request.auth.uid)) &&
           get(/databases/$(database)/documents/users_type/$(request.auth.uid)).data.type == "admin";
       }
       
       match /orders/{document=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
       
       match /orders_flow/{document=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
       
       match /notifications/{document=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
     }
   }
   ```

## Running the Application

1. **Development Mode**
   ```bash
   npm start
   ```
   Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. **Production Build**
   ```bash
   npm run build
   ```
   Builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── admin/         # Admin-specific components
│   ├── login/         # Login-related components
│   ├── orders-list/   # Order management components
│   └── place-order/   # Order placement components
├── common/            # Shared components and utilities
├── firebase.js        # Firebase configuration
└── App.js            # Main application component
```

## Technologies Used

- React 18
- React Router v6
- Firebase
  - Authentication
  - Firestore
  - Storage
- Bootstrap 4
- SASS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
