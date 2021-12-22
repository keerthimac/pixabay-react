import { useState, useEffect } from "react";

import ImageList from "./components/ImageList";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  const handleSearch = (text) => {
    setTerm(text);
    setIsLoading(true);
  };

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}s&image_type=photo&pretty=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [term]);

  return (
    <div className='container mx-auto'>
      <ImageSearch handleSearch={handleSearch} />
      <ImageList images={images} isLoading={isLoading} />
    </div>
  );
}

export default App;
