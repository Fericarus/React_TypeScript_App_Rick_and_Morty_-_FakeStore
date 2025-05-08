import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Products.module.scss";

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
	category: string;
}

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [filtered, setFiltered] = useState<Product[]>([]);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

	const PRODUCTS_PER_PAGE = 20;

	useEffect(() => {
		axios.get("https://fakestoreapi.com/products").then((res) => {
			setProducts(res.data);
			setFiltered(res.data);
		});
	}, []);

	useEffect(() => {
		const filteredList = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
		setFiltered(filteredList);
		setCurrentPage(1);
	}, [search, products]);

	const indexStart = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const indexEnd = indexStart + PRODUCTS_PER_PAGE;
	const paginatedProducts = filtered.slice(indexStart, indexEnd);

	const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

	return (
		<div className={styles.mainContainer}>
			<BackButton destination='/mainhub'></BackButton>
			<div className={styles.container}>
				<h2>Productos</h2>

				<input type="text" placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.search} />

				<div className={styles.grid}>
					{paginatedProducts.map((product) => (
						<div key={product.id} className={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
							<img src={product.image} alt={product.title} />
							<div className={styles.info}>
								<h3>{product.title}</h3>
								<p>
									<strong>${product.price}</strong>
								</p>
								<p>{product.category}</p>
							</div>
						</div>
					))}
				</div>

				<div className={styles.pagination}>
					{[...Array(totalPages)].map((_, i) => (
						<button key={i} onClick={() => setCurrentPage(i + 1)} className={i + 1 === currentPage ? styles.active : ""}>
							{i + 1}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
