import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import axios from "axios";
import styles from "./ProductDetail.module.scss";

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
	category: string;
}

export default function ProductDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`https://fakestoreapi.com/products/${id}`)
			.then((res) => {
				setProduct(res.data);
				setLoading(false);
			})
			.catch(() => {
				navigate("/404"); // o mostrar error local si prefieres
			});
	}, [id, navigate]);

	if (loading) return <p className={styles.loading}>Cargando...</p>;
	if (!product) return <p className={styles.error}>Producto no encontrado.</p>;

	return (
		<div className={styles.mainContainer}>
            <BackButton destination='/products'></BackButton>
			<div className={styles.container}>
				<div className={styles.card}>
					<img src={product.image} alt={product.title} />
					<div className={styles.details}>
						<h2>{product.title}</h2>
						<p className={styles.price}>${product.price}</p>
						<p className={styles.category}>
							<strong>Categoría:</strong> {product.category}
						</p>
						<p className={styles.description}>{product.description}</p>
						<button onClick={() => navigate(-1)}>Volver</button>
					</div>
				</div>
			</div>
		</div>
	);
}
