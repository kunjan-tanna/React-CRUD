import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/common";
import { displayLog } from "../../utils/functions";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import styles from "./ProductList.module.css";
import routes from "../../Routes/Routes";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 8;
  const skip = (page - 1) * productsPerPage;
  console.log("SKIP", skip);
  const fetchProducts = async () => {
    setLoading(true);
    // https://dummyjson.com/products?skip=${skip}&limit=${productsPerPage}`
    try {
      const response = await apiCall(
        "GET",
        `products?skip=${skip}&limit=${productsPerPage}`
      );
      console.log("response", response);
      setProducts(response?.products);
      setTotalProducts(response?.total);
      setLoading(false);
    } catch (error) {
      displayLog(0, error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom className={styles.productTitle}>
        Product Listing
      </Typography>
      {loading && <div className={styles.loader}>Loading...</div>}

      <Grid container spacing={3}>
        {!loading &&
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className={styles.productLink}
              >
                <Card className={styles.cardContainer}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="140"
                    image={product.thumbnail}
                    title={product.title}
                  />
                  <CardContent className={styles.cardContent}>
                    <Typography variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" className={styles.textContent}>
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body2" className={styles.textContent}>
                      Brand: {product.brand}
                    </Typography>
                    <Typography variant="body2" className={styles.textContent}>
                      Rating: {product.rating}
                    </Typography>
                    <Typography variant="body2" className={styles.textContent}>
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" className={styles.textContent}>
                      Discount: {product.discountPercentage}%
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
      {!loading && (
        <Box className={styles.paginationContainer}>
          <Button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            variant="contained"
            // className={styles.disablepaginationButton}
            color="primary"
          >
            Previous
          </Button>
          <Typography variant="body1" className={styles.showPage}>
            Page {page}
          </Typography>
          <Button
            disabled={page * productsPerPage >= totalProducts}
            onClick={() => handlePageChange(page + 1)}
            variant="contained"
            className={styles.paginationButton}
          >
            Next
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default ProductList;
