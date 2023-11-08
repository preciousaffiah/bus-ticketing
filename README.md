# BUST ICKETING

A bus ticketing platform that gives people the:

* Ability to create an account on the platform
* Ability to log in and create a bus ticket ID for the user
* Ability to credit their bus ticket account (id) (no payment gateway)
* Ability to pay for a ticket via their account
* Ability to view all their transactions (in and out) and query per date(month)
* Ability to send another user credit from their account.
 

## Prerequisites

- Node.js installed
- XAMPP installed
- Git installed
- Postman installed
- A code editor (e.g Visual Studio Code)


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/preciousaffiah/bus-ticketing.git

2. Change to the project directory:
    ```bash
    cd bus-ticketing

3. install project dependencies:
    ```bash
    npm install

4. Create a '.env' file in the project root with the following environment variables:
    ```dotenv
    PORT=port
    JWT_SECRET=secret
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_HOST=localhost
    DB_PORT=3306

Update the values with your MySQL database credentials.

5. Open your XAMPP and start Apache and MySQL and create a database with the name you specified in 
    your '.env' file.

7. Start the application:
    ```bash
    npm start


## Usage

1. Open postman and import the json file in your project folder named Bus Ticketing.postman_collection.json

2. Data has already been placed for you

3. Log in or register and copy the token that returned with the users data

4. Update the 'AuthToken' environment variable with that token or just paste the token
   in the header when making a request

5. Go ahead and make other requests!


## Test

1. Before you run the tests you have to replace the data in the "Transfer funds endpoint" test with
   an existing ticket account id

2. Run the tests: 
    ```bash
    npm run test