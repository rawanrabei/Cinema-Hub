# OCL (Object Constraint Language) Constraints - Cinema Hub Application

## Overview
This document describes all Object Constraint Language (OCL) constraints implemented in the Cinema Hub application. OCL is a formal language used to specify constraints on object-oriented models, ensuring data integrity and business rule enforcement.

---

## 1. User Entity Constraints

### Context: User

**Invariant Constraints:**
```ocl
context User inv:
  self.username.size() >= 3 and self.username.size() <= 50
  self.email.matches('^[A-Za-z0-9+_.-]+@(.+)$')
  self.password.size() >= 8
  self.password.matches('.*[A-Z].*') and self.password.matches('.*[a-z].*')
  self.password.matches('.*[0-9].*') and self.password.matches('.*[!@#$%^&*].*')
  self.role <> null
```

**Explanation:**
- Username must be between 3 and 50 characters
- Email must match valid email format
- Password must be at least 8 characters
- Password must contain at least one uppercase letter
- Password must contain at least one lowercase letter
- Password must contain at least one number
- Password must contain at least one special character (!@#$%^&*)
- Role must not be null

**Operation Constraints:**
```ocl
context User::register() : Boolean
  pre: self.username.size() >= 3 and self.email.matches('^[A-Za-z0-9+_.-]+@(.+)$')
  post: self.id <> null and self.role = Role.USER
```

**Implementation:**
- File: `auth-service/src/main/java/com/example/demo/entity/User.java`
- Database constraints: `@Column(nullable = false, length = 50)`, `@Column(unique = true)`

---

## 2. Movie Entity Constraints

### Context: Movie

**Invariant Constraints:**
```ocl
context Movie inv:
  self.title.size() >= 1 and self.title.size() <= 200
  self.description.size() >= 10 and self.description.size() <= 2000
  self.duration >= 30 and self.duration <= 300
  self.rating >= 0 and self.rating <= 10
  self.amount >= 0
  self.status <> null
  self.genres->size() >= 1
  self.genres->forAll(g | g.size() >= 2)
```

**Explanation:**
- Title must be between 1 and 200 characters
- Description must be between 10 and 2000 characters
- Duration must be between 30 and 300 minutes (5 hours max)
- Rating must be between 0 and 10
- Amount (price) must be non-negative
- Status must not be null
- At least one genre must be specified
- Each genre must be at least 2 characters long

**Operation Constraints:**
```ocl
context Movie::addMovie() : Boolean
  pre: self.title.size() >= 1 and self.description.size() >= 10
  post: self.id <> null and self.status = Status.Active

context Movie::updateMovie() : Boolean
  pre: self.id <> null
  post: self.title.size() >= 1 and self.description.size() >= 10
```

**Implementation:**
- File: `movie-service/src/main/java/movie_service/movie_service/model/Movie.java`
- Database constraints: `@Column(nullable = false, length = 200)`, etc.

---

## 3. Booking Entity Constraints

### Context: Booking

**Invariant Constraints:**
```ocl
context Booking inv:
  self.userId <> null
  self.showtimeId <> null
  self.movieId <> null
  self.status <> null
  self.status = 'CONFIRMED' or self.status = 'CANCELLED' or self.status = 'PENDING'
  self.bookingTime <> null
  self.bookingTime <= LocalDateTime.now()
```

**Explanation:**
- User ID must not be null (booking must be associated with a user)
- Showtime ID must not be null
- Movie ID must not be null
- Status must not be null
- Status must be one of: CONFIRMED, CANCELLED, or PENDING
- Booking time must not be null
- Booking time must be in the past or present (cannot book in the future)

**Operation Constraints:**
```ocl
context Booking::bookSeats() : Boolean
  pre: self.userId <> null and self.showtimeId <> null and self.movieId <> null
  post: self.status = 'CONFIRMED' and self.bookingTime <> null

context Booking::cancelBooking() : Boolean
  pre: self.status = 'CONFIRMED' or self.status = 'PENDING'
  post: self.status = 'CANCELLED'
```

**Implementation:**
- File: `booking-service/src/main/java/com/booking/demo/entity/Booking.java`
- Database constraints: `@Column(nullable = false)`, `@Column(length = 20)`

---

## 4. Payment Entity Constraints

### Context: Payment

**Invariant Constraints:**
```ocl
context Payment inv:
  self.bookingId <> null
  self.userId <> null
  self.amount > 0
  self.paymentMethod <> null
  self.paymentMethod = 'CREDIT_CARD' or self.paymentMethod = 'DEBIT_CARD' or self.paymentMethod = 'PAYPAL'
  self.status <> null
  self.transactionId <> null
  self.transactionId.size() = 36 (UUID format)
  self.paymentDate <> null
  self.paymentDate <= LocalDateTime.now()
```

**Explanation:**
- Booking ID must not be null (payment must be associated with a booking)
- User ID must not be null
- Amount must be greater than 0 (cannot pay zero or negative amount)
- Payment method must not be null
- Payment method must be one of: CREDIT_CARD, DEBIT_CARD, or PAYPAL
- Status must not be null
- Transaction ID must not be null
- Transaction ID must be exactly 36 characters (UUID format)
- Payment date must not be null
- Payment date must be in the past or present

**Operation Constraints:**
```ocl
context Payment::processPayment() : Boolean
  pre: self.bookingId <> null and self.amount > 0 and self.paymentMethod <> null
  post: self.status = PaymentStatus.SUCCESS and self.transactionId <> null

context Payment::refundPayment() : Boolean
  pre: self.status = PaymentStatus.SUCCESS
  post: self.status = PaymentStatus.REFUNDED
```

**Implementation:**
- File: `payment-service/payment-service/src/main/java/com/cinemahub/payment_service/model/Payment.java`
- Database constraints: `@Column(nullable = false)`, `@Column(unique = true, length = 36)`

---

## 5. Seat Entity Constraints

### Context: Seat

**Invariant Constraints:**
```ocl
context Seat inv:
  self.seatNumber <> null
  self.seatNumber.size() >= 2 and self.seatNumber.size() <= 10
  self.seatNumber.matches('^[A-Z][0-9]+$')
  self.showtimeId <> null
  self.price >= 0
  self.type <> null
  self.type = SeatType.VIP implies self.price >= 50
  self.type = SeatType.REGULAR implies self.price >= 20
```

**Explanation:**
- Seat number must not be null
- Seat number must be between 2 and 10 characters
- Seat number must match pattern: uppercase letter followed by numbers (e.g., A1, B12)
- Showtime ID must not be null
- Price must be non-negative
- Seat type must not be null
- If seat type is VIP, price must be at least 50
- If seat type is REGULAR, price must be at least 20

**Operation Constraints:**
```ocl
context Seat::bookSeat() : Boolean
  pre: self.booked = false
  post: self.booked = true

context Seat::releaseSeat() : Boolean
  pre: self.booked = true
  post: self.booked = false
```

**Implementation:**
- File: `booking-service/src/main/java/com/booking/demo/entity/Seat.java`
- Database constraints: `@Column(nullable = false, length = 10)`

---

## 6. Cross-Entity Constraints

### Booking-Payment Relationship
```ocl
context Booking inv:
  self.status = 'CONFIRMED' implies
    Payment.allInstances()->exists(p | p.bookingId = self.id and p.status = PaymentStatus.SUCCESS)
```

**Explanation:** A booking can only be in CONFIRMED status if there's a successful payment associated with it.

### User-Booking Relationship
```ocl
context User inv:
  self.role = Role.USER implies
    Booking.allInstances()->select(b | b.userId = self.id)->size() <= 10
```

**Explanation:** Regular users can have at most 10 active bookings.

### Seat-Booking Relationship
```ocl
context Seat inv:
  self.booked = true implies
    Booking.allInstances()->exists(b | b.showtimeId = self.showtimeId and b.status = 'CONFIRMED')
```

**Explanation:** A seat can only be marked as booked if there's a confirmed booking for the same showtime.

---

## 7. OCL Implementation Strategy

### 1. Database-Level Constraints
- `@Column(nullable = false)` - Ensures non-null values
- `@Column(unique = true)` - Ensures uniqueness
- `@Column(length = N)` - Ensures maximum length
- `@Enumerated(EnumType.STRING)` - Ensures valid enum values

### 2. Application-Level Validation
- Service layer validation logic
- Custom validation annotations
- Exception handling for constraint violations

### 3. Documentation
- OCL constraints documented in JavaDoc comments
- This comprehensive OCL documentation file
- Inline comments for complex constraints

---

## 8. Benefits of OCL Constraints

### Data Integrity
- Prevents invalid data from entering the system
- Ensures business rules are enforced at multiple levels
- Maintains consistency across the application

### Business Rule Enforcement
- Encodes business requirements formally
- Makes constraints explicit and verifiable
- Provides clear documentation of expected behavior

### Maintainability
- Constraints are documented in one place
- Easy to understand and modify
- Reduces ambiguity in requirements

### Testing
- Constraints can be tested systematically
- Clear expectations for test cases
- Helps identify edge cases

---

## 9. OCL Syntax Reference

### Basic Operators
- `=`, `<>`, `>`, `<`, `>=`, `<=` - Comparison operators
- `and`, `or`, `not`, `xor` - Logical operators
- `implies` - Implication operator
- `size()` - Collection size
- `forAll()` - Universal quantifier
- `exists()` - Existential quantifier
- `->select()` - Filter collection
- `->collect()` - Transform collection

### Context Definitions
- `context ClassName inv:` - Class invariant
- `context ClassName::methodName() : ReturnType` - Operation constraint
- `pre:` - Precondition (before operation)
- `post:` - Postcondition (after operation)

### Common Patterns
- Null check: `self.attribute <> null`
- String length: `self.attribute.size() >= N`
- Pattern matching: `self.attribute.matches('regex')`
- Collection operations: `self.collection->forAll(x | condition)`
- Implication: `condition1 implies condition2`

---

## 10. Constraint Enforcement Flow

```
User Input
    ↓
Frontend Validation (Client-side)
    ↓
API Request
    ↓
Service Layer Validation (OCL Constraints)
    ↓
Database Constraints (JPA Annotations)
    ↓
Database Transaction
    ↓
Response
```

---

## Conclusion

This OCL constraint documentation ensures that the Cinema Hub application maintains data integrity and enforces business rules at multiple levels. The constraints are implemented through:

1. **Database constraints** via JPA annotations
2. **Application-level validation** in service layers
3. **Comprehensive documentation** for maintainability

All constraints are designed to be:
- **Explicit** - Clear and unambiguous
- **Enforceable** - Can be validated automatically
- **Maintainable** - Easy to understand and modify
- **Testable** - Can be verified through testing

For questions or modifications to these constraints, please refer to the entity files or contact the development team.
