# System Diagrams - Cinema Hub Application

## 1. Use Case Diagram

```
                    +-------------------+
                    |      Cinema Hub    |
                    +-------------------+
                              |
        +---------------------+---------------------+
        |                     |                     |
+-------v------+    +--------v--------+    +-------v-------+
|     User     |    |    Employee     |    |     Admin     |
+--------------+    +-----------------+    +---------------+
        |                     |                     |
        |                     |                     |
        +---------------------+---------------------+
                              |
                    +---------v---------+
                    |   Use Cases:      |
                    +-------------------+
                    | - Register        |
                    | - Login           |
                    | - Browse Movies   |
                    | - Book Seats      |
                    | - Make Payment    |
                    | - Cancel Booking  |
                    | - Manage Movies   |
                    | - View Bookings   |
                    +-------------------+
```

### Use Case Descriptions

**UC-1: Register**
- Actor: Guest User
- Description: Create a new user account
- Precondition: User provides valid credentials
- Postcondition: Account created with USER role

**UC-2: Login**
- Actor: User, Employee, Admin
- Description: Authenticate with credentials
- Precondition: Valid username and password
- Postcondition: JWT token generated

**UC-3: Browse Movies**
- Actor: All authenticated users
- Description: View available movies
- Precondition: User is logged in
- Postcondition: Movie list displayed

**UC-4: Book Seats**
- Actor: User
- Description: Select and book seats for a movie
- Precondition: Movie has available seats
- Postcondition: Seats reserved, booking created

**UC-5: Make Payment**
- Actor: User
- Description: Process payment for booking
- Precondition: Valid booking exists
- Postcondition: Payment processed, booking confirmed

**UC-6: Cancel Booking**
- Actor: User
- Description: Cancel an existing booking
- Precondition: Booking exists and not paid
- Postcondition: Booking cancelled, seats released

**UC-7: Manage Movies**
- Actor: Admin
- Description: Add, update, or delete movies
- Precondition: Admin is authenticated
- Postcondition: Movie database updated

**UC-8: View Bookings**
- Actor: Employee, Admin
- Description: View all system bookings
- Precondition: Employee or Admin is authenticated
- Postcondition: Booking list displayed

---

## 2. Class Diagram

```
+-------------------+       +-------------------+
|      User         |       |      Movie        |
+-------------------+       +-------------------+
| - id: Long        |       | - id: Long        |
| - username: String|       | - title: String    |
| - password: String|       | - genre: String    |
| - role: Role      |       | - duration: Integer|
+-------------------+       | - releaseDate: Date|
| + register()      |       | - description: String|
| + login()         |       +-------------------+
| + updateProfile() |       | + addMovie()       |
+-------------------+       | + updateMovie()    |
         |                   | + deleteMovie()   
         |                   | + getMovies()     
         |                   +-------------------+
         |                            |
         |                            |
         v                            v
+-------------------+       +-------------------+
|     Booking       |       |     Payment       |
+-------------------+       +-------------------+
| - id: Long        |       | - id: Long        |
| - userId: Long    |       | - bookingId: Long |
| - movieId: Long   |       | - amount: BigDecimal|
| - seats: List<Seat>|      | - paymentDate: Date|
| - bookingDate: Date|      | - status: PaymentStatus|
| - status: BookingStatus|   +-------------------+
+-------------------+       | + processPayment()|
| + bookSeats()     |       | + refundPayment() |
| + cancelBooking() |       | + getPaymentStatus()|
| + getBookingDetails()    +-------------------+
+-------------------+

+-------------------+
|      Seat         |
+-------------------+
| - id: Long        |
| - seatNumber: String|
| - type: SeatType  |
| - isBooked: Boolean|
+-------------------+
| + bookSeat()      |
| + releaseSeat()   |
| + getSeatStatus() |
+-------------------+
```

### Class Descriptions

**User**
- Represents system users with roles (ADMIN, EMPLOYEE, USER)
- Contains authentication credentials
- Methods for registration, login, profile management

**Movie**
- Represents movie information
- Contains movie details (title, genre, duration, etc.)
- CRUD operations managed by Admin

**Booking**
- Represents seat bookings for movies
- Links users to movies with selected seats
- Tracks booking status (CONFIRMED, CANCELLED)

**Payment**
- Represents payment transactions
- Links to bookings
- Tracks payment status (SUCCESS, FAILED, PENDING)

