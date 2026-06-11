module.exports = {
  "*": ["prettier --check --ignore-unknown"],
  "*.{ts,tsx}": ["eslint --max-warnings 0"],
}
