# Spotify

A Node.js and Express backend for a music app. It provides user registration
and login, plus artist endpoints for uploading music and creating albums.
MongoDB stores user, music, and album records; ImageKit stores uploaded audio
files.

## Requirements

- Node.js and npm
- A MongoDB connection string
- An ImageKit private key for music uploads

## Setup

Install the dependencies:

```sh
npm install
```

Create a `.env` file in the project root and set the required values:

```dotenv
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-long-random-secret
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
```

Keep `.env` private; it is excluded from Git. The `.env.example` file lists the
required variable names.

Start the server:

```sh
npm start
```

The server listens on port `3000`. For development, run `npm run dev`.

## API

All request and response bodies use JSON except the music upload, which uses
`multipart/form-data`. Authentication sets a `token` cookie; send that cookie
with requests to artist endpoints.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register with `username`, `email`, and `password`. Optional `role` is `user` or `artist` and defaults to `user`. |
| `POST` | `/api/auth/login` | Log in with `username` or `email`, and `password`. |
| `POST` | `/api/music/upload` | Artist-only. Submit `title` and a `music` file as multipart form fields. |
| `POST` | `/api/music/album` | Artist-only. Submit a JSON body with `title` and `musics`, an array of music record IDs. |

Example registration request:

```json
{
  "username": "listener",
  "email": "listener@example.com",
  "password": "choose-a-password"
}
```

The project does not currently define an automated test suite.
