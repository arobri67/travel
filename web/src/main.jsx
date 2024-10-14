import ReactDOM from 'react-dom/client';

import AuthProvider from '@/components/AuthProvider.jsx';

import Router from './Router.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router />
  </AuthProvider>,
);
