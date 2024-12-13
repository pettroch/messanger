import React, { useState, useEffect } from "react";

const ChatWindow = ({ selectedChat }) => {
  const [message, setMessage] = useState(""); // Состояние для нового сообщения
  const [messages, setMessages] = useState({}); // Состояние для списка сообщений (для каждого чата)

  // Функция для получения текущего времени в формате ЧЧ:ММ
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Обработчик отправки сообщения
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const time = getCurrentTime(); // Получаем текущее время

      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        const chatId = selectedChat.id; // Предположим, что у каждого чата есть уникальный id
        if (!newMessages[chatId]) {
          newMessages[chatId] = [];
        }

        // Добавляем новое сообщение только в случае, если оно еще не было отправлено
        newMessages[chatId] = [
          ...newMessages[chatId],
          { text: message, sender: "me", time },
        ];

        return newMessages;
      });

      setMessage(""); // Очищаем поле ввода
    }
  };

  // Используем useEffect, чтобы загружать сообщения при изменении selectedChat
  useEffect(() => {
    if (selectedChat) {
      // Когда выбран новый чат, очищаем поле ввода
      setMessage("");
    }
  }, [selectedChat]);

  return (
    <div className="w-full bg-gray-50 p-6 shadow-xl rounded-r-3xl flex flex-col">
      {selectedChat ? (
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-bold mb-4">{selectedChat.name}</h3>

          {/* Контейнер сообщений с возможностью прокрутки */}
          <div className="chat-box flex-grow overflow-y-auto mb-4 max-h-96">
            {/* Список сообщений */}
            {messages[selectedChat.id] &&
            messages[selectedChat.id].length === 0 ? (
              <p className="text-gray-500">
                Нет сообщений. Напишите что-нибудь...
              </p>
            ) : (
              messages[selectedChat.id]?.map((msg, index) => (
                <div
                  key={index}
                  className={`message mb-2 ${
                    msg.sender === "me" ? "message-me" : "message-other"
                  }`}
                >
                  <div
                    className={`message-text p-3 rounded-2xl text-sm max-w-xs break-words relative ${
                      msg.sender === "me"
                        ? "bg-blue-500 text-white ml-auto mr-5 message-me"
                        : "bg-gray-200 text-black message-other"
                    }`}
                  >
                    {msg.text}

                    {/* Время отправки сообщения */}
                    <div className="absolute bottom-0 right-2 text-xs mb-1 mr-1 text-slate-300">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Поле ввода и кнопка отправки, расположенные внизу */}
          <div className="input-area flex items-center mt-auto relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-2xl bg-gray-100 text-base focus:outline-none pl-3 pr-12"
              placeholder="Написать сообщение..."
            />

            {/* Кнопка отправки, которая появляется справа внутри поля ввода */}
            <button
              onClick={handleSendMessage}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white transition-all duration-300 ease-in-out ${
                message ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M5.61 19.39l1.25-4.48 3.53 3.53c.38.38.39.94-.01 1.33-.4.39-.99.39-1.38-.01l-3.53-3.53 4.48-1.25c.55-.16.76-.83.42-1.26l-9-9c-.35-.35-.9-.33-1.26.42l-1.25 4.48-3.53-3.53c-.39-.39-.99-.39-1.38.01-.4.39-.39.99.01 1.38l3.53 3.53-4.48 1.25c-.55.16-.76.83-.42 1.26l9 9c.35.35.9.33 1.26-.42z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">Выберите чат</h3>
          <p className="text-gray-500">
            Нажмите на чат, чтобы начать переписку.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
