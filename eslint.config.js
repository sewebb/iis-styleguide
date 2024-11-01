// eslint.config.js
import babelParser from "@babel/eslint-parser";
import eslintConfig from "@internetstiftelsen/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname
});
export default [
	eslintConfig, {
		"languageOptions": {
			"parser": babelParser
		},
		"env": {
			"browser": true
		},
		"globals": {
			"YT": true
		},
		"rules": {
			"no-param-reassign": [2, { "props": false }],
		},
		ignores: ["*.conf.js", "*.config.js", "*vendor*"],
		...compat.extends("eslint-config-airbnb-base"),
	}
];
