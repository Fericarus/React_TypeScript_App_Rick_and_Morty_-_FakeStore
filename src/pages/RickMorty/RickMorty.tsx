import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import axios from "axios";
import moment from "moment";
import styles from "./RickMorty.module.scss";

// Inteface para el personaje
interface Character {
	id: number;
	name: string;
	species: string;
	gender: string;
	image: string;
	created: string;
}

// Tipos para el orden y el campo de ordenación
type SortField = "id" | "name" | "species" | "gender" | "created";
type SortOrder = "asc" | "desc";

export default function RickMorty() {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [sortField, setSortField] = useState<SortField>("id");
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	// Funcion para obtener los personajes de la API
	const fetchCharacters = async (page: number) => {
		const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
		setCharacters(res.data.results);
		setTotalPages(res.data.info.pages);
	};

	// Funcion para manejar el orden de los personajes
	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortField(field);
			setSortOrder("asc");
		}
	};

	// Ordenar los personajes
	const sortedCharacters = [...characters].sort((a, b) => {
		const valA = a[sortField];
		const valB = b[sortField];
		if (valA < valB) return sortOrder === "asc" ? -1 : 1;
		if (valA > valB) return sortOrder === "asc" ? 1 : -1;
		return 0;
	});

	useEffect(() => {
		fetchCharacters(currentPage);
	}, [currentPage]);

	// Cambiar el título de la pestaña
	const renderPagination = () => {

		// Si no hay personajes, no mostrar paginación
		const pages = [];
		const maxPages = 5;
		let start = Math.max(1, currentPage - 2);
		let end = Math.min(totalPages, currentPage + 2);

		// Si hay menos de 5 páginas, mostrar todas
		if (currentPage <= 3) end = Math.min(totalPages, maxPages);
		if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);

		// Añadir botones de paginación
		for (let i = start; i <= end; i++) {
			pages.push(
				<button key={i} className={i === currentPage ? styles.activePage : ""} onClick={() => setCurrentPage(i)}>
					{i}
				</button>
			);
		}

		// Añadir botón de "anterior" y "siguiente"
		return <div className={styles.pagination}>{pages}</div>;
	};

	return (
		<div className={styles.mainContainer}>
			
			{/* BackButton para volver a la página principal */}
			<BackButton destination="/mainhub"></BackButton>
			
			{/* Título de la página */}
			<div className={styles.container}>
				<h2>Personajes de Rick & Morty</h2>

				{/* Tabla de personajes */}
				<table>
					<thead>
						<tr>
							<th onClick={() => handleSort("id")}>ID</th>
							<th onClick={() => handleSort("name")}>Nombre</th>
							<th onClick={() => handleSort("species")}>Especie</th>
							<th onClick={() => handleSort("gender")}>Género</th>
							<th>Imagen</th>
							<th onClick={() => handleSort("created")}>Creado</th>
						</tr>
					</thead>
					<tbody>

						{/* Mapeo de los personajes para mostrar en la tabla */}
						{/* Se utiliza el método sortedCharacters para mostrar los personajes ordenados */}
						{sortedCharacters.map((char) => (
							<tr key={char.id}>
								<td>{char.id}</td>
								<td>{char.name}</td>
								<td>{char.species}</td>
								<td>{char.gender}</td>
								<td>
									<img src={char.image} alt={char.name} width={40} />
								</td>
								<td>{moment(char.created).format("DD/MM/YYYY")}</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Botones de paginación */}
				{renderPagination()}
			</div>
		</div>
	);
}
