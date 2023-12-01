import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import NewItemPage from './components/NewItemPage';
import NewStockInPage from './components/NewStockInPage';
import NewStockOutPage from './components/NewStockOutPage';
import StatisticsPage from './components/statistics/StatisticsPage'; // Moved to statistics folder
import InventoryRecord from './components/statistics/InventoryRecord'; // Moved to statistics folder
import StockInStatistics from './components/statistics/StockInStatistics'; // Moved to statistics folder
import StockOutStatistics from './components/statistics/StockOutStatistics'; // Moved to statistics folder
import ViewRecordPage from './components/viewRecord/ViewRecordPage'; // Adjust the path as needed
import StockInRecordPage from './components/viewRecord/StockInRecordPage'; // Import the new component
import StockOutRecordPage from './components/viewRecord/StockOutRecordPage';
import ViewStockInOneItemPage from './components/viewRecord/ViewStockInOneItemPage'; // Import the new component
import ViewStockOutOneItemPage from './components/viewRecord/ViewStockOutOneItemPage'; // Import the new component
import StockOutStatisticsOneItemPage from './components/statistics/StockOutStatisticsOneItemPage'; // Import the new component
import StockInStatisticsOneItemPage from './components/statistics/StockInStatisticsOneItemPage'; // Import the new component

import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainMenu />} /> {/* Main menu page */}
                <Route path="/new-item" element={<NewItemPage />} /> {/* Page to create a new item */}
                <Route path="/new-stock-in" element={<NewStockInPage />} /> {/* Page to record new stock-in */}
                <Route path="/new-stock-out" element={<NewStockOutPage />} /> {/* Page to record new stock-out */}
                {/* Statistics and its sub-pages */}
                <Route path="/statistics" element={<StatisticsPage />} /> {/* Statistics main page */}
                <Route path="/statistics/inventory-record" element={<InventoryRecord />} /> {/* Inventory record statistics */}
                <Route path="/statistics/stock-in-statistics" element={<StockInStatistics />} /> {/* Stock-in statistics */}
                <Route path="/statistics/stock-out-statistics" element={<StockOutStatistics />} /> {/* Stock-out statistics */}
                <Route path="/statistics/stock-in-statistics-one-item" element={<StockInStatisticsOneItemPage />} /> {/* Stock-in statistics for one item */}
                <Route path="/statistics/stock-out-statistics-one-item" element={<StockOutStatisticsOneItemPage />} /> {/* Stock-out statistics for one item */}

                {/* View Record and its sub-pages */}
                <Route path="/view-record" element={<ViewRecordPage />} /> {/* View record main page */}
                <Route path="/view-record/stock-in" element={<StockInRecordPage />} /> {/* View stock-in records */}
                <Route path="/view-record/stock-in-one-item" element={<ViewStockInOneItemPage />} /> {/* View stock-in records for one item */}
                <Route path="/view-record/stock-out" element={<StockOutRecordPage />} /> {/* View stock-out records */}
                <Route path="/view-record/stock-out-one-item" element={<ViewStockOutOneItemPage />} /> {/* View stock-out records for one item */}
            </Routes>
        </Router>
    );
}

export default App;
