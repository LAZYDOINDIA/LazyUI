# 🚀 LazyDo API Endpoints Documentation

## 📋 **Base URL**
```
https://your-backend-domain.com/api/v1
```

## 🔐 **Authentication Endpoints**

### **1. User Registration**
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "primaryRole": "taker" // or "giver"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "primaryRole": "taker",
      "roles": ["taker"],
      "createdAt": "2024-01-16T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **2. User Login**
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "primaryRole": "taker",
      "roles": ["taker", "giver"],
      "createdAt": "2024-01-16T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **3. Add Role to User**
```http
POST /auth/add-role
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "role": "giver" // or "taker"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role added successfully",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "roles": ["taker", "giver"],
      "primaryRole": "taker"
    }
  }
}
```

### **4. Switch Primary Role**
```http
PUT /auth/switch-role
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "primaryRole": "giver"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Primary role switched successfully",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "primaryRole": "giver",
      "roles": ["taker", "giver"]
    }
  }
}
```

### **5. Get User Profile**
```http
GET /auth/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "primaryRole": "giver",
      "roles": ["taker", "giver"],
      "rating": 4.8,
      "totalTasks": 15,
      "completedTasks": 12,
      "createdAt": "2024-01-16T10:30:00Z"
    }
  }
}
```

### **6. Update User Profile**
```http
PUT /auth/profile
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+1234567891",
  "avatar": "data:image/jpeg;base64,..."
}
```

### **7. Logout**
```http
POST /auth/logout
Authorization: Bearer <token>
```

## 📝 **Task Management Endpoints**

### **8. Create New Task (Giver)**
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```json
{
  "title": "Pick up groceries from Walmart",
  "description": "Need milk, bread, eggs, and some vegetables",
  "category": "Shopping",
  "urgency": "Medium",
  "reward": 25,
  "timeLimit": "2 hours",
  "location": "Walmart, Downtown Mall",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "images": [File1, File2, File3] // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": "task_456",
      "title": "Pick up groceries from Walmart",
      "description": "Need milk, bread, eggs, and some vegetables",
      "category": "Shopping",
      "urgency": "Medium",
      "reward": 25,
      "timeLimit": "2 hours",
      "location": "Walmart, Downtown Mall",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "status": "Active",
      "giverId": "user_123",
      "giverName": "John Doe",
      "giverRating": 4.8,
      "giverTasks": 12,
      "images": [
        "https://storage.com/images/task_456_1.jpg",
        "https://storage.com/images/task_456_2.jpg"
      ],
      "createdAt": "2024-01-16T18:30:00Z",
      "distance": "0.8 miles"
    }
  }
}
```

### **9. Get Available Tasks (Taker)**
```http
GET /tasks/available
Authorization: Bearer <token>
```

