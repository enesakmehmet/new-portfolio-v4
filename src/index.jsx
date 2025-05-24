import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoadingScreen from './components/LoadingScreen'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Export Root component for fast refresh to work
export const Root = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter basename="/new-portfolio-v4">
        {isLoading ? <LoadingScreen /> : <App />}
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Render the Root component
ReactDOM.createRoot(document.getElementById('root')).render(<Root />)

