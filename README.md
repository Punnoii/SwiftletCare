# SwiftletCare

This repository contains the `Backend` API and the `Frontend` Expo app for the SwiftletCare project.

## Why this repository is structured this way

The project is prepared to be maintainable, reviewable, and easy to hand off. The goal is not only to ship code, but also to make it clear how another developer can continue the work.

## Project structure

- `Backend` - Express + MySQL API
- `Frontend` - Expo / React Native mobile app
- `.github` - issue and pull request templates
- `CONTRIBUTING.md` - workflow for contributors
- `CHANGELOG.md` - notable repository changes

## Prerequisites

- Node.js and npm
- MySQL
- Expo Go or an emulator for mobile testing

## Environment variables

Create local env files from the examples before running the project.

### Backend

Copy `Backend/.env.example` to `Backend/.env` and update the values.

Required variables:

- `PORT`
- `MYSQL_HOST`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`
- `JWT_SECRET`

### Frontend

Copy `Frontend/.env.example` to `Frontend/.env`.

Required variables:

- `BASE_URL`

Example:

- `http://localhost:3000` for local backend development

## Install dependencies

```bash
cd Backend
npm install
```

```bash
cd Frontend
npm install
```

## Run the backend

```bash
cd Backend
npm start
```

## Run the frontend

```bash
cd Frontend
npm start
```

## Database

The initial SQL schema is in `Backend/migrations/init.sql`.

## Collaboration workflow

For team-friendly development:

- create feature branches instead of committing directly to `main`
- use focused commit messages
- open pull requests with test notes
- document behavior changes in the repo

Recommended branch naming:

- `feature/<name>`
- `fix/<name>`
- `docs/<name>`
- `chore/<name>`

Detailed contribution guidance is available in `CONTRIBUTING.md`.

## Repository standards

- Do not commit `.env` files or credentials
- Keep backend and frontend changes scoped clearly
- Track notable changes in `CHANGELOG.md`
- Prefer small pull requests with a clear purpose
