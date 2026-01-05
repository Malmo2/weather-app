module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/js/tests/**/*.test.[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['js/**/*.js', '!js/tests/**'],
  coverageDirectory: 'coverage'
};