**Seat**
- Represents individual cinema seats
- Contains seat type (VIP, Regular, etc.)
- Tracks booking status

---

## 3. Sequence Diagram - Booking Flow

```
User        Frontend      API Gateway   Auth Service  Movie Service  Booking Service  Payment Service
 |              |              |              |              |              |              |
 |--Register-->|              |              |              |              |              |
 |              |--POST /auth-->|              |              |              |              |
 |              |              |--Validate-->|              |              |              |
 |              |              |<--Token------|              |              |              |
 |              |<--Token------|              |              |              |              |
 |<--Success----|              |              |              |              |              |
 |              |              |              |              |              |              |
 |--Login------>|              |              |              |              |              |
 |              |--POST /auth-->|              |              |              |              |
 |              |              |--Authenticate->|              |              |              |
 |              |              |<--JWT Token---|              |              |              |
 |              |<--JWT Token--|              |              |              |              |
 |<--Token------|              |              |              |              |              |
 |              |              |              |              |              |              |
 |--Browse Movies------------>|              |              |              |              |
 |              |--GET /movies-->|              |              |              |              |
 |              |              |<--Movie List--|              |              |              |
 |              |<--Movie List--|              |              |              |              |
 |<--Movie List-|              |              |              |              |              |
 |              |              |              |              |              |              |
 |--Book Seats-->|              |              |              |              |              |
 |              |--POST /bookings->|              |              |              |              |
 |              |              |              |--Check Seats->|              |              |
 |              |              |              |<--Available--|              |              |
 |              |              |              |--Reserve Seats->|              |              |
 |              |              |              |<--Booking ID-|              |              |
 |              |<--Booking ID--|              |              |              |              |
 |<--Booking ID--|              |              |              |              |              |
 |              |              |              |              |              |              |
 |--Make Payment------------>|              |              |              |              |
 |              |--POST /payments->|              |              |              |              |
 |              |              |              |              |--Process Payment-->|
 |              |              |              |              |<--Payment Status-|
 |              |<--Payment Status-|              |              |              |              |
 |<--Payment Status----------|              |              |              |              |
```

### Sequence Descriptions

1. **User Registration**
   - User submits registration form
   - Frontend sends request to API Gateway
   - Auth Service validates and creates user
   - JWT token returned

2. **User Login**
   - User submits credentials
   - Auth Service authenticates user
   - JWT token generated and returned

3. **Movie Browsing**
   - User requests movie list
   - API Gateway routes to Movie Service
   - Movie Service returns available movies

4. **Seat Booking**
   - User selects seats
   - Booking Service checks availability
   - Seats reserved and booking ID returned

5. **Payment Processing**
   - User submits payment
   - Payment Service processes transaction
   - Payment status returned

---

## 4. Activity Diagram - Booking Process

```
                +----------------+
                |    Start       |
                +----------------+
                        |
                        v
                +----------------+
                |  User Login    |
                +----------------+
                        |
                        v
                +----------------+
                | Browse Movies  |
                +----------------+
                        |
                        v
                +----------------+
                | Select Movie   |
                +----------------+
                        |
                        v
                +----------------+
                | View Available |
                |     Seats      |
                +----------------+
                        |
                        v
                +----------------+
                | Select Seats   |
                +----------------+
                        |
                        v
                +----------------+
                |  Check Seats   |
                +----------------+
                        |
            +-----------+-----------+
            |                       |
            v                       v
    +----------------+    +----------------+
    | Seats Available |    | Seats Booked   |
    +----------------+    +----------------+
            |                       |
            v                       |
    +----------------+              |
    | Create Booking |              |
    +----------------+              |
            |                       |
            v                       |
    +----------------+              |
    | Process Payment|              |
    +----------------+              |
            |                       |
            v                       |
    +----------------+              |
    | Payment Success|              |
    +----------------+              |
            |                       |
            v                       |
    +----------------+              |
    | Confirm Booking|              |
    +----------------+              |
            |                       |
            v                       |
    +----------------+              |
    | Send Confirmation|           |
    +----------------+              |
            |                       |
            v                       |
    +----------------+              |
    |      End       |<-------------+
    +----------------+
```

### Activity Descriptions

