# MLM Web Project

This project is a simple web application for a referral system that allows users to register, make purchases, and view their earnings in real-time using Socket.IO for live updates.

## Project Structure

```
mlm-web-project
├── public
│   ├── index.html          # Main entry point of the web application
│   ├── register.html       # User registration page
│   ├── purchase.html       # Purchase page
│   ├── earnings.html       # Earnings display page
│   ├── js
│   │   ├── socket.js       # Socket.IO connection and real-time updates
│   │   ├── register.js      # User registration handling
│   │   ├── purchase.js      # Purchase handling
│   │   └── earnings.js      # Earnings fetching and display
│   └── css
│       └── styles.css      # CSS styles for the application
├── server.js               # Backend logic for user registration, purchases, and earnings
└── README.md               # Documentation for the project
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd mlm-web-project
   ```

2. **Install dependencies**:
   Make sure you have Node.js and MongoDB installed. Then run:
   ```
   npm install
   ```

3. **Start the MongoDB server**:
   Ensure your MongoDB server is running on `localhost:27017`.

4. **Run the application**:
   ```
   node server.js
   ```

5. **Access the application**:
   Open your web browser and go to `http://localhost:3000`.

## Usage

- **Register**: Navigate to the registration page to create a new user account.
- **Purchase**: After registration, go to the purchase page to make a purchase and earn referral bonuses.
- **Earnings**: View your earnings in real-time on the earnings page.

## Real-time Updates

This application uses Socket.IO to provide real-time updates for earnings. Ensure your browser allows WebSocket connections for the best experience.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.