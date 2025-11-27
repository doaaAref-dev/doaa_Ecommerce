import { useEffect, useState } from "react";
import { Drawer, Box, Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addReview, fetchReviews } from "../../redux/Slices/productSlice";

export default function ReviewDrawer({ open, onClose, product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.products);
console.log(reviews);

  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = product._id;

  // fetch مرة واحدة عند فتح الـ drawer فقط
  useEffect(() => {
    if (open && productId) {
      dispatch(fetchReviews(`${productId}?t=${Date.now()}`));
    }
  }, [open, productId, dispatch]);

const handleSubmit = async () => {
  if (!user) return alert("You must be logged in to add a review.");

 const newReview = {
  userId: user._id,
  userName: user.name,
  rating,
  comment,
  date: new Date().toISOString(),
};


try {
  await dispatch(addReview({ productId, data: newReview })).unwrap();

  dispatch(fetchReviews(productId));
  setRating(0);
  setComment("");
  setModalOpen(false);

} catch (err) {
  console.error("Failed to add review:", err);
}
};


  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={350} p={3}>
        <h2>Reviews</h2>

        {reviews?.length === 0 ? (
          <p>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r, i) => (
            <Box key={i} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
              <strong>{r.userName}</strong>
              <Rating value={r.rating} readOnly size="small" />
              <p>{r.comment}</p>
             <small>{new Date(r.date).toLocaleString()}</small>

            </Box>
          ))
        )}

        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "#368da7", "&:hover": { bgcolor: "#ff6347" } }}
          onClick={() => setModalOpen(true)}
        >
          Add Review
        </Button>

        {modalOpen && (
          <Box mt={3} p={2} border="1px solid #368da7" borderRadius={2}>
            <h3>Add your review</h3>
            <Rating value={rating} onChange={(e, v) => setRating(v)} sx={{ mb: 2 }} />
            <TextField
              multiline
              fullWidth
              rows={3}
              label="Your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              fullWidth
              sx={{ mt: 2, bgcolor: "#368da7", "&:hover": { bgcolor: "#ff6347" } }}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
