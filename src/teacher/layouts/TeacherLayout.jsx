/* eslint-disable react/prop-types */
import { NavbarComponent } from "../index";

export const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <NavbarComponent />
      </nav>

      <main className="text-center text-lg lg:mt-16 flex-grow flex flex-col items-center">
        <div className="flex flex-row justify-around flex-wrap">{children}</div>
      </main>

      <footer className="bg-palette-950 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">Education Software</h1>
              <p className="text-gray-400">
                © 2024 Hecho por Jefferson Henao.
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="flex justify-center space-x-4 mt-2">
              {/* Aquí puedes colocar íconos de redes sociales */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
