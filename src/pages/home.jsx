import { useEffect, useState } from 'react';
import api from '../api';
import Card from '../components/Card';

const Home = () => {
    const [filmes, setFilmes] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                console.log('Buscando filmes, página:', page);
                const response = await api.get('/movie/popular', {
                    params: { page },
                });
                console.log('Resposta da API:', response.data);
                const filmesData = Array.isArray(response.data.results) ? response.data.results : [];
                setFilmes(filmesData);
                setError(null);
            } catch (error) {
                console.error('Erro ao buscar filmes:', error.response?.data || error.message);
                setError('Falha ao carregar os filmes. Verifique a conexão ou a chave da API.');
                setFilmes([]);
            }
        };

        fetchFilmes();
    }, [page]);

    if (error) return <p>{error}</p>;
    if (!filmes.length) return <p>Carregando filmes...</p>;

    console.log('Renderizando filmes:', filmes);
    return (
        <div>
            <h1>aaaa</h1>
            <div className="card-container">
                {filmes.map((filme) => (
                    <Card key={filme.id} filme={filme} />
                ))}
            </div>
            <div className="paginação">
                <button className='Anterior' onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                    Anterior
                </button>
                <button className='Proximo' onClick={() => setPage((prev) => prev + 1)}>
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default Home;
