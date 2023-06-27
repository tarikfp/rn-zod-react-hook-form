import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SignupForm } from './src/SignupForm';

export default function App() {
  return (
    <SafeAreaProvider>
      <SignupForm />
    </SafeAreaProvider>
  );
}
