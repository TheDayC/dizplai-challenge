# API Routes

For the creation of this API I've added several endpoints, those requested in the requirements and extras to supplement the UI. All endpoints leverage Prisma for their connection to the database and are type protected by Zod. Below is a list of the endpoints and their functionality with example payloads.

## **Poll Endpoints**

### **Get all polls**
**Endpoint:** `GET /polls/list`  
**Description:** Retrieves a list of all polls. 

#### **Request**
- **Method:** `GET`
- **URL:** `/polls/list`
- **Headers:**  
    ```json
    {
        "Content-Type": "application/json"
    }
    ```
- **Response Code:** `200 OK` 
- **Example Response:**  
    ```json
        [
            {
                "id": 1,
                "name": "Who will win the Superbowl?",
                "date": "2025-02-11T20:55:40.023Z",
                "options": [
                    "Kansas City Chiefs",
                    "Philadelphia Eagles"
                ]
            },
            {
                "id": 2,
                "name": "Which team will receive the first pick in the 2025 NBA draft?",
                "date": "2025-02-11T20:55:40.029Z",
                "options": [
                    "Washington Wizards",
                    "New Orleans Pelicans",
                    "Utah Jazz",
                    "Charlotte Hornets",
                    "Toronto Raptors",
                    "Brooklyn Nets"
                ]
            }
        ]
    ```

### **Create poll**
**Endpoint:** `POST /polls/new`  
**Description:** Create a new poll. 

#### **Request**
- **Method:** `POST`
- **URL:** `/polls/new`
- **Headers:**  
    ```json
    {
        "Content-Type": "application/json"
    }
    ```
- **Body:**  
    ```json
    {
        "name": "Who will win the Superbowl?",
        "options": ["Kansas City Chiefs", "Philadelphia Eagles"]
    }
    ```
- **Response Code:** `201 Created`
- **Example Response:**
    ```json
        {
            "id": 3,
            "name": "Who will win the Premier League?",
            "date": "2025-02-11T20:55:40.023Z",
            "options": [
                "Liverpool",
                "Arsenal",
                "Nottingham Forest",
                "Chelsea",
            ]
        }
    ```

### **Get poll votes**
**Endpoint:** `GET /polls/:id/votes`  
**Description:** Fetch all votes related to a poll's id.

#### **Request**
- **Method:** `GET`
- **URL:** `/polls/:id/votes`
- **URL Parameter:** 
    - `id`: The unique identifier of the poll.
- **Headers:**  
    ```json
    {
        "Content-Type": "application/json"
    }
    ```
- **Response Code:** `200 OK`
- **Example Response:**  
    ```json
    [
        {
            "id":1,
            "pollId":1,
            "date":"2025-02-11T20:55:40.031Z",
            "username":"john",
            "optionSelected":"Kansas City Chiefs"
        }
    ]
    ```

## **Vote Endpoints**

### **Create vote**
**Endpoint:** `POST /votes/new`  
**Description:** Create a new vote related to a user and a poll.

#### **Request**
- **Method:** `POST`
- **URL:** `/votes/new`
- **Headers:**  
    ```json
    {
        "Content-Type": "application/json"
    }
    ```
- **Body:**  
    ```json
    {
        "id": 1,
        "username": "john",
        "optionSelected": "Philadelphia Eagles"
    }
    ```
- **Response Code:** `201 Created`
- **Example Response:**
    ```json
        {
            "id": 23,
            "date": "2025-02-11T20:55:40.029Z",
            "pollId": 1,
            "username": "john",
            "optionSelected": "Philadelphia Eagles"
        }
    ```