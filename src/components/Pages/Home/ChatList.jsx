import React, { useEffect, useState } from "react";

// Мокаем получение чатов, например, через API или глобальное состояние
const ChatList = ({ setSelectedChat, activeTab }) => {
  const [chats, setChats] = useState([]);

  // Имитируем получение чатов (например, из API или хранилища)
  useEffect(() => {
    // Временно имитируем данные
    const fetchedChats = [
      { id: 1, name: "Чат 1", type: "friend" },
      { id: 2, name: "Чат 2", type: "group" },
      { id: 3, name: "Чат 3", type: "friend" },
      { id: 4, name: "Чат 4", type: "group" },
      { id: 5, name: "Чат 5", type: "friend" },
      { id: 1, name: "Чат 1", type: "friend" },
      { id: 2, name: "Чат 2", type: "group" },
      { id: 3, name: "Чат 3", type: "friend" },
      { id: 4, name: "Чат 4", type: "group" },
      { id: 5, name: "Чат 5", type: "friend" },
      { id: 1, name: "Чат 1", type: "friend" },
      { id: 2, name: "Чат 2", type: "group" },
      { id: 3, name: "Чат 3", type: "friend" },
      { id: 4, name: "Чат 4", type: "group" },
      { id: 5, name: "Чат 5", type: "friend" },
      { id: 1, name: "Чат 1", type: "friend" },
      { id: 2, name: "Чат 2", type: "group" },
      { id: 3, name: "Чат 3", type: "friend" },
      { id: 4, name: "Чат 4", type: "group" },
      { id: 5, name: "Чат 5", type: "friend" },
    ];

    // Фильтруем чаты в зависимости от активной вкладки
    const filteredChats = fetchedChats.filter((chat) => {
      if (activeTab === "all") return true;
      return chat.type === activeTab;
    });

    setChats(filteredChats);
  }, [activeTab]);

  return (
    <div className="w-1/4 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">
        {activeTab === "friends"
          ? "Друзья"
          : activeTab === "groups"
          ? "Группы"
          : "Все чаты"}
      </h2>

      {/* Список чатов с прокруткой */}
      <div className="chat-list max-h-96 min-h-96 overflow-y-auto">
        {chats.length === 0 ? (
          <p className="text-gray-500">Нет чатов. Создайте новый чат.</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-sm mb-2"
              onClick={() => setSelectedChat(chat)}
            >
              <p className="text-lg font-semibold">{chat.name}</p>
            </div>
          ))
        )}
      </div>

      {/* Кнопка "Создать чат" */}
      <div
        className="p-2 cursor-pointer hover:bg-blue-100 rounded-md mt-4 text-center"
        onClick={() => alert("Создать чат!")}
      >
        <p className="text-lg font-semibold text-blue-600">Создать чат</p>
      </div>
    </div>
  );
};

export default ChatList;
