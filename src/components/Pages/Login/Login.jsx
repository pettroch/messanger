import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast"; // Библиотека для уведомлений
import { useNavigate } from "react-router-dom"; // Для перенаправления на другую страницу после успешной авторизации

const Login = () => {
  const [username, setUsername] = useState(""); // Состояние для username
  const [password, setPassword] = useState(""); // Состояние для пароля
  const [isLoading, setIsLoading] = useState(false); // Состояние для индикатора загрузки
  const navigate = useNavigate();

  // Функция для обработки изменения полей
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Функция для обработки отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Простейшая валидация полей
    if (!username || !password) {
      toast.error("Заполните все поля!");
      setIsLoading(false);
      return;
    }

    try {
      // Здесь будет ваш API-запрос для авторизации
      // Например, fetch для отправки данных на сервер
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Если авторизация успешна, перенаправляем на главную страницу
        toast.success("Вы успешно авторизовались!");
        navigate("/dashboard"); // или любой другой путь, на который нужно перенаправить
      } else {
        toast.error(data.message || "Ошибка авторизации!");
      }
    } catch (error) {
      toast.error("Ошибка при попытке авторизации. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Авторизация</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Поле username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Имя пользователя:
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none hover:bg-gray-50"
              placeholder="Введите имя пользователя"
            />
          </div>

          {/* Поле пароля */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Пароль:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none hover:bg-gray-50"
              placeholder="Введите пароль"
            />
          </div>

          {/* Кнопка отправки */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md ${
                isLoading ? "bg-gray-500" : "bg-blue-600"
              } text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500`}
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </div>
        </form>

        <p className="text-sm text-center mt-4">
          Нет аккаунта?{" "}
          <a href="/setup" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </a>
        </p>

        <Toaster />
      </div>
    </div>
  );
};

export default Login;
