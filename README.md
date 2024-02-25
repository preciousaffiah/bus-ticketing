# BUS TICKETING

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
    JWT_SECRET=secret
    MONGODB_URI=mongodb_uri
Update the values with yours.


5. Start the application:
    ```bash
    npm start


## Usage

1. Use the [API postman documentation](https://lively-meadow-916190.postman.co/workspace/Team-Workspace~a5162da0-008b-430e-8287-3ff7cd09c691/collection/18567529-3a0cb709-dad0-4cc0-ad06-3d3f70c98a5c?action=share&creator=18567529) to send requests

3. Data has already been placed for you

4. Log in or register and copy the token that returned with the users data

5. Update the 'token' variable in the 'bus ticketing' environment with that token or just paste the token
   in the header when making a request

6. Go ahead and make other requests!


## Test

1. Before you run the tests you have to replace the data in the "Transfer funds endpoint" test with
   an existing ticket account id

2. Run the tests: 
    ```bash
    npm run test
