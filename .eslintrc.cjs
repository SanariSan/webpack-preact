module.exports = {
  // could explicitly define parser here, but leaving default eslint parser (*)
  // then override it with needed in "overrides" section
  // "parser": "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es2020: true,
    browser: true,
    jest: true,
  },
  settings: {
    // plugin import, resolving process https://github.com/import-js/eslint-plugin-import#resolvers
    'import/resolver': {
      // https://github.com/import-js/eslint-plugin-import#importextensions
      // use eslint-import-resolver-node only for these extensions https://www.npmjs.com/package/eslint-import-resolver-node
      node: {
        extensions: ['.js', '.jsx'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // plugins (eslint-plugin- <name>) - doing something on side (convert/compute) ;
  // exposing sets of rules to apply in "extends" ; exposing individual rules to apply/change in "rules" if have some
  plugins: [
    // a lot of useful typescript specific rules https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    '@typescript-eslint',
    // promises rules https://github.com/xjamundx/eslint-plugin-promise
    'promise',
    // everything about importing https://github.com/import-js/eslint-plugin-import
    'import',
    // converting local prettier config into set of rules https://github.com/prettier/eslint-plugin-prettier#installation
    'prettier',
  ],

  // extends (eslint-config- <name>) - sets of rules from plugins above ; from eslint-config- <name> directly
  extends: [
    'airbnb-base',
    'eslint:recommended',
    // setting up resolvers for import/export https://github.com/import-js/eslint-plugin-import#typescript
    'plugin:import/recommended',
    // promise recommended rules https://github.com/xjamundx/eslint-plugin-promise#rules
    'plugin:promise/recommended',
    // disabling all the rules that might conflict with prettier https://github.com/prettier/eslint-config-prettier#installation
    'prettier',
    // preact recommended rules
    'preact',
  ],

  // rules - place for overriding/setting rules from plugin/config
  // *although typescript configs are in separate "overrides" section, these rules work for both js and ts, then some overrided
  rules: {
    // ==========================================
    // rules:prettier

    // enable prettier format rules to be checked and marked as errors when violated https://github.com/prettier/eslint-plugin-prettier#installation
    'prettier/prettier': 'error',

    // ==========================================
    // rules:eslint

    // + eslint:recommended

    // Disallow use of the comma operator https://eslint.org/docs/rules/no-sequences
    // Allow because it's neat?
    'no-sequences': ['off'],

    // Disallow assignment operators in return statements
    // Allow when wrapped in parens
    'no-return-assign': ['error', 'except-parens'],

    // Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like for-in or for-of https://github.com/airbnb/javascript#iterators--nope
    // Just warn, because it's more clear to write for-of at first, then refactor into functional solution like forEach, map, etc.
    'no-iterator': ['warn'],
    'no-restricted-syntax': ['warn'],

    // allow void in some cases for @typescript-eslint/no-floating-promises compatibility https://eslint.org/docs/rules/no-void -> https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md#ignorevoid
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],

    // Putting default parameter at last allows function calls to omit optional tail arguments. https://eslint.org/docs/rules/default-param-last
    'default-param-last': ['error'],

    // Disallow async functions which have no await expression https://eslint.org/docs/rules/require-await
    // off because in recommended for @typescript-eslint as @typescript-eslint/require-await
    'require-await': ['off'],

    // Disallow await inside of loops https://eslint.org/docs/latest/rules/no-await-in-loop
    // off because it is usually useful
    'no-await-in-loop': ['off'],

    // Disallow use of Object.prototypes builtins directly https://eslint.org/docs/rules/no-prototype-builtins
    // Too restrictive, writing ugly code to defend against a very unlikely scenario
    'no-prototype-builtins': 'off',

    // Use function hoisting to improve code readability
    // off because of bug - https://stackoverflow.com/a/64024916
    'no-use-before-define': ['off', { functions: true, classes: true, variables: true }],

    // Require return statements to either always or never specify values https://eslint.org/docs/rules/consistent-return
    // Too much extra code (return undefined in every void fn) for little profit + ts analysis takes care
    'consistent-return': ['off'],

    // Disallow redundant return statements https://eslint.org/docs/rules/no-useless-return
    // Conflict with TS { Not all code paths return a value.ts(7030) }
    // Removing empty return; Don't want to type return undefined; so it's off
    'no-useless-return': ['off'],

    // Disallow the use of console https://eslint.org/docs/rules/no-console
    // When using node console should be allowed
    'no-console': ['off'],

    // Disallow if statements as the only statement in else blocks https://eslint.org/docs/rules/no-lonely-if
    'no-lonely-if': ['error'],

    // Enforce a maximum number of classes per file https://eslint.org/docs/latest/rules/max-classes-per-file
    // Set to 2 to be able to have abstract class near implementation
    'max-classes-per-file': ['error', 2],

    // Enforce that class methods utilize this https://eslint.org/docs/latest/rules/class-methods-use-this
    // Off because of DI pattern
    'class-methods-use-this': 'off',

    // ==========================================
    // rules:import

    // + import/recommended (recommended are listed below, since NOT listed on gh page)
    // "import/named": "error",
    // "import/namespace": "error",
    // "import/default": "error",
    // "import/export": "error",
    // "import/no-named-as-default": "warn",
    // "import/no-named-as-default-member": "warn",
    // "import/no-duplicates": "warn",

    // + plugin:import/typescript (recommended are partially listed below)
    // "import/named": 'off',

    // Ensures an imported module can be resolved to a module on the local filesystem https://github.com/import-js/eslint-plugin-import/blob/v2.25.2/docs/rules/no-unresolved.md
    // Ignoring node:* because these are core node modules, false positive
    'import/no-unresolved': ['error', { ignore: ['node:*'] }],

    // Forbid a module from importing a module with a dependency path back to itself https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
    'import/no-cycle': ['warn', { maxDepth: '∞' }],

    // Prefer a default export if module exports a single name https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
    'import/prefer-default-export': ['off'],

    // Forbid default exports https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html | https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
    'import/no-default-export': ['error'],

    // ==========================================
    // rules:promise

    // + plugin:promise/recommended

    // Turn off 'no-callback-in-promise'
    'promise/no-callback-in-promise': ['off'],
  },

  overrides: [
    // JavaScript-specific configuration
    {
      files: ['**/*.{js,jsx}'],
      rules: {
        // Disable TypeScript-specific rules for JavaScript files
        // "@typescript-eslint/explicit-function-return-type": ["off"],
        // "@typescript-eslint/explicit-module-boundary-types": ["off"],
        // "@typescript-eslint/no-var-requires": ["off"],

        // Enable "no-use-before-define" for JS files
        'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
      },
    },
    // TypeScript-specific configuration
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        // ts parser should read following configs file
        project: './tsconfig.json',
      },
      env: {
        node: true,
        es2020: true,
        browser: true,
        jest: true,
      },
      settings: {
        // Plugin import resolving process
        'import/resolver': {
          // Use eslint-import-resolver-typescript
          typescript: {
            // TS resolver reads the following config file
            project: './tsconfig.json',
          },
        },
      },
      extends: [
        // airbnb ts rules (compatibility only, no documented rules to change)
        'airbnb-typescript/base',
        // ts specific import rules
        'plugin:import/typescript',
        // ts overall recommended rules https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
        'plugin:@typescript-eslint/recommended',
        // ts overall recommended rules https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#extension-rules
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        // These 2 rules extend the base eslint/default-param-last rule. It adds support for optional parameters. https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': ['error'],

        // ==========================================
        // rules:@typescript-eslint minor

        // + plugin:@typescript-eslint/recommended
        // + plugin:@typescript-eslint/recommended-requiring-type-checking

        // Disallow the use of variables before they are defined (extends eslint no-use-before-define) https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.mdx
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: true, classes: true, variables: true, typedefs: true },
        ],

        // Enforce consistent lines between class members. TODO: clip properties, split methods
        '@typescript-eslint/lines-between-class-members': 'off',

        // Requires using either T[] or Array<T> for arrays https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.mdx
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array-simple',
          },
        ],

        // Bans @ts-<directive> comments from being used or requires descriptions after directive https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.mdx
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-ignore': false,
            'ts-nocheck': 'allow-with-description',
            'ts-check': 'allow-with-description',
            'ts-expect-error': 'allow-with-description',
            minimumDescriptionLength: 10,
          },
        ],

        // Recommends using @ts-expect-error over @ts-ignore https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.mdx
        // Because of rule "@typescript-eslint/ban-ts-comment", ts-ignore can't be used anyway, but with this - getting autofixed if written by mistake
        '@typescript-eslint/prefer-ts-expect-error': ['error'],

        // Enforces consistent usage of type assertions https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.mdx
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
          },
        ],

        // Require a specific member delimiter style for interfaces and type literals https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.mdx
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
            multilineDetection: 'brackets',
          },
        ],

        // Enforces using a particular method signature syntax https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.mdx
        // prop: () => {} for functions in objects
        '@typescript-eslint/method-signature-style': ['error', 'property'],

        // Requires expressions of type void to appear in statement position https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-void-expression.mdx
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          {
            ignoreArrowShorthand: false,
            ignoreVoidOperator: false,
          },
        ],

        // Disallow the delete operator with computed key expressions https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.mdx
        '@typescript-eslint/no-dynamic-delete': ['error'],

        // Enforces that type arguments will not be used if not required https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.mdx
        '@typescript-eslint/no-unnecessary-type-arguments': ['error'],

        // Requires that private members are marked as readonly if they're never modified outside of the constructor https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly.mdx
        '@typescript-eslint/prefer-readonly': ['error'],

        // Prefer using type parameter when calling Array#reduce instead of casting https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.mdx
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],

        // Enforce that this is used when only this type is returned https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-return-this-type.mdx
        '@typescript-eslint/prefer-return-this-type': ['error'],

        // Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.mdx
        '@typescript-eslint/prefer-string-starts-ends-with': ['error'],

        // Enforce template literal expressions to be of string type https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-template-expressions.mdx
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
          },
        ],

        // Exhaustiveness checking in switch with union type https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.mdx
        '@typescript-eslint/switch-exhaustiveness-check': ['error'],

        // ==========================================
        // rules:@typescript-eslint major

        // naming rules for everything https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.mdx
        '@typescript-eslint/naming-convention': [
          'error',

          /**
           * lead-trail underscores forbidden (if member is private, it should be
           * written in the way user can't access it, not just marked like "don't call please")
           * general style is camelCase
           */
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },

          // but for destructured params - do not apply style (you may want to save original look)
          {
            selector: 'variable',
            modifiers: ['destructured'],
            format: null,
          },

          // for class use PascalCase
          {
            selector: 'class',
            format: ['PascalCase'],
          },

          // for function parameters allow leading underscore (so it can be just _)
          {
            selector: 'parameter',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },

          // for const variables that contains lambda/arrow style is default - camelCase + PascalCase for Components/Containers
          {
            selector: ['variable'],
            format: ['camelCase', 'PascalCase'],
            types: ['function'],
            modifiers: ['const'],
          },

          // Same for plain functions
          {
            selector: ['function'],
            format: ['camelCase', 'PascalCase'],
            types: ['function'],
          },

          // for const variables that are exported - style is UPPER_CASE (default values) or PascalCase (Object with fns properties for example)
          {
            selector: 'variable',
            format: ['UPPER_CASE', 'PascalCase'],
            modifiers: ['const', 'exported'],
          },

          // for just const variables style is camelCase or UPPER_CASE (Object with fns properties for example)
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
            modifiers: ['const'],
          },

          // for properties and variables that require quotes - ignore style (http headers and similar)
          {
            selector: [
              'classProperty',
              'objectLiteralProperty',
              'typeProperty',
              'classMethod',
              'objectLiteralMethod',
              'typeMethod',
              'accessor',
              'enumMember',
            ],
            format: null,
            modifiers: ['requiresQuotes'],
          },

          // for object properties - ignore style (http headers and similar may not require quotes)
          {
            selector: ['objectLiteralProperty', 'objectLiteralMethod', 'typeProperty'],
            format: null,
          },

          // for interfaces add I before name
          {
            selector: 'interface',
            format: ['PascalCase'],
            // "prefix": ["I"]
          },

          // for types add T before name
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            // "prefix": ["T"]
          },

          // for types' generic params make it start with T (or be just T), type TMyType<T/Tsmth> = Array<T/Tsmth>
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T'],
          },

          // for enum - style is UPPER_CASE with prefix E
          {
            selector: ['enum'],
            format: ['UPPER_CASE'],
            prefix: ['E'],
          },

          // for enum members - style is UPPER_CASE
          {
            selector: ['enumMember'],
            format: ['UPPER_CASE'],
          },
        ],

        // Disallow usage of the any type https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.mdx
        '@typescript-eslint/no-explicit-any': ['warn'],

        // TS 3.8+ Enforces consistent usage of type exports https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-exports.mdx
        '@typescript-eslint/consistent-type-exports': ['error'],

        // TS 3.8+ Enforces consistent usage of type imports https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.mdx
        // Conflict with ide imports autocompletion (ctrl+space), but auto-fixes on save
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: true,
          },
        ],

        // Require explicit return types on functions and class methods https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.mdx
        // Currently off, relying on type inference ; ALWAYS off for js files in "overrides"
        '@typescript-eslint/explicit-function-return-type': [
          'off',
          {
            allowExpressions: false,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: false,
          },
        ],

        // Require explicit return and argument types on exported functions' and classes' public class methods https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.mdx
        // Currently off, relying on type inference ; ALWAYS off for js files in "overrides"
        '@typescript-eslint/explicit-module-boundary-types': [
          'off',
          {
            allowArgumentsExplicitlyTypedAsAny: false,
            allowDirectConstAssertionInArrowFunctions: true,
            allowedNames: [],
            allowHigherOrderFunctions: true,
            allowTypedFunctionExpressions: true,
          },
        ],

        // Requires that .toString() is only called on objects which provide useful information when stringified https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.mdx
        '@typescript-eslint/no-base-to-string': ['error'],

        // Requires Promise-like values to be handled appropriately https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.mdx
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            ignoreVoid: true,
            ignoreIIFE: false,
          },
        ],

        // Disallow the void operator except when used to discard a value https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-meaningless-void-operator.mdx
        '@typescript-eslint/no-meaningless-void-operator': [
          'error',
          {
            checkNever: false,
          },
        ],

        // Disallow the use of custom TypeScript modules and namespaces https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.mdx
        '@typescript-eslint/no-namespace': 'error',

        // Disallow the use of parameter properties in class constructors https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.mdx
        // When upgrade @typescript-eslint change "parameter-properties" since deprecated https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/parameter-properties.mdx
        // Allowed for DI classes pattern
        '@typescript-eslint/no-parameter-properties': ['off'],

        // Prevents conditionals where the type is always truthy or always falsy https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.mdx
        '@typescript-eslint/no-unnecessary-condition': [
          'warn',
          {
            allowConstantLoopConditions: true,
          },
        ],

        // Warns if a type assertion does not change the type of an expression https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.mdx
        // enabled by default, but might be useful to off later
        '@typescript-eslint/no-unnecessary-type-assertion': ['warn'],

        // Disallows the use of require statements except in import statements https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.mdx
        '@typescript-eslint/no-var-requires': ['warn'],

        // Require that all enum members be literal values to prevent unintended enum member name shadow issues https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.mdx
        '@typescript-eslint/prefer-literal-enum-member': [
          'error',
          {
            allowBitwiseExpressions: true,
          },
        ],

        // Requires that function parameters are typed as readonly to prevent accidental mutation of inputs https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.mdx
        // Off for Express mutation style compatibility
        '@typescript-eslint/prefer-readonly-parameter-types': [
          'off',
          {
            checkParameterProperties: true,
            ignoreInferredTypes: true,
            treatMethodsAsReadonly: true,
          },
        ],

        // Restricts the types allowed in boolean expressions https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/strict-boolean-expressions.mdx
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            // str !== ''
            allowString: false,
            // num !== 0
            allowNumber: false,
            // object ?? false
            allowNullableObject: true,
            allowNullableBoolean: false,
            allowNullableString: false,
            allowNullableNumber: false,
            allowAny: false,
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
          },
        ],

        // "error" by default, "warn" during refactoring to first fix all logical mistakes and only then bad typings
        '@typescript-eslint/no-unsafe-member-access': ['warn'],
        '@typescript-eslint/no-unsafe-call': ['warn'],
        '@typescript-eslint/no-unsafe-assignment': ['warn'],
      },
    },
  ],
};
