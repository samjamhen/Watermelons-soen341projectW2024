# Watermelons-soen341projectW2024
# Overview
Welcome to our Car Catalog and Reservation System, developed as part of the SOEN 341: Software Process course. This web application is designed to provide users, particularly travelers and individuals in urgent need of a vehicle in Canada, with a seamless and convenient experience in selecting, reserving, and managing their vehicle rentals.

## Team Members
Quality Assurance/Testing: Benjamin Ho - 40249917 - [bxnjiho], 
Backend Developer: Samuel Henderson - 40248526 - [samjamhen],
DevOps Engineer: Ikram Kamal - 40248477 - [ikramkamal],
Frontend Developer: Uyi Oronsaye - 40089481 - [OGHO-SAYE],
Scrun Master: Yasmine Mouatif - 40249967 - [y-mouatif],
Project manager: Hanine Tydrini - 40226729 - [7anine]

## Project Description
### Car Catalog (Database)
Our system revolves around a comprehensive car catalog database, encompassing various categories such as compact, standard, intermediate, etc. Key attributes include:

- Category (e.g., compact, standard, intermediate)
- Type (Car, Van, SUV, etc)
- Brand
- Model
- Year
- Price

### Reservation System
**1. Selection Process:**
- Users can choose their preferred vehicle from the catalog, specifying pickup address and time.
- Prompted to either log in or create a new account to proceed with the reservation.

**2. Reservation Completion:**
- After selecting a vehicle, users are guided through the reservation process.
- Collect user information and ask for login or account creation.
Request pickup address, time, and vehicle details.

**3. Payment Process:**
- Upon completing the reservation, users are prompted for credit card information.
- Payment policies, such as partial payment or full payment, are to be determined.

**4. Confirmation:**
- Display completed reservations for users to review.
- Send email confirmations to users with reservation details.

**5. Modification and Cancellation:**
- Implement policies for modifying or canceling reservations (details to be determined).

**6. Feedback System:**
- Allow users to add comments and ratings for the rented vehicles.


## Technology Stack
The project is developed using the MERN stack:
- MongoDB: Database
- Express.js: Backend framework
- React: Frontend library
- Node.js: Backend runtime

## Target Audience
Our web application caters to travelers and individuals in urgent need of a vehicle in Canada. By enabling users to freely choose pickup locations, booking dates, and vehicle types, we aim to enhance their experience and provide a user-friendly platform for renting vehicles.

## Getting Started (Usage Guidelines and Instructions)
### Development guidelines:
We strive to follow the established rules and guidelines we've collectively devised to ensure our workflow operates efficiently. For a detailed overview of our guidelines, please consult our [GitHub Wiki](https://github.com/samjamhen/Watermelons-soen341projectW2024/wiki/Git-Rules).

### To set up the project locally, follow these steps:

1. Clone the repository.
2. If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org).
3. Install dependencies using ```npm install``` in both the client and server directories.
4. Set up the MongoDB database.
5. Run the server using ```npm run dev``` in the server directory.
6. Run the client using ```npm start``` in the client directory.

### Exploring the Application:
- Use the navigation and user interface provided to browse the car catalog, select vehicles, and make reservations.
- Follow the prompts for logging in or creating a new account to complete a reservation.
- Review completed reservations, modify or cancel as needed, and provide feedback on rented vehicles.

### Feedback and Support:
If you encounter any issues or have suggestions for improvement,reach out to any of the team members mentioned above. Feel free to explore the project!


## Note for Evaluators:
In order to properly test the functionality of the webpage, we have created access codes for the System Administrator and Customer Service Representative portals.
Use these accounts to log in. Note that for security reasons, as the login page is visible to all users including customers, there is no way to register as a CSR or Admin and access these functionalities if the passcodes for accounts have not been previously provided to you. 

- Customer Service Representative
EMAIL : ben514733@gmail.com 
PASSWORD: Password123! 

- System Administrator
EMAIL : benjaminho@gmail.ca 
PASSWORD : Qazwsxedc1!

Also, the mock credit cards are part of the database. Hence, only these can be used for booking reservations. Please note that the Mastercard's balance is purposefully low so that tests can be made for accounts that would not have the sufficient funds to make a reservation. It will be rejected during the check-in process.

- Visa 1
NUMBER: 4567123456789012
CVV: 123
EXPIRATION DATE: 12/26

- Visa 2
NUMBER: 4111111111111111
CVV: 123
EXPIRATION DATE: 08/26

- Mastercard
NUMBER: 5432987654321098
CVV: 456
EXPIRATION DATE: 09/25

## FULL DEMO SHOWCASING ALL FEATURES
Tap link [here](https://www.loom.com/share/6d2af05264cb4b38a1cadd11e0b09a14) to get access to our full demo where we showcase the core features.
