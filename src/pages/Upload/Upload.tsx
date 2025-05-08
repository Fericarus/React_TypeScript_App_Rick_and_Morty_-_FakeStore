import { useState } from "react";
import type { DragEvent, ChangeEvent } from "react";
import BackButton from "../../components/BackButton/BackButton";

import styles from "./Upload.module.scss";

const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];

export default function Upload() {
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState("");

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		validateFile(file);
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) validateFile(file);
	};

	const validateFile = (file: File) => {
		if (!acceptedTypes.includes(file.type)) {
			setError("Formato no válido. Solo PNG, JPG o JPEG");
			return;
		}
		setImage(file);
		setPreview(URL.createObjectURL(file));
		setError("");
	};

	const handleRemove = () => {
		setImage(null);
		setPreview(null);
	};

	return (
		<div className={styles.mainContainer}>
            <BackButton destination='/mainhub'></BackButton>
			<div className={styles.container}>
				<h2>Subir Imagen</h2>

				{!preview ? (
					<div className={styles.dropZone} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
						<p>Arrastra una imagen aquí o haz clic para seleccionar</p>
						<input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className={styles.fileInput} />
					</div>
				) : (
					<div className={styles.previewContainer}>
						<img src={preview} alt="preview" className={styles.preview} />
						<button onClick={handleRemove}>Eliminar</button>
					</div>
				)}

				{error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
}
