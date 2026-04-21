# CheckInPro

CheckInPro is a **French-language employee attendance/check-in application** built around QR-code-based daily sign-in.

The product flow is simple:

1. a privileged user creates a company,
2. employees are added manually or via CSV,
3. employees activate access by magic link,
4. the company launches a daily check-in session,
5. employees scan the QR code to register attendance,
6. records are stored and grouped by session.

## Current status

This repository already contains the core product logic, but it is still an **early-stage product** rather than a fully polished production release.

Implemented in code:

- company creation and ownership flow
- employee management
- CSV employee import
- magic-link onboarding for pre-created users
- password setup and credentials login
- check-in creation
- QR code session launch
- QR code attendance recording
- session/record visualization
- legal/privacy/contact pages

Still incomplete or worth reviewing:

- `/documentation` is empty
- `/account` is linked in the UI but no matching route exists
- check-in edit/delete UI appears to be partially wired only
- no automated tests
- no CI configuration
- no `.env.example`
- no committed lockfile
- some values are hard-coded (`http://localhost:3000`, sender addresses, branding)
- there is no built-in bootstrap flow for the **first chief/admin user**

## Main features

- **Company management**
  - create a company
  - associate employees with a company
  - enforce ownership and membership checks

- **Employee onboarding**
  - employees are pre-created by the company
  - they sign in via magic link
  - they set a password on first access

- **Attendance check-ins**
  - create named check-ins
  - choose active weekdays
  - launch a daily QR session
  - store attendance records per session

- **CSV import**
  - import employees from a simple CSV file

- **Access control**
  - `isChief` users manage company/check-in operations
  - regular users can scan QR codes and view their assigned check-ins

## Core workflow

1. **Create/bootstrap a chief user**
   - The app expects at least one privileged user with `isChief = true`.
   - There is no admin UI for creating the first one.

2. **Initial onboarding**
   - The invited user requests a magic link from `/register`.
   - On first connection, the user sets a password.

3. **Company setup**
   - The chief user creates a company.

4. **Add employees**
   - Employees can be added manually or from CSV.

5. **Create a check-in**
   - The chief creates a reusable attendance/check-in configuration.

6. **Launch the QR session**
   - A daily `CheckinSession` is created/reused.
   - A QR code is generated for employees.

7. **Scan and record attendance**
   - Employees scan the QR code.
   - The app verifies membership and prevents duplicate attendance for the same session.

8. **Review records**
   - Attendance records are visible per session.

## Tech stack

- **Framework:** Next.js 15, React 19
- **Language:** TypeScript
- **Styling/UI:** Tailwind CSS, shadcn/ui, Radix UI
- **Auth:** NextAuth v5 beta
  - email provider for magic links
  - credentials provider for password login
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Server actions:** next-safe-action
- **Validation/forms:** Zod, react-hook-form
- **Email:** Nodemailer
- **QR stack:** `qrcode`, `@yudiel/react-qr-scanner`, `html5-qrcode`, `react-zxing`
- **Utilities:** Luxon, Ky, Sonner

## Project structure

```text
.
├── app/
│   ├── api/auth/[...nextauth]/route.ts
│   ├── auth.ts
│   ├── checkin/
│   ├── company/[id]/
│   ├── contact/
│   ├── documentation/
│   ├── legal/
│   ├── privacy/
│   ├── register/
│   └── terms/
├── components/
│   ├── auth/
│   ├── checkin/
│   ├── company/
│   ├── contact/
│   ├── navigation/
│   └── ui/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── services/
├── utils/
├── package.json
└── tsconfig.json
```

## Data model overview

Main entities found in the Prisma schema:

- `User`
- `Company`
- `Checkin`
- `CheckinSession`
- `Record`

Key business rules visible in code:

- a user belongs to at most one company
- a company has one owner
- only one session per check-in per day is created
- one user can only create one attendance record per session

## Getting started

### Prerequisites

- Node.js 20+
- npm (or another package manager)
- PostgreSQL
- an SMTP server/account for magic-link emails
- SMTP credentials for the contact form

### Install dependencies

```bash
npm install
```

> No lockfile is currently committed, so your first install will generate one locally.

## Environment variables

There is currently **no `.env.example`** committed in the repository.

At minimum, the code references the following values:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection for Prisma |
| `EMAIL_SERVER` | Yes | SMTP connection string used by NextAuth email provider |
| `EMAIL_FROM` | Yes | sender address for auth emails |
| `SMTP_HOST` | Yes | SMTP host used by the contact form |
| `SMTP_USERNAME` | Yes | SMTP username for the contact form |
| `SMTP_PASSWORD` | Yes | SMTP password for the contact form |
| `JWT_SECRET` | Yes | secret used to sign/verify QR attendance tokens |

Suggested local example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/checkinpro?schema=public"
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="CheckInPro <no-reply@example.com>"
SMTP_HOST="smtp.example.com"
SMTP_USERNAME="username"
SMTP_PASSWORD="password"
JWT_SECRET="replace-with-a-long-random-secret"
```

### Database setup

```bash
npx prisma generate
npx prisma migrate dev
```

For production-like deployment:

```bash
npx prisma migrate deploy
```

### Bootstrap the first chief user

There is no admin/bootstrap UI for the first privileged user.

A practical local approach is:

```bash
npx prisma studio
```

Create a `User` with at least:

- `email`
- `firstname`
- `lastname`
- `isChief = true`
- `isPasswordSet = false`

Then:

1. open `/register`
2. request a magic link for that email
3. sign in
4. set the password
5. create the first company

### Run the app

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Prisma tasks are not wrapped in scripts, so run them manually with `npx prisma ...`.

## CSV import format

Employee import expects rows in this order:

```csv
firstname,lastname,email
Jane,Doe,jane@example.com
John,Doe,john@example.com
```

Notes:

- the first line is treated as a header and skipped
- parsing is positional, so column order matters
- blank rows are ignored

## Important implementation notes

- The codebase is **French-first** in UI and legal copy.
- The HTTP client helper contains a hard-coded `http://localhost:3000`.
- The magic-link sender identity is hard-coded to `contact@checkinpro.fr`.
- The user menu points to `/account`, but no `/account` route exists.
- The contact page exists, but the contact flow should be reviewed carefully before production use.

## Suggested next steps

If you plan to continue building CheckInPro, the highest-value cleanup/improvement tasks would be:

1. add a proper `.env.example`
2. add a bootstrap path for the first chief user
3. remove hard-coded local URLs and sender addresses
4. finish or remove partial check-in edit/delete flows
5. create the missing `/account` page or remove the link
6. add tests for the attendance workflow
7. add CI and deployment documentation
8. replace generic package metadata (`my-app`)

## License

No license file is currently included in the repository.
