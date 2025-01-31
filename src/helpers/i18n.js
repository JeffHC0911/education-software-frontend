import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            login: "Login",
            register: "Register",
            home: "Home",
            createcourse: "Create Course",
            about: "About",
            viewcourse: "View Course",
            managegrades: "Manage Grades",
            teammember: "Team Member",
            name: "Name",
            definitivegrade: "Definitive Grade",
            exporttoexcel: "Export to Excel",
            addstudent: "Add Student",
            addassesments: "Add Assesment",
            addgrades: "Add Grades",
            confirm: "Confirm",
            cancel: "Cancel"
        }
    },
    es: {
        translation: {
            welcome: "Bienvenido",
            login: "Iniciar sesión",
            register: "Registrar",
            home: "Inicio",
            createcourse: "Crear Curso",
            about: "Acerca de",
            viewcourse: "Ver Curso",
            managegrades: "Administrar Notas",
            teammember: "Miembros",
            name: "Nombre",
            definitivegrade: "Nota Definitiva",
            exporttoexcel: "Exportar Excel",
            addstudent: "Registrar Estudiante",
            addassesments: "Registrar Evaluación",
            addgrades: "Registrar Notas",
            confirm: "Confirmar",
            cancel: "Cancelar"

        }
    }
};

i18n
    .use(LanguageDetector) // Detecta el idioma automáticamente
    .use(initReactI18next) // Integra con React
    .init({
        resources,
        fallbackLng: 'en', // Idioma predeterminado
        interpolation: {
            escapeValue: false // React ya escapa automáticamente
        }
    });

export default i18n;
