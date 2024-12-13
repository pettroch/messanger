import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext"; // Проверка авторизации

import HomeUnAuthPage from "./HomeUnAuth"; // Страница для незарегистрированных пользователей
import ChatList from "./ChatList"; // Импортируем компонент ChatList
import TabButtons from "./TabButtons"; // Импортируем компонент для кнопок вкладок
import ChatWindow from "./ChatWindow"; // Импортируем новый компонент для окна чата

const HomePage = () => {
  // const { isAuthenticated } = useAuth(); // Проверка авторизации
  const [selectedChat, setSelectedChat] = useState(null); // Состояние для выбранного чата
  const [activeTab, setActiveTab] = useState("all"); // Состояние для активной вкладки: "all", "friends" или "groups"

  if (false) {
    return <HomeUnAuthPage />;
  }

  // Обработчик изменения активной вкладки
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex bg-gray-100 mt-24">
      {/* Первая колонка - Кнопки фильтрации */}
      <TabButtons activeTab={activeTab} handleTabChange={handleTabChange} />

      {/* Вторая колонка - Список чатов */}
      <ChatList activeTab={activeTab} setSelectedChat={setSelectedChat} />

      {/* Третья колонка - Содержимое выбранного чата */}
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
};

export default HomePage;
