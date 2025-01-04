module.exports = {
  setupFiles: ['./jest.setup.js'],
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|firebase|@fortawesome/react-native-fontawesome)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js'
  },
  testEnvironment: 'node',
};