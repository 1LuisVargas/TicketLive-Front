
import * as Yup from 'yup';

//Interfaz de los valores de register
export interface RegisterFormValuesType {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  address: string;
  phone: string;
}

//Valores iniciales de formulario register
export const registerInitialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  address: '',
  phone: ''
};

//Esquema de validación
export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(12, 'La contraseña debe tener al menos 12 caracteres')
    .max(64, 'La contraseña debe tener máximo 64 caracteres')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*]/, 'La contraseña debe contener al menos un símbolo (!@#$%^&*)')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('Por favor confirma tu contraseña'),
  name: Yup.string().required('El nombre es obligatorio'),
  address: Yup.string(),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Solo debe contener números')
});

