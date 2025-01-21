import { UserAuthProvider } from './context/UserAuthContext';
import PrivyWalletProvider from './context/PrivyProvider';
import Chat from './pages/chat'

function App() {
  return (
    <UserAuthProvider>
      <PrivyWalletProvider>
        <Chat />
      </PrivyWalletProvider>
    </UserAuthProvider>
  );
}

export default App
