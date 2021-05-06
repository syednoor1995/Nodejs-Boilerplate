# Assignment

## How To Run
1) Clone the project in your local directory
    git clone https://github.com/syednoor1995/Assignment.git
2) Open the project in VS Code
3) Install all the necassary dependency by using the following command
    npm install
4) Run the Server by using the following command
    npm start
    
    
# Assignment detail description
The API should implement the following:

●Users Sign Up with (First Name, Last Name, Email Address,Password, Role[‘admin’,‘user’])
  User can be able to signup as a Admin OR User.
  
    -Method: POST
    -Route URL: http://localhost:4041/api/user/signup
    -Request Body:
    {
    "name": {
        "firstName": "syed",
        "lastName": "noor"
    },
    "email": "noorraza377@gmail.com",
    "password": "hello",
    "role": "user"
    }
●User sign in with JWT tokens

    -Method: POST
    -Route URL: http://localhost:4041/api/user/signin
    -Request Body:
    {
    "email": "noorraza377@gmail.com",
    "password": "hello"
    }
●Request to change user first or last name with authenticationand verification

    -Method: PUT
    -Route URL: http://localhost:4041/api/user/profile
    -Header: Pass JWT token in Authorization
    -Request Body:
    {
    "name": {
        "firstName": "syedaa12",
        "lastName": "noora"
    }
    }
●Store authenticated user customer support ticket bystoring (User ID, Message)

    -Method: PUT
    -Route URL: http://localhost:4041/api/ticket
    -Header: Pass JWT token in Authorization
    -Request Body:
    {
    "name": {
        "firstName": "syedaa12",
        "lastName": "noora"
    }
    }
●Admin user request to list customer support tickets

    -Method: GET
    -Route URL: http://localhost:4041/api/ticket
    -Header: Pass JWT token in Authorization
    -Request Body:None
    -Response: Returns an array of customer support tickets
