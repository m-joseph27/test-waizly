module.exports = {
  preset: './jest-preset.js',
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.js$': 'babel-jest', // Add this line if you're using Babel for JavaScript files
  },
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
};
