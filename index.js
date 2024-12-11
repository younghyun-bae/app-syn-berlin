import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

export function App() {
  const context = require.context('./app');
  return <ExpoRoot context={context} />;
}

registerRootComponent(App);