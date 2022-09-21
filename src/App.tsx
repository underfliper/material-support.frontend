import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<>Главная</>} />
          <Route path="/applications" element={<>Управление заявлениями</>} />
          <Route path="/admin-panel" element={<>Панель администрации</>} />
          <Route path="/information" element={<>Информация</>} />
          <Route path="/profile" element={<>Личный кабинет</>} />
          <Route path="/apply" element={<>Подать заявление</>} />
          <Route path="*" element={<h2>Страница не найдена</h2>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
