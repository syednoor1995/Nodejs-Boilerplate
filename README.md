

# Boilerplate

# JWT Token will be returned in the Response Header with the key "x-auth"
## How To Run
1) Clone the project in your local directory
    git clone https://github.com/syednoor1995/Assignment.git
2) Open the project in VS Code
3) Install all the necassary dependency by using (npm install) command in terminal.
4) Run the Server by using (npm start) command in terminal.

    
### PostMan collection URL
You can simply import the collections also by using the link below
https://www.getpostman.com/collections/fa0edab71b63fed622e2

Steps:
1) open postman
2) click on import
3) select the Link.
4) past the link.
Note for POSTMAN ENV: 
    -Select Dev environment.


#### How to run Test Case
    -Run this command (npm test)
    
##### Assignment detail description
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
	-Response: Token will be returned in the Response Header
	(x-auth)	
●User sign in with JWT tokens

    -Method: POST
    -Route URL: http://localhost:4041/api/user/login
    -Request Body:
    {
    "email": "noorraza377@gmail.com",
    "password": "hello"
    }
	-Response: Token will be returned in the Response Header
	(x-auth)
●Request to change user first or last name with authenticationand verification

    -Method: PUT
    -Route URL: http://localhost:4041/api/user/profile
    -Header: Pass JWT token in Request header with the key Authorization
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
    -Header: Pass JWT token in Request header with the key Authorization
    -Request Body:
    {
    "name": {
        "firstName": "syedaa12",
        "lastName": "noora"
    }
    }
●Admin user request to list customer support tickets (by default it will fetch first 10 records)

    -Method: GET
    -Route URL: http://localhost:4041/api/ticket
    -Header: Pass JWT token in Request header with the key Authorization
    -Request Body:None
    -Response: Returns an array of customer support tickets
    
●Admin user request to list customer support tickets (with pagination)

    -Method: GET
    -Route URL: http://localhost:4041/api/ticket?limit=30&page=1
    -Header: Pass JWT token in Request header with the key Authorization
    -Request Body:None
    -Response: Returns an array of customer support tickets
