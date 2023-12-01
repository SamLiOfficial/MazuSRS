import React from 'react';
import InventoryStatsTable from './InventoryStatsTable'; // Make sure the path is correct

const InventoryRecord = () => {
    return (
        <div>
            {/* Display a heading for the Inventory Record Page with styling */}
            <h1 style={{ textAlign: 'center', color: '#00008D' }}>货品汇总表</h1>

            {/* Include the 'InventoryStatsTable' component */}
            <InventoryStatsTable />
        </div>
    );
};

export default InventoryRecord;
