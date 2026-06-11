# LeunDesk — TurboRepo & Pre-commit Hooks Setup Guide

> Copy-paste-ready commands for `pnpm`, `TurboRepo`, `Husky`, `lint-staged`, `Commitlint`, `Prettier`, `ESLint`, and `TypeScript`.

---

## 1. Install core dev dependencies (root `package.json`)

```bash
pnpm add -D -w husky lint-staged @commitlint/cli @commitlint/config-conventional
```

---

## 2. `package.json` (root) — add scripts

```jsonc
// package.json (root)
{
  "scripts": {
    // existing:
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "turbo format",
    "typecheck": "turbo typecheck",

    // add these:
    "prepare": "husky",
    "commitlint": "commitlint --edit",
    "lint-staged": "lint-staged",
  },
}
```

---

## 3. `turbo.json` — add `format:check` (used by lint-staged)

```jsonc
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"],
    },
    "lint": {
      "dependsOn": ["^lint"],
    },
    "format": {
      "dependsOn": ["^format"],
    },
    "format:check": {
      // used in CI / lint-staged to verify formatting without writing
    },
    "typecheck": {
      "dependsOn": ["^typecheck"],
    },
    "dev": {
      "cache": false,
      "persistent": true,
    },
  },
}
```

---

## 4. `commitlint.config.js` (root)

```js
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
  },
}
```

---

## 5. `lint-staged.config.js` (root)

```js
// lint-staged.config.js
module.exports = {
  "*": ["prettier --check --ignore-unknown"],
  "*.{ts,tsx}": ["eslint --max-warnings 0"],
}
```

> **Note:** `prettier --check` for staged formatting; `eslint` for type-checked linting. Adjust paths/globs to match your workspace layout.

---

## 6. Husky hooks

```bash
# Initialise Husky (creates .husky/ directory)
pnpm exec husky init
```

### `commit-msg` hook

Create `.husky/commit-msg`:

```bash
# .husky/commit-msg
pnpm commitlint --edit "$1"
```

### `pre-commit` hook

Edit `.husky/pre-commit`:

```bash
# .husky/pre-commit
pnpm exec lint-staged
```

Make sure both hooks are executable:

```bash
chmod +x .husky/commit-msg .husky/pre-commit
```

---

## 7. `.gitignore` — append entries for new tools

```
# husky
.husky/_

# commitlint
commitlint.config.js
```

> `.husky/_` is Husky's internal storage (should not be committed). The hooks **are** the configuration you want to commit (`.husky/commit-msg`, `.husky/pre-commit`).

---

## 8. Final `.gitignore` reference (complete)

```gitignore
# dependencies
node_modules
.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
coverage

# next.js
.next/
out/

# production
build
dist

# turbo
.turbo

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# husky
.husky/_

# commitlint
commitlint.config.js
```

---

## 9. Verification commands

Run each of these to confirm the toolchain works:

```bash
# 1. TurboRepo pipeline
pnpm build
pnpm lint
pnpm format
pnpm typecheck

# 2. Husky hook is registered
pnpm exec husky

# 3. Commitlint works standalone
echo "feat: test commit message" | pnpm exec commitlint

# 4. lint-staged works standalone
pnpm exec lint-staged --dry-run

# 5. End-to-end: stage a change and commit
git add .
git commit -m "chore: verify pre-commit hooks"

# 6. (Optional) Force-skip hooks for testing
git commit --no-verify -m "chore: bypass hooks"
```

---

## 10. Conventional commit reference

| Type       | Usage                                             |
| ---------- | ------------------------------------------------- |
| `feat`     | A new feature                                     |
| `fix`      | A bug fix                                         |
| `docs`     | Documentation only                                |
| `style`    | Formatting, missing semicolons…                   |
| `refactor` | Code change that neither fixes nor adds a feature |
| `perf`     | Performance improvement                           |
| `test`     | Adding/updating tests                             |
| `build`    | Build system or dependencies                      |
| `ci`       | CI config                                         |
| `chore`    | Grunt work                                        |
| `revert`   | Revert a previous commit                          |

**Examples:**

```
feat(auth): add OAuth2 login flow
fix(ui): correct button alignment in dark mode
docs(readme): update API reference link
chore(deps): bump next from 16.2.0 to 16.2.6
```

---

## 11. Troubleshooting

| Problem                               | Check                                                          |
| ------------------------------------- | -------------------------------------------------------------- |
| `husky: command not found`            | Run `pnpm exec husky init` again                               |
| `commitlint` rejects everything       | Verify `commitlint.config.js` exists at root                   |
| `lint-staged` runs on unchanged files | Confirm config is at root, not in a sub-package                |
| Hook not running on commit            | `ls -la .huskie/` — ensure `pre-commit` is executable          |
| Prettier/Tailwind plugin issue        | Verify `prettier-plugin-tailwindcss` in root `devDependencies` |

---

## 12. Recommended workflow

```mermaid
flowchart LR
    A[Stage files] --> B[git commit -m \"...\"]
    B --> C[Husky pre-commit]
    C --> D[lint-staged]
    D --> E[Prettier --check]
    D --> F[ESLint]
    E --> G{Pass?}
    F --> G
    G -->|Yes| H[Husky commit-msg]
    H --> I[Commitlint]
    I --> J{Valid?}
    J -->|Yes| K[Commit created]
    G -->|No| L[Blocked]
    J -->|No| L
```
