import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await api.get(`/movie/${id}`);
                setFilme(response.data);
                setError(null);
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme:', error.response?.data || error.message);
                setError('Falha ao carregar os detalhes do filme.');
            }
        };

        fetchFilme();
    }, [id]);

    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
    if (!filme) return <p className="text-center text-gray-500 text-lg">Carregando...</p>;

    const imagemURL = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

    return (
        <div className="filmedetalhe-container">
            <button
                className="botao-home"
                onClick={() => navigate('/')}
            >
                Voltar ao Home
            </button>
            <div className="flex flex-wrap gap-8">
                <img
                    src={imagemURL}
                    alt={filme.title}
                    className="cartaz"
                />
                <div className="flex-1 min-w-[300px]">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">{filme.title}</h1>
                    <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                        {filme.overview || 'Sem descrição disponível'}
                    </p>
                    <p className="text-gray-500">
                        <strong>Ano:</strong>{' '}
                        {filme.release_date ? new Date(filme.release_date).getFullYear() : 'Sem data'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
