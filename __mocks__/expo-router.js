jest.mock('expo-router', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      back: jest.fn(),
    }),
    router: {
      push: jest.fn(),
    },
  };
});