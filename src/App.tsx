import { UserAuthProvider } from './context/UserAuthContext';
import { PrivyProvider } from './context/PrivyProvider';
import Chat from './pages/chat'

function App() {
  return (
    <UserAuthProvider>
      <PrivyProvider>
        <Chat />
      </PrivyProvider>
    </UserAuthProvider>
  );
}

export default App
