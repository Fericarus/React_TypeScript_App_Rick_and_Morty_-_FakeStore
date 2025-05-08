import { useNavigate } from "react-router-dom";
import styles from "./MainHub.module.scss";
import { useAuthStore } from "../../store/useAuthStore";

// Interfaz para las secciones
const sections = [
	{ title: "Rick & Morty", route: "/rick-morty", description: "Explora personajes" },
	{ title: "Productos", route: "/products", description: "Ver productos disponibles" },
	{ title: "Crear Producto", route: "/create-product", description: "Añade un nuevo producto" },
	{ title: "Subir Imagen", route: "/upload", description: "Carga y vista previa de imágenes" },
];

export default function MainHub() {
	
	// Estado de autenticación
	const logout = useAuthStore((state) => state.logout);

	// Navegación
	const navigate = useNavigate();

	return (
		<div className={styles.mainContainer}>
			<div>
				<button onClick={() => logout()}>Salir</button>
			</div>
			<div className={styles.container}>
				<h2>Bienvenido </h2>
				<p>Selecciona una opción para comenzar</p>

				<div className={styles.grid}>
					{sections.map((sec) => (
						<div key={sec.title} className={styles.card} onClick={() => navigate(sec.route)}>
							<h3>{sec.title}</h3>
							<p>{sec.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
