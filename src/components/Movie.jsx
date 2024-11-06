import PropTypes from 'prop-types';

const Movie = ({ movie, movieClick }) => {
  return (
    <div className="card col-12 col-md-6 col-lg-2 mt-5">
      <div className="card-body">
        <h5 className="card-title">{movie.name}</h5>
        <button className="btn btn-primary" onClick={() => movieClick(movie)}>
          Seleccionar
        </button>
      </div>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  movieClick: PropTypes.func.isRequired,
};

export default Movie;

