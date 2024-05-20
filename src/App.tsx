import LandingPage from "./components/LandingPage"
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

export const App = () => {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LandingPage />
      </QueryClientProvider>
    </>
  )
}

export default App