**Query Parameters:**
```
?search=groceries&category=Shopping&urgency=Medium&page=1&limit=10&sort=newest
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "task_456",
        "title": "Pick up groceries from Walmart",
        "description": "Need milk, bread, eggs, and some vegetables",
        "category": "Shopping",
        "urgency": "Medium",
        "reward": 25,
        "timeLimit": "2 hours",
        "location": "Walmart, Downtown Mall",
        "giverName": "John Doe",
        "giverRating": 4.8,
        "giverTasks": 12,
        "createdAt": "2024-01-16T18:30:00Z",
        "distance": "0.8 miles",
        "images": ["https://storage.com/images/task_456_1.jpg"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### **10. Get Posted Tasks (Giver)**
```http
GET /tasks/posted
Authorization: Bearer <token>
```

**Query Parameters:**
```
?status=Active&page=1&limit=10&sort=newest
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "task_456",
        "title": "Pick up groceries from Walmart",
        "description": "Need milk, bread, eggs, and some vegetables",
        "category": "Shopping",
        "urgency": "Medium",
        "reward": 25,
        "timeLimit": "2 hours",
        "location": "Walmart, Downtown Mall",
        "status": "Active",
        "createdAt": "2024-01-16T18:30:00Z",
        "acceptedBy": "Jane Smith",
        "acceptedAt": "2024-01-16T19:00:00Z",
        "takerRating": 4.5,
        "images": ["https://storage.com/images/task_456_1.jpg"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 8,
      "totalPages": 1
    }
  }
}
```

### **11. Get Task Details**
```http
GET /tasks/:taskId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "task_456",
      "title": "Pick up groceries from Walmart",
      "description": "Need milk, bread, eggs, and some vegetables",
      "category": "Shopping",
      "urgency": "Medium",
      "reward": 25,
      "timeLimit": "2 hours",
      "location": "Walmart, Downtown Mall",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "status": "Active",
      "giverId": "user_123",
      "giverName": "John Doe",
      "giverRating": 4.8,
      "giverTasks": 12,
      "giverPhone": "+1234567890",
      "createdAt": "2024-01-16T18:30:00Z",
      "acceptedBy": "Jane Smith",
      "acceptedAt": "2024-01-16T19:00:00Z",
      "takerId": "user_789",
      "takerPhone": "+1234567891",
      "images": ["https://storage.com/images/task_456_1.jpg"],
      "distance": "0.8 miles"
    }
  }
}
```

### **12. Accept Task (Taker)**
```http
POST /tasks/:taskId/accept
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Task accepted successfully",
  "data": {
    "task": {
      "id": "task_456",
      "status": "Accepted",
      "acceptedBy": "Jane Smith",
      "acceptedAt": "2024-01-16T19:00:00Z"
    }
  }
}
```

### **13. Complete Task (Taker)**
```http
POST /tasks/:taskId/complete
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "completionNotes": "Successfully picked up all items",
  "images": ["data:image/jpeg;base64,..."] // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task completed successfully",
  "data": {
    "task": {
      "id": "task_456",
      "status": "Completed",
      "completedAt": "2024-01-16T20:00:00Z",
      "completionNotes": "Successfully picked up all items"
    }
  }
}
```

### **14. Cancel Task (Giver)**
```http
POST /tasks/:taskId/cancel
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "reason": "No longer needed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task cancelled successfully",
  "data": {
    "task": {
      "id": "task_456",
      "status": "Cancelled",
      "cancelledAt": "2024-01-16T19:30:00Z",
      "reason": "No longer needed"
    }
  }
}
```

### **15. Update Task (Giver)**
```http
PUT /tasks/:taskId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "reward": 30,
  "timeLimit": "3 hours"
}
```

## 📊 **Statistics & Analytics**

### **16. Get User Statistics**
```http
GET /stats/user
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "asGiver": {
      "totalPosted": 8,
      "activeTasks": 4,
      "completedTasks": 3,
      "cancelledTasks": 1,
      "totalSpent": 183,
      "averageRating": 4.6
    },
    "asTaker": {
      "totalAccepted": 15,
      "completedTasks": 12,
      "activeTasks": 3,
      "totalEarned": 450,
      "averageRating": 4.8
    }
  }
}
```

### **17. Get Task Statistics**
```http
GET /stats/tasks
Authorization: Bearer <token>
```

**Query Parameters:**
```
?period=week&role=giver
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTasks": 25,
    "completedTasks": 18,
    "activeTasks": 5,
    "cancelledTasks": 2,
    "totalAmount": 750,
    "averageReward": 30,
    "categoryBreakdown": {
      "Shopping": 8,
      "Home Repair": 6,
      "Delivery": 4,
      "Cleaning": 4,
      "Other": 3
    }
  }
}
```

## 💬 **Communication Endpoints**

### **18. Send Message**
```http
POST /messages
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "taskId": "task_456",
  "recipientId": "user_789",
  "message": "Hi, I'm interested in your task. When can I start?"
}
```

### **19. Get Messages**
```http
GET /messages/:taskId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_123",
        "senderId": "user_123",
        "senderName": "John Doe",
        "message": "Hi, I'm interested in your task",
        "createdAt": "2024-01-16T19:00:00Z"
      }
    ]
  }
}
```

## ⭐ **Rating & Review Endpoints**

### **20. Rate User**
```http
POST /ratings
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "taskId": "task_456",
  "ratedUserId": "user_789",
  "rating": 5,
  "review": "Great work! Very reliable and professional."
}
```

### **21. Get User Ratings**
```http
GET /ratings/:userId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "averageRating": 4.8,
    "totalRatings": 15,
    "reviews": [
      {
        "id": "rating_123",
        "rating": 5,
        "review": "Great work! Very reliable and professional.",
        "reviewerName": "John Doe",
        "taskTitle": "Pick up groceries",
        "createdAt": "2024-01-16T20:00:00Z"
      }
    ]
  }
}
```

## 🔍 **Search & Discovery**

### **22. Search Tasks**
```http
GET /search/tasks
Authorization: Bearer <token>
```

**Query Parameters:**
```
?q=groceries&category=Shopping&urgency=Medium&minReward=20&maxReward=50&location=Downtown&radius=5&page=1&limit=10
```

### **23. Get Nearby Tasks**
```http
GET /tasks/nearby
Authorization: Bearer <token>
```

**Query Parameters:**
```
?latitude=40.7128&longitude=-74.0060&radius=5&limit=10
```

## 📱 **Notification Endpoints**

### **24. Get Notifications**
```http
GET /notifications
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "task_accepted",
        "title": "Task Accepted",
        "message": "Your task 'Pick up groceries' has been accepted by Jane Smith",
        "taskId": "task_456",
        "read": false,
        "createdAt": "2024-01-16T19:00:00Z"
      }
    ]
  }
}
```

### **25. Mark Notification as Read**
```http
PUT /notifications/:notificationId/read
Authorization: Bearer <token>
```

## 🛠 **Utility Endpoints**

### **26. Upload Image**
```http
POST /upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
image: File
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.com/images/upload_123.jpg",
    "filename": "upload_123.jpg"
  }
}
```

### **27. Get Categories**
```http
GET /categories
```

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_1",
        "name": "Shopping",
        "icon": "shopping-cart",
        "color": "#4CAF50"
      },
      {
        "id": "cat_2",
        "name": "Home Repair",
        "icon": "hammer",
        "color": "#FF9800"
      }
    ]
  }
}
```

