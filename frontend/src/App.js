// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Make sure you have this Login component created
import MainMenu from './components/MainMenu';
import NewItemPage from './components/NewItemPage';
import NewStockInPage from './components/NewStockInPage';
import NewStockOutPage from './components/NewStockOutPage';
import StatisticsPage from './components/statistics/StatisticsPage';
import InventoryRecord from './components/statistics/InventoryRecord';
import StockInStatistics from './components/statistics/StockInStatistics';
import StockOutStatistics from './components/statistics/StockOutStatistics';
import StockInStatisticsOneItemPage from './components/statistics/StockInStatisticsOneItemPage';
import StockOutStatisticsOneItemPage from './components/statistics/StockOutStatisticsOneItemPage';
import ViewRecordPage from './components/viewRecord/ViewRecordPage';
import StockInRecordPage from './components/viewRecord/StockInRecordPage';
import StockOutRecordPage from './components/viewRecord/StockOutRecordPage';
import ViewStockInOneItemPage from './components/viewRecord/ViewStockInOneItemPage';
import ViewStockOutOneItemPage from './components/viewRecord/ViewStockOutOneItemPage';
import './index.css';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><MainMenu /></ProtectedRoute>} />
                <Route path="/new-item" element={<ProtectedRoute><NewItemPage /></ProtectedRoute>} />
                <Route path="/new-stock-in" element={<ProtectedRoute><NewStockInPage /></ProtectedRoute>} />
                <Route path="/new-stock-out" element={<ProtectedRoute><NewStockOutPage /></ProtectedRoute>} />
                <Route path="/statistics" element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>} />
                <Route path="/statistics/inventory-record" element={<ProtectedRoute><InventoryRecord /></ProtectedRoute>} />
                <Route path="/statistics/stock-in-statistics" element={<ProtectedRoute><StockInStatistics /></ProtectedRoute>} />
                <Route path="/statistics/stock-out-statistics" element={<ProtectedRoute><StockOutStatistics /></ProtectedRoute>} />
                <Route path="/statistics/stock-in-statistics-one-item" element={<ProtectedRoute><StockInStatisticsOneItemPage /></ProtectedRoute>} />
                <Route path="/statistics/stock-out-statistics-one-item" element={<ProtectedRoute><StockOutStatisticsOneItemPage /></ProtectedRoute>} />
                <Route path="/view-record" element={<ProtectedRoute><ViewRecordPage /></ProtectedRoute>} />
                <Route path="/view-record/stock-in" element={<ProtectedRoute><StockInRecordPage /></ProtectedRoute>} />
                <Route path="/view-record/stock-in-one-item" element={<ProtectedRoute><ViewStockInOneItemPage /></ProtectedRoute>} />
                <Route path="/view-record/stock-out" element={<ProtectedRoute><StockOutRecordPage /></ProtectedRoute>} />
                <Route path="/view-record/stock-out-one-item" element={<ProtectedRoute><ViewStockOutOneItemPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
