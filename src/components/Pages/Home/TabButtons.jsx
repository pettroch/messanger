import React from "react";

const TabButtons = ({ activeTab, handleTabChange }) => {
  return (
    <div className="bg-white shadow-xl p-4 flex flex-col items-center rounded-l-3xl">
      {/* Кнопки для вкладок "Все", "Друзья", "Группы" */}
      <button
        className={`w-11 h-11 mb-4 rounded-md ${
          activeTab === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => handleTabChange("all")}
      >
        В
      </button>
      <button
        className={`w-11 h-11 mb-4 rounded-md ${
          activeTab === "friends"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => handleTabChange("friends")}
      >
        Д
      </button>
      <button
        className={`w-11 h-11 rounded-md ${
          activeTab === "groups"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => handleTabChange("groups")}
      >
        Г
      </button>
    </div>
  );
};

export default TabButtons;
