import { Link } from 'react-router-dom';

const Card = ({ filme }) => {
    const imagemURL = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

    return (
        <div className="card">
            <Link to={`/filme/${filme.id}`}>
                <img src={imagemURL} alt={filme.title} />
                <h2>{filme.title}</h2>
                <p>{new Date(filme.release_date).getFullYear() || 'Sem data'}</p>
            </Link>
        </div>
    );
};

export default Card;

