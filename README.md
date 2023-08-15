# GIGIH - Tokopedia Play Clone API

GIGIH - Tokopedia Play Clone API using [Express.js](https://github.com/expressjs/express) with [ESlint](https://github.com/eslint/eslint) and [Prettier](https://github.com/prettier/prettier). Fully written in [TypeScript](https://github.com/microsoft/TypeScript).

## Quick Start

```bash
# Install depedencies
npm install

# Copy .env.example into .env and set the .env.development
cp .env.example .env.development

# Run the development server
npm run dev

# Server running on http://localhost:3001 (default)
```

## Production Build

```bash
# Copy .env.example into .env and set the .env
cp .env.example .env.production

# Build the source code
npm run build

# Run the production server
npm run start

# Server running on http://localhost:3001 (default)
```

## API Structure

```
/api
├── /users                                (GET)  [Get all users]
├── /users                                (POST) [Create a new user]
├── /users/:username                      (GET)  [Find user by username]
├── /videos                               (GET)  [Get all videos]
├── /videos                               (POST) [Create a new video]
├── /videos/:videoId                      (GET)  [Find video by videoId]
├── /videos/:videoId/products             (GET)  [Get all video's products by videoId]
├── /videos/:videoId/products             (POST) [Create a video's product by videoId]
├── /videos/:videoId/products/:productId  (GET)  [Find a video's product by videoId and productId]
├── /videos/:videoId/comments             (GET)  [Find a video's comments by videoId]
└── /videos/:videoId/comments             (POST) [Create a video's comment by videoId]
```

For detailed API structure and endpoints, please refer to this [Postman API Documentation](https://documenter.getpostman.com/view/28036821/2s9XxztXxZ)

## Database Schema

```
tokopedia_play_clone         (db)
├── users                    (collection)
│   ├── _id                  (ObjectId)
│   ├── username             (string)
│   └── avatarUrl            (string)
└── videos                   (collection)
    ├── _id                  (ObjectId)
    ├── title                (string)
    ├── embedUrl             (string)
    ├── thumbnailUrl         (string)
    ├── user                 (embedded)
    │   ├── _id              (ObjectId)
    │   ├── username         (string)
    │   └── avatarUrl        (string)
    ├── products             (array)
    │   ├── _id              (ObjectId)
    │   ├── url              (string)
    │   ├── thumbnailUrl     (string)
    │   ├── title            (string)
    │   └── price            (number)
    └── comments             (array)
        ├── _id              (ObjectId)
        ├── user             (embedded)
        │   ├── _id          (ObjectId)
        │   ├── username     (string)
        │   └── avatarUrl    (string)
        ├── comment          (string)
        └── timestamp        (Date)
```

## Additional Resource

To help with the API testing, this repo also included with Postman Collection inside `docs` folder.
