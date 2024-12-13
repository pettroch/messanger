import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone"; // Импортируем useDropzone
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import "react-toastify/dist/ReactToastify.css";

const AvatarUpload = ({ onChange }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarPreview(URL.createObjectURL(file));
      onChange(file); // Отправляем файл родительскому компоненту
    } else {
      toast.error("Неподдерживаемый формат файла!");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    "image/png": [".png"], // Разрешаем только изображения
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-100 transition-all"
    >
      <input {...getInputProps()} />
      {avatarPreview ? (
        <img
          src={avatarPreview}
          alt="Avatar Preview"
          className="mt-2 h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="text-center text-gray-600">
          <p>Перетащите файл сюда или кликните для загрузки</p>
        </div>
      )}
    </div>
  );
};

const UserSetup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Для повторного ввода пароля

  const navigate = useNavigate(); // Хук для навигации

  // Функция для обработки изменения username
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._-]*$/;
    if (regex.test(value) || value === "") {
      setUsername(value);
    } else {
      toast.error("Username может содержать только a-z, A-Z, 0-9, - . _");
    }
  };

  // Функция для проверки пароля
  const validatePassword = (password) => {
    const regex = /^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Кнопка сохранения
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      toast.error("Пароль должен содержать минимум 8 символов и хотя бы одну цифру");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Введенные пароли не совпадают!");
      return;
    }

    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Avatar:", avatar);

    if (!name) {
      toast.error("Поле Имя не может быть пустым!");
      return;
    }

    if (!username) {
      toast.error("Поле Username не может быть пустым!");
      return;
    }

    // Очистка формы после отправки данных
    setName("");
    setUsername("");
    setAvatar(null);
    setPassword("");
    setConfirmPassword("");

    toast.success("Данные успешно сохранены!");

    // Перенаправляем на другую страницу после успешной отправки
    navigate("/home"); // Здесь указать путь, куда нужно перенаправить
  };

  return (
    <div>
      <div className="p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Добро пожаловать в PetroChat!
        </h1>

        <p className="text-lg">
          Ваше новое место для общения с друзьями, обмена сообщениями и
          совместных мгновений!
        </p>
        <p className="text-lg">Настройте свой профиль, чтобы начать общение.</p>
      </div>

      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Настройка профиля
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ввод имени */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Имя:
              <span className="text-xs text-gray-400 ml-1">(обязательно)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none hover:bg-gray-50"
            />
          </div>

          {/* Ввод @username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username:
              <span className="text-xs text-gray-400 ml-1">(обязательно и используется для авторизации)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                @
              </span>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none hover:bg-gray-50"
                placeholder="username"
              />
            </div>
          </div>

          {/* Ввод пароля */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Пароль:
              <span className="text-xs text-gray-400 ml-1">(обязательно)</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none hover:bg-gray-50"
              placeholder="Введите пароль"
            />
          </div>

          {/* Повторный ввод пароля */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Повторите пароль:
              <span className="text-xs text-gray-400 ml-1">(обязательно)</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none hover:bg-gray-50"
              placeholder="Подтвердите пароль"
            />
          </div>

          {/* Загрузка аватарки с drag and drop */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Аватар:
            </label>
            <AvatarUpload onChange={(file) => setAvatar(file)} />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Начать общение
          </button>
        </form>

        {/* Уведомления */}
        <Toaster />
      </div>
    </div>
  );
};

export default UserSetup;