1. **Start**: User initiates booking process
2. **User Login**: User authenticates with credentials
3. **Browse Movies**: User views available movies
4. **Select Movie**: User chooses a movie to book
5. **View Available Seats**: System shows available seats for selected movie
6. **Select Seats**: User chooses seats to book
7. **Check Seats**: System verifies seat availability
8. **Decision Point**: 
   - If seats available: proceed with booking
   - If seats booked: show error and return to seat selection
9. **Create Booking**: System creates booking record
10. **Process Payment**: User submits payment details
11. **Payment Success**: System validates and processes payment
12. **Confirm Booking**: Booking is confirmed
13. **Send Confirmation**: User receives booking confirmation
14. **End**: Process completes

---

## 5. Component Diagram (Microservices Architecture)

```
                    +-------------------+
                    |     Frontend      |
                    |   (React App)     |
                    +-------------------+
                              |
                              | HTTP/REST
                              v
                    +-------------------+
                    |   API Gateway     |
                    |   (Port 8080)     |
                    +-------------------+
                              |
                +-------------+-------------+
                |             |             |
                v             v             v
    +----------------+ +----------------+ +----------------+
    |  Auth Service  | | Movie Service  | |Booking Service |
    |   (Port 8081)  | |   (Port 8082)  | |   (Port 8083)  |
    +----------------+ +----------------+ +----------------+
                |             |             |
                v             v             v
    +----------------+ +----------------+ +----------------+
    | Payment Service| |                | |
    |   (Port 8084)  | |                | |
    +----------------+ +----------------+ +----------------+
                |             |             |
                +-------------+-------------+
                              |
                              v
                    +-------------------+
                    |   Eureka Server   |
                    |   (Port 8761)     |
                    +-------------------+
                              |
                +-------------+-------------+
                |             |             |
                v             v             v
    +----------------+ +----------------+ +----------------+
    |  MySQL Database| |  MySQL Database| |  MySQL Database|
    |   (demo_db)    | |   (cinema)     | | (booking-service)|
    +----------------+ +----------------+ +----------------+
```

### Component Descriptions

**Frontend (React)**
- User interface for all interactions
- Communicates with API Gateway
- Handles authentication state
- Displays movies, seats, booking forms

**API Gateway**
- Single entry point for all requests
- Routes requests to appropriate microservices
- Handles load balancing
- Implements security filters

**Auth Service**
- Handles user registration and login
- Generates and validates JWT tokens
- Manages user roles and permissions
- Port: 8081

**Movie Service**
- Manages movie data
- Provides movie search and filtering
- Handles movie CRUD operations
- Port: 8082

**Booking Service**
- Manages seat bookings
- Tracks seat availability
- Handles booking cancellations
- Port: 8083

**Payment Service**
- Processes payment transactions
- Implements AOP logging
- Tracks payment status
- Port: 8084

**Eureka Server**
- Service discovery registry
- Enables microservices to find each other
- Port: 8761

**MySQL Databases**
- Separate databases for each service
- demo_db: Auth service
- cinema: Movie service
- booking-service: Booking service
- payment_db: Payment service

---

## 6. Deployment Diagram

```
                    +-------------------+
                    |   Docker Host     |
                    +-------------------+
                              |
        +---------------------+---------------------+
        |                     |                     |
+-------v------+    +--------v--------+    +-------v-------+
|   Container  |    |    Container    |    |   Container   |
|   MySQL       |    |   Eureka Server |    |  API Gateway  |
+--------------+    +-----------------+    +--------------+
        |                     |                     |
+-------v------+    +--------v--------+    +-------v-------+
|   Container  |    |    Container    |    |   Container   |
| Auth Service |    |  Movie Service  |    |Booking Service|
+--------------+    +-----------------+    +--------------+
        |                     |                     |
+-------v------+    +--------v--------+    +-------v-------+
|   Container  |    |    Container    |    |   Container   |
|Payment Service|   |   Frontend      |    |               |
+--------------+    +-----------------+    +--------------+
                              |
                              v
                    +-------------------+
                    |   Docker Network  |
                    |   cinema-network  |
                    +-------------------+
```

### Deployment Descriptions

**Docker Host**
- Physical or virtual machine running Docker
- Hosts all application containers

**Containers**
- Each microservice runs in separate container
- Isolated environments
- Scalable independently

**Docker Network**
- Internal network for container communication
- Service discovery via container names
- External access via exposed ports

**Docker Compose**
- Orchestrates container startup/shutdown
- Manages dependencies between services
- Handles volume mounts and environment variables
