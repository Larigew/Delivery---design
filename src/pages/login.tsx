import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Usuário fixo (você pode alterar o email e senha para o que desejar)
  const fixedUser = {
    email: 'larissa@gmail.com', // Altere para o seu email
    senha: 'lari123', // Altere para a sua senha
    nome: 'Lari', // Altere para o seu nome
  };

  // Redirecionar automaticamente se o ID do usuário já estiver no localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verifica se o email e senha batem com o usuário fixo
    if (email === fixedUser.email && password === fixedUser.senha) {
      // Armazenar o nome do usuário no localStorage (ou ID, se preferir)
      localStorage.setItem('userId', fixedUser.email); // Ou pode usar o nome ou outro ID único
      localStorage.setItem('userName', fixedUser.nome);
      navigate('/home');
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-6">Aproveite o Delivery!</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end mb-4">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Esqueceu sua senha?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mb-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {error && (
          <div className="mt-4 text-sm text-center text-red-500">
            {error}
          </div>
        )}
        <p className="mt-6 text-sm text-center text-gray-600">
          Ainda não tem conta?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
