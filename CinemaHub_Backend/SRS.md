# Software Requirements Specification (SRS)
## Cinema Hub Application

### 1. Introduction

#### 1.1 Purpose
The Cinema Hub application is a comprehensive cinema booking system that allows users to browse movies, book seats, and process payments securely. The system is built using microservices architecture with Spring Boot backend and React frontend.

#### 1.2 Scope
The system includes:
- User authentication and authorization
- Movie management and browsing
- Seat booking system
- Payment processing
- Role-based access control (Admin, Employee, User)

#### 1.3 Definitions, Acronyms, Abbreviations
- **API**: Application Programming Interface
- **JWT**: JSON Web Token
- **AOP**: Aspect-Oriented Programming
- **SRS**: Software Requirements Specification

### 2. Overall Description

#### 2.1 Product Perspective
Cinema Hub is a web-based application consisting of:
- Frontend: React application with modern UI
- Backend: Spring Boot microservices architecture
- Database: MySQL for data persistence
- Service Discovery: Eureka Server
- API Gateway: Spring Cloud Gateway

#### 2.2 Product Functions
1. User registration and login
2. Movie browsing and search
3. Seat selection and booking
4. Payment processing
5. Admin dashboard for movie management
6. Employee dashboard for booking management

#### 2.3 User Characteristics
- **Admin**: Full access to all system features, can manage movies, users, and bookings
- **Employee**: Can manage bookings and view movie information
- **User**: Can browse movies, book seats, and make payments

#### 2.4 Constraints
- System must be Dockerized for deployment
- Must use Spring Boot and Spring Cloud
- Must implement AOP for logging
- Must support role-based authorization

### 3. Functional Requirements

#### 3.1 User Authentication (FR-1)
- FR-1.1: Users must be able to register with username and password
- FR-1.2: Users must be able to login with credentials
- FR-1.3: System must generate JWT tokens upon successful login
- FR-1.4: Passwords must be encrypted using BCrypt

#### 3.2 Movie Management (FR-2)
- FR-2.1: Admin can add new movies
- FR-2.2: Admin can update movie details
- FR-2.3: Admin can delete movies
- FR-2.4: All users can browse available movies
- FR-2.5: Users can search movies by title or genre

#### 3.3 Booking System (FR-3)
- FR-3.1: Users can view available seats for a movie
- FR-3.2: Users can select seats for booking
- FR-3.3: System must prevent double booking of seats
- FR-3.4: Users can cancel bookings
- FR-3.5: Employees can view all bookings

#### 3.4 Payment Processing (FR-4)
- FR-4.1: Users can process payment for bookings
- FR-4.2: System must validate payment details
- FR-4.3: System must record payment status
- FR-4.4: System must implement AOP logging for payment operations

#### 3.5 Role-Based Access Control (FR-5)
- FR-5.1: Admin endpoints must be accessible only by ADMIN role
- FR-5.2: Employee endpoints must be accessible by ADMIN and EMPLOYEE roles
- FR-5.3: User endpoints must be accessible by all authenticated users

### 4. Non-Functional Requirements

#### 4.1 Performance
- NFR-1: API response time must be under 500ms for 90% of requests
- NFR-2: System must support 1000 concurrent users

#### 4.2 Security
- NFR-3: All communication must be encrypted (HTTPS)
- NFR-4: JWT tokens must expire after 24 hours
- NFR-5: Passwords must meet complexity requirements

#### 4.3 Scalability
- NFR-6: System must be horizontally scalable using microservices
- NFR-7: Each service must be independently deployable

#### 4.4 Maintainability
- NFR-8: Code must follow Spring Boot best practices
- NFR-9: System must use AOP for cross-cutting concerns

### 5. System Architecture

#### 5.1 Microservices
1. **Auth Service** (Port 8081): Handles authentication and authorization
2. **Movie Service** (Port 8082): Manages movie data
3. **Booking Service** (Port 8083): Handles seat bookings
4. **Payment Service** (Port 8084): Processes payments
5. **Eureka Server** (Port 8761): Service discovery
6. **API Gateway** (Port 8080): Single entry point for all requests

#### 5.2 Technology Stack
- Backend: Spring Boot 3.3.5, Spring Cloud 2023.0.3
- Frontend: React 19, Vite, Tailwind CSS
- Database: MySQL 8.0
- Containerization: Docker, Docker Compose
- Service Discovery: Netflix Eureka
- API Gateway: Spring Cloud Gateway

### 6. External Interface Requirements

#### 6.1 User Interfaces
- Web-based responsive interface
- Mobile-friendly design
- Dark/light mode support

#### 6.2 API Interfaces
- RESTful APIs following OpenAPI specification
- JSON request/response format
- JWT-based authentication

### 7. Use Cases

#### UC-1: User Registration
- Actor: Guest User
- Description: New user creates an account
- Precondition: User has valid email and password
- Postcondition: User account created with USER role

#### UC-2: Movie Booking
- Actor: Authenticated User
- Description: User books seats for a movie
- Precondition: User is logged in, movie has available seats
- Postcondition: Booking created, seats marked as booked

#### UC-3: Payment Processing
- Actor: Authenticated User
- Description: User pays for booking
- Precondition: Valid booking exists
- Postcondition: Payment recorded, booking confirmed

#### UC-4: Admin Movie Management
- Actor: Admin
- Description: Admin adds/updates/deletes movies
- Precondition: Admin is authenticated
- Postcondition: Movie database updated

### 8. Data Requirements

#### 8.1 User Data
- User ID (Long, auto-generated)
- Username (String, unique)
- Password (String, encrypted)
- Role (Enum: ADMIN, USER, EMPLOYEE)

#### 8.2 Movie Data
- Movie ID (Long, auto-generated)
- Title (String)
- Genre (String)
- Duration (Integer)
- Release Date (Date)
- Description (String)

#### 8.3 Booking Data
- Booking ID (Long, auto-generated)
- User ID (Long)
- Movie ID (Long)
- Seat Numbers (List)
- Booking Date (DateTime)
- Status (Enum: CONFIRMED, CANCELLED)

#### 8.4 Payment Data
- Payment ID (Long, auto-generated)
- Booking ID (Long)
- Amount (BigDecimal)
- Payment Date (DateTime)
- Status (Enum: SUCCESS, FAILED, PENDING)

### 9. Verification and Validation

#### 9.1 Testing
- Unit tests for all service layers
- Integration tests for API endpoints
- End-to-end tests for critical workflows

#### 9.2 Deployment
- Docker containerization for all services
- Docker Compose for orchestration
- Environment-specific configuration

### 10. Appendices

#### Appendix A: Glossary
- **Microservices**: Architectural style that structures an application as a collection of services
- **Service Discovery**: Mechanism for services to find each other
- **API Gateway**: Single entry point that routes requests to appropriate services

#### Appendix B: References
- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Cloud Documentation: https://spring.io/projects/spring-cloud
- React Documentation: https://react.dev
