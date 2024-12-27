# TypeScript Starter Project

This is a starter project to either serve as a template for new projects or a place to pull configs/setup from for other projects.

Includes:

- ✅ TypeScript
- ✅ ESLint
- ✅ Prettier
- ❌ Unit Tests

## Setup Details

### TypeScript

- Installation:
  - `pnpm install -D typescript`
  - Copy in `tsconfig.json`
  - Add package.json script: `"build": "tsc"`
- If making a backend/CLI/non-vite app, you'll need rimraf to clean up:
  - `pnpm install rimraf'
  - Update package.json:
    ```
    "build": "pnpm run clean && tsc",
    "clean": "rimraf ./dist",
    ```

### ESLint

- Installation:
  - `npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev`
  - Copy in `eslint.config.mjs`
  - Add script to package.json: `"lint": "eslint"`

### Prettier

In general, I rely on the VSCode plugin to run prettier as doing so through ESLint is not as fast.
At some point, I should set up a husky pre-commit hook for this.

- The `.prettierrc` file might not be required, since I have my vscode already configured with single quotes. Probably good to include for other contributers though.
- The `.prettierignore` is pretty important since Prettier now formats markdown which drives me crazy.
