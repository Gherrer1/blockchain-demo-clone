const path = require('path');

module.exports = {
    "env": {
        "browser": true,
        "jest": true,
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "comma-dangle": ["error", {
            "functions": "ignore",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "arrays": "always-multiline",
        }],
        "import/prefer-default-export": 0,
        "indent": ["error", "tab"],
        "jsx-a11y/no-noninteractive-element-to-interactive-role": 0,
        "no-alert": 0,
        "no-param-reassign": [2, {"props": false}],
        "no-plusplus": 0,
        "no-tabs": 0,
        "no-underscore-dangle": 0,
        "object-curly-newline": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-indent": [2, 'tab'],
        "react/jsx-indent-props": [2, 'tab'],
        "react/jsx-one-expression-per-line": 0
    },
    "settings": {
        "import/resolver": {
            "node": {
                "paths": [path.resolve(__dirname, 'app')]
            }
        }
    }
};