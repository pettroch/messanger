import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserSetupPage from "./Pages/UserSetup/UserSetup";
import HomePage from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

const Root = () => {
  return (
    <Router>
      <div className="h-screen bg-gray-100 flex flex-col">
        {/* Навигационная панель */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between">
            <Link to="/" className="text-2xl font-bold hover:text-gray-100">
              PetroChat
            </Link>
            <div className="flex space-x-4">
              <Link to="/test" className="hover:underline hover:text-gray-100">
                Добавить друга
              </Link>
            </div>
          </nav>
        </header>

        {/* Основной контент */}
        <main className="flex-grow container mx-auto">
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />

            {/* Страница регистрации */}
            <Route path="/setup" element={<UserSetupPage />} />

            {/* Страница логина */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default Root;
