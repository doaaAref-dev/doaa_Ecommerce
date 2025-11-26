import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBySearch } from "../../redux/Slices/productSlice";
import ProductItem from "../../Component/ProductItem";

export default function SearchResults() {
  const { query } = useParams();
  const dispatch = useDispatch();

  const { searchResults, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (query) {
      dispatch(fetchProductsBySearch(query));
    }
  }, [dispatch, query]);

  return (
    <div className="container mx-auto py-8 grid grid-cols-3 gap-4">
      {loading ? (
        <p>Loading ...</p>
      ) : searchResults?.length > 0 ? (
        searchResults.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      ) : (
        <p>{query} : Not Found </p>
      )}
    </div>
  );
}
