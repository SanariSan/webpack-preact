## Webpack-Preact

The main goal of this template is to create a leaner development and production environment by removing excessive dependencies and build tools, transitioning away from CRA, and avoiding Vite or other high-level tools. Instead, it sticks with raw Webpack and possibly migrates to esbuild. Despite the production setup being much cleaner, the development packages still occupy significant space.

```js
 // Fine
 "dependencies": {
    "preact": "^10.22.1", // 1.8 MiB
    "preact-iso": "^2.6.3", // 76.0 KiB
    "preact-render-to-string": "^6.4.0" // 972.0 KiB (needed for preact-iso)
  },

  // RAW sizes, each lib downloaded in an empty folder for test purposes
  // NO transitive deps
  // Allow for 5-10 KiB error due to the yarn integrity file
  "devDependencies": {
    // Must-have, better to include in the repo
    "typescript": "<=5.2.0", // 38.6 MiB
    
    // Must-have, better to include in the repo (but the size is considerable...)
    "prettier": "^2.7.1", // 10.8 MiB

    // Small and useful
    "cross-env": "^7.0.3", // 292.0 KiB
    
    // Fine, but still somewhat large
    "esbuild": "^0.23.1", // 9.7 MiB

    // Feels odd, too much for just handling css and copying files. Sass seems reasonable.
    "webpack-dev-server": "^5.1.0", // 25.7 MiB
    "webpack": "^5.94.0", // 24.7 MiB
    "html-webpack-plugin": "^5.6.0", // 13.5 MiB
    "esbuild-loader": "^4.2.2", // 11.2 MiB
    "sass": "^1.79.3", // 6.7 MiB
    "webpack-cli": "^5.1.4", // 2.7 MiB
    "css-loader": "<7.0.0", // 1.7 MiB
    "sass-loader": "^16.0.2", // 844.0 KiB
    "style-loader": "^4.0.0", // 132.0 KiB
    
    // All of this just for code style and mistake detection—seems excessive
    "eslint-config-preact": "^1.5.0", // 67.6 MiB
    "eslint": "^7.2.0", // 18.1 MiB
    "eslint-plugin-import": "^2.25.2", // 18.0 MiB
    "@typescript-eslint/eslint-plugin": "^5.35.1", // 13.8 MiB
    "@typescript-eslint/parser": "^5.35.1", // 6.7 MiB
    "eslint-import-resolver-typescript": "^2.5.0", // 2.2 MiB
    "eslint-config-airbnb-typescript": "^14.0.1", // 1.4 MiB
    "eslint-config-airbnb-base": "^14.2.1", // 1.3 MiB
    "eslint-import-resolver-node": "^0.3.6", // 1.0 MiB
    "eslint-config-prettier": "^8.3.0", // 88.0 KiB
    "eslint-plugin-prettier": "^4.0.0", // 212.0 KiB
    "eslint-plugin-promise": "^5.1.1", //140.0 KiB  
  }
```

This setup is fine for team development where both control and robustness are necessary. However, for most solo small to mid-size projects, it might be overkill.

#### Dependencies
- **Preact and related**: A smaller, less bloated alternative to React, with a closer-to-the-DOM approach.

#### Dev dependencies
- **TypeScript**: Essential, with no real alternatives (besides JSDoc, which isn't being used here).
- **Prettier**: A must-have formatter, though a lighter alternative might be worth considering due to its size.
- **Cross-env**: Useful for cross-platform compatibility.
- **Esbuild**: A very fast build system. In this setup, it's used within the Webpack pipeline to speed up transpilation. Ideal for this purpose, but currently a bit unstable.
- **Webpack and related**: Overkill for small projects with minimal build requirements. Large production codebases may need legacy transpilation, asset processing, and custom pipelines, but for smaller projects, starting with a lighter tool and adding features as needed is a better approach.
- **ESLint and related**: With enough experience, you can maintain code quality without a linter. It's mostly helpful in team projects, although there are some lightweight alternatives available.

The final package list could look like:

```js
 "dependencies": {
    "preact": "^10.22.1", // 1.8 MiB
    "preact-iso": "^2.6.3", // 76.0 KiB
    "preact-render-to-string": "^6.4.0" // 972.0 KiB (needed for preact-iso)
  },
  "devDependencies": {
    "esbuild": "^0.23.1", // Build system - 9.7 MiB
    "prettier": "^2.7.1", // Formatter - 10.8 MiB
    "quick-lint-js": "^3.2.0", // Linter - 11.6 MiB
    "typescript": "<=5.2.0", // JS preprocessor - 38.6 MiB
    "sass": "^1.79.3", // CSS preprocessor - 6.7 MiB
    "cross-env": "^7.0.3", // 292.0 KiB - scripts compatibility
    // "esbuild-serve": "^1.0.1", // Live reload - 7.4 MiB
    // Or just use the live reload piece from this package (~1 KiB)
  }
```

This results in a development environment of about ~50 MiB, with little left to remove except possibly TypeScript.
While not exact, a similar streamlined setup can be found here: https://github.com/SanariSan/esbuild-preact
