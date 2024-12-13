import React from "react";
import { Link } from "react-router-dom";

const HomeUnAuthPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Добро пожаловать в PetroChat!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Ваше новое место для общения с друзьями, обмена сообщениями и
          совместных мгновений!
        </p>
        <p className="text-md text-gray-500 mb-8">
          Чтобы приступить к общению, настройте аккаунт, выбрав имя, имя
          пользователя и аватар.
        </p>

        <Link
          to="/setup"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Настроить новый аккаунт
        </Link>

        <div className="mt-6 text-gray-500 text-sm">
          <p>Уже зарегистрированы? Войдите в свой аккаунт, чтобы продолжить.</p>
          {/* Добавьте ссылку для входа, если хотите */}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeUnAuthPage;
