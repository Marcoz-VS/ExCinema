import axios from 'axios';

console.log('Variáveis de ambiente:', {
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
});

if (!import.meta.env.VITE_TMDB_BASE_URL || !import.meta.env.VITE_TMDB_API_KEY) {
    console.error('Erro: Variáveis de ambiente VITE_TMDB_BASE_URL ou VITE_TMDB_API_KEY não estão definidas. Verifique o arquivo .env na raiz do projeto.');
    throw new Error('Configuração de API inválida. Verifique as variáveis de ambiente.');
}

const api = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'pt-BR',
    },
});

api.interceptors.response.use(
    (response) => {
        console.log('Requisição bem-sucedida:', response.config.url);
        return response;
    },
    (error) => {
        console.error('Erro na API:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data || error.message,
        });
        return Promise.reject(error);
    }
);

export default api;
