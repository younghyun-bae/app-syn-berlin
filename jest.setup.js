import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import '@react-native-firebase/app';
import { jest } from '@jest/globals';
import * as WebBrowser from 'expo-web-browser';

jest.mock(
  'expo-web-browser', () => ({
    maybeCompleteAuthSession: jest.fn(),}),
);
