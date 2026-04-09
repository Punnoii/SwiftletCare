# Contributing to SwiftletCare

This project is structured so another developer can continue the work with minimal handoff. Use the workflow below to keep changes easy to review and safe to merge.

## Before you start

1. Read `README.md` for setup steps.
2. Create local env files from `Backend/.env.example` and `Frontend/.env.example`.
3. Install dependencies in both apps.
4. Review the current issue, task, or agreed scope before coding.

## Branching strategy

- `main`: stable branch for reviewed code
- `feature/<short-name>`: new features
- `fix/<short-name>`: bug fixes
- `docs/<short-name>`: documentation-only changes
- `chore/<short-name>`: tooling, config, or maintenance work

Examples:

- `feature/nest-management`
- `fix/login-token-validation`
- `docs/update-readme`

## Commit message convention

Use small, focused commits with this format:

```text
type(scope): short summary
```

Examples:

- `feat(frontend): add nest detail screen`
- `fix(backend): validate duplicate nest record`
- `docs(repo): add contribution guide`

Suggested commit types:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`

## Pull request expectations

Each pull request should:

- solve one clear problem
- explain what changed and why
- mention whether it affects `Backend`, `Frontend`, or both
- include manual test notes
- include screenshots for UI changes when relevant

Keep pull requests small enough that another developer can review them quickly.

## Review checklist

Before requesting review, confirm:

- local env files are not committed
- no secrets or credentials are included
- changed code follows the existing project structure
- setup instructions still work
- related docs are updated when behavior changes

## Project structure guidance

- Put API and server logic in `Backend`
- Put mobile app logic in `Frontend`
- Keep environment-specific values in `.env`
- Keep database schema changes in `Backend/migrations`

## Handoff notes

When finishing a task, leave enough context for the next developer:

- what was changed
- what is still pending
- any known limitations or follow-up work

If a change introduces a new convention, document it in `README.md` or this file.
