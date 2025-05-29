import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FilmeDetalhe from './pages/FilmeDetalhe';
import Home from './pages/home';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo deu errado. Tente novamente mais tarde.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filme/:id" element={<FilmeDetalhe />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
