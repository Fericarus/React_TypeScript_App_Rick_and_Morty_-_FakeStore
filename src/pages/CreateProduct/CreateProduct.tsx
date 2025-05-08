import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BackButton from "../../components/BackButton/BackButton";
import * as yup from "yup";
import axios from "axios";
import styles from "./CreateProduct.module.scss";

// Interface FormInputs 
interface FormInputs {
	title: string;
	price: number;
	description: string;
	image: string;
}

// Validación del schema usando Yup
const schema = yup.object().shape({
	title: yup
		.string()
		.matches(/^[A-Za-z\s]+$/, "Solo letras")
		.required("Título obligatorio"),
	price: yup.number().typeError("Debe ser un número").positive("Debe ser positivo").required("Precio obligatorio"),
	description: yup
		.string()
		.matches(/^[A-Za-z\s]+$/, "Solo letras")
		.required("Descripción obligatoria"),
	image: yup
		.string()
		.matches(/^[a-zA-Z0-9:/._-]+$/, "Debe ser alfanumérica o URL válida")
		.required("Imagen obligatoria"),
});

export default function CreateProduct() {

	// useForm hook para manejar el formulario
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormInputs>({
		resolver: yupResolver(schema),
	});

	console.log(errors);

	// Función para manejar el envío del formulario
	const onSubmit = async (data: FormInputs) => {
		try {
			const response = await axios.post("https://fakestoreapi.com/products", data);
			alert(`Producto creado con ID: ${response.data.id}`);
			reset();
		} catch (err) {
			alert("Error al crear el producto");
		}
	};

	return (
		<div className={styles.mainContainer}>
            <BackButton destination='/mainhub'></BackButton>
			<div className={styles.container}>
				<h2>Crear nuevo producto</h2>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

					{/* Titulo */}
					<label>Título</label>
					<input {...register("title")} />
					{errors.title && <span>{errors.title.message}</span>}

					{/* Precio */}
					<label>Precio</label>
					<input {...register("price")} type="number" step="0.01" />
					{errors.price && <span>{errors.price.message}</span>}

					{/* Descripción */}
					<label>Descripción</label>
					<textarea {...register("description")} />
					{errors.description && <span>{errors.description.message}</span>}

					{/* Imagen */}
					<label>Imagen (URL o nombre)</label>
					<input {...register("image")} />
					{errors.image && <span>{errors.image.message}</span>}

					<button type="submit">Crear Producto</button>
				</form>
			</div>
		</div>
	);
}
