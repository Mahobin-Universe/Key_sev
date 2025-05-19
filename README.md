# AuthAPI Vercel API Wrapper

This project is a professional Vercel API wrapper for the AuthAPI version 1.3, including full support for 2FA (Two-Factor Authentication).

---

## Features

- Easy-to-use API routes for all AuthAPI functions:
  - Login (with 2FA)
  - Register
  - License activation (with 2FA)
  - Upgrade user license
  - Check session
  - Logging
  - Variable retrieval
  - Webhook calls
  - File downloads
  - Fetch app settings
  - User data retrieval
  - Ban user
  - Enable and disable 2FA

- Automatic session management and retry on session expiration.

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/Mahobin-Universe/Key_sev.git
cd key_sev
```

2. Install dependencies:

```bash
npm install
```

3. Set your environment variables in `.env.local`:

```
APP_NAME=AuthSup
OWNER_ID=Dbuh3SkiyH
APP_VERSION=1.0
```

---

## Development

Run the development server locally with:

```bash
npm run dev
```

This uses [Vercel CLI](https://vercel.com/docs/cli) to serve the API routes locally.

---

## Deployment

Simply push to your connected Git repository, and Vercel will deploy the project automatically.

---

## Usage

Make POST or GET requests to the API routes under `/api` folder.
Example:

```
POST /api/login
Content-Type: application/json

{
  "username": "user1",
  "password": "password123",
  "twofa": "123456"  // optional 2FA code
}
```

---

## License

MIT © George x Ahamd
