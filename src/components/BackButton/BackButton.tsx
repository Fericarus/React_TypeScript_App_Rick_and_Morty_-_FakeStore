import styles from "./BackButton.module.scss";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
	destination: string;
}

export default function BackButton({ destination }: BackButtonProps) {
	const navigate = useNavigate();

	return (
		<div className={styles.navContainer}>
			{/* <button onClick={() => navigate("/mainhub")} className={styles.backButton}> */}
			<button onClick={() => navigate(destination)} className={styles.backButton}>
				🡸 Regresar
			</button>
		</div>
	);
}