### **28. Get Urgency Levels**
```http
GET /urgency-levels
```

**Response:**
```json
{
  "success": true,
  "data": {
    "levels": [
      {
        "id": "urg_1",
        "name": "Low",
        "color": "#4CAF50",
        "timeframe": "24 hours"
      },
      {
        "id": "urg_2",
        "name": "Medium",
        "color": "#FF9800",
        "timeframe": "4 hours"
      },
      {
        "id": "urg_3",
        "name": "High",
        "color": "#F44336",
        "timeframe": "1 hour"
      }
    ]
  }
}
```

## 🔒 **Error Responses**

### **Standard Error Format:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  }
}
```

### **Common Error Codes:**
- `UNAUTHORIZED` - Invalid or missing token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input data
- `CONFLICT` - Resource already exists
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_SERVER_ERROR` - Server error

## 📋 **Required Headers**

### **Authentication:**
```
Authorization: Bearer <jwt_token>
```

### **Content Type:**
```
Content-Type: application/json
```

### **For File Uploads:**
```
Content-Type: multipart/form-data
```

## 🚀 **Implementation Notes**

1. **JWT Authentication** - Use JWT tokens for all authenticated endpoints
2. **File Upload** - Support image uploads for tasks and profiles
3. **Pagination** - Implement pagination for list endpoints
4. **Real-time Updates** - Consider WebSocket for real-time notifications
5. **Geolocation** - Store and use coordinates for distance calculations
6. **Image Compression** - Compress images before storage
7. **Rate Limiting** - Implement rate limiting for API protection
8. **Caching** - Cache frequently accessed data
9. **Validation** - Validate all input data
10. **Error Handling** - Provide detailed error messages

---

**Total Endpoints: 28** | **Ready for Backend Implementation** 🎯 