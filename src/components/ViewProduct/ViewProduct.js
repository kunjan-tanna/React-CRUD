import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiCall } from "../../utils/common";
import { displayLog } from "../../utils/functions";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import styles from "./ViewProduct.module.css";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await apiCall("GET", `products/${id}`);
      setProduct(response);
      setLoading(false);
    } catch (error) {
      displayLog(0, error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom className={styles.productTitle}>
        {product.title}
      </Typography>

      <Card className={styles.cardContainer}>
        <CardMedia
          component="img"
          alt={product.title}
          height="200"
          image={product.thumbnail}
          title={product.title}
          className={styles.productImage}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" className={styles.textContent}>
            Category: {product.category}
          </Typography>
          <Typography variant="body2" className={styles.textContent}>
            Brand: {product.brand}
          </Typography>
          <Typography variant="body2" className={styles.textContent}>
            Rating: {product.rating} ★
          </Typography>
          <Typography variant="body2" className={styles.textContent}>
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" className={styles.textContent}>
            Discount: {product.discountPercentage}%
          </Typography>
          <Typography variant="body2" className={styles.textContent}>
            Stock: {product.stock}
          </Typography>
          <Typography variant="body2" className={styles.textContent}>
            Description: {product.description}
          </Typography>
        </CardContent>
      </Card>

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
}

export default ViewProduct;
