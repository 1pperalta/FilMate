import { useEffect, useState } from "react";
import Category from "./components/Category";
import Movie from "./components/Movie";
import { supabase } from "./supabaseClient";


const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [recommend, setRecommend] = useState();

  const traerCategorias = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*, movies(*)")
      .limit(20, { foreignTable: "movies" });
    
    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      console.log("Fetched categories:", data);
      setCategories(data);
    }
  };

  const traerRecomendaciones = async (name) => {
    try {
      const resp = await fetch(`http://127.0.0.1:5000/recommend?movie=${name}`);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      setRecommend(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };
  
  const onCategoryClick = (category) => setSelectedCategory(category);
  const onMovieClick = (movie) => setSelectedMovie(movie);

  useEffect(() => {
    traerCategorias();
  }, []);

  useEffect(() => {
    if (!selectedMovie) return;
    traerRecomendaciones(selectedMovie.name);
  }, [selectedMovie]);

  useEffect(() => {
    setSelectedMovie();
  }, [selectedCategory]);

  return (
    <div className="container">
      <p>Categoria seleccionada: {selectedCategory?.name}</p>
      <p>Película seleccionada: {selectedMovie?.name}</p>

      <div className="row gap-5 justify-content-center align-items-center">
        {categories?.map((category) => (
          <Category
            key={category.id}
            category={category}
            click={onCategoryClick}
          />
        ))}
      </div>

      <div className="row gap-5 justify-content-center align-items-center">
        {selectedCategory?.movies.map((movie) => (
          <Movie key={movie.id} movie={movie} movieClick={onMovieClick} />
        ))}
      </div>

      <ul>
        {recommend?.map((movie) => (
          <li key={movie}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
