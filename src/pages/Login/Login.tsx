import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.scss";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

// Interfaz para los datos del formulario
interface LoginFormInputs {
	email: string;
	password: string;
	confirmPassword: string; // <- obligatorio
}

// Esquema de validación
const schema = yup.object().shape({

	// Debe ser un string. Debe tener formato de email. Es obligatorio.
	email: yup.string().email("Correo inválido").required("Correo es obligatorio"),
	
	// Contraseña
	password: yup
		.string()

		// Obligatorio
		.required("Contraseña obligatoria")

		// Entre 6 y 12 caracteres.
		.min(6, "Mínimo 6 caracteres")
		.max(12, "Máximo 12 caracteres")

		// Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.
		.matches(/[A-Z]/, "Al menos una mayúscula")
		.matches(/[a-z]/, "Al menos una minúscula")
		.matches(/[0-9]/, "Al menos un número")
		.matches(/[!@#$%^&*(),.?":{}|<>]/, "Al menos un carácter especial"),

		// Confirmar contraseña
		confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Las contraseñas no coinciden")
		.required("Confirma tu contraseña"),
});

export default function Login() {
	
	// Estado de autenticación
	const login = useAuthStore((state) => state.login);

	// Navegación
	const navigate = useNavigate();

	// Hook de formulario
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
	});

	// Función para manejar el envío del formulario
	const onSubmit = (data: LoginFormInputs) => {
		login(data.email);
		navigate("/mainhub");
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.container}>
				<h2>Iniciar Sesión</h2>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					
					{/* Correo electrónico */}
					<label>Correo electrónico</label>
					<input {...register("email")} onPaste={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} />
					{errors.email && <span>{errors.email.message}</span>}

					{/* Contraseña */}
					<label>Contraseña</label>
					<input type="password" {...register("password")} onPaste={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} />
					{errors.password && <span>{errors.password.message}</span>}

					{/* Confirmar Contraseña */}
					<label>Confirmar Contraseña</label>
					<input type="password" {...register("confirmPassword")} onPaste={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} />
					{errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

					{/* Botón de enviar */}
					<button type="submit">Entrar</button>

				</form>
			</div>
		</div>
	);
}
