# Sports Blog API
https://api.tiburoncin.lat/22397/posts

## Overview

The Sports Blog API is designed to serve as the backbone for a sports-themed blogging platform, providing a robust server-side API developed with JavaScript. This project aims to showcase how modern web technologies can be leveraged to build scalable and dynamic APIs, specifically tailored for sports content management.

## Technologies Used

- **SQL**: For data persistence and management, ensuring data integrity and support for complex queries.
- **JavaScript (Node.js)**: For server-side logic, chosen for its efficiency and compatibility with real-time data processing.
- **PM2**: As a process manager to keep the node application running smoothly in production environments.
- **Docker**: For containerization, ensuring consistent environments across development and deployment stages.
- **Express**: A web application framework for Node.js, designed to build web applications and APIs.

## Getting Started

### Prerequisites

- Docker
- Node.js

### Installation and Setup

1. **Clone the repository**
   git clone https://github.com/josuemj/sport-blog.git

### License
Distributed under the MIT License. See LICENSE for more information.

### API Endpoints
POST /posts: Create a new blog post.
GET /posts: Retrieve all blog posts.
GET /posts/:postId: Get a single blog post by ID.
PUT /posts/:postId: Update a blog post.
DELETE /posts/:postId: Delete a blog post.
For more detailed API usage, please refer to the provided API documentation.
