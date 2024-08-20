import React from 'react'
import BarChart from '../Components/Charts/BarChart'
import LineChart from '../Components/Charts/LineChart'
import PieChart from '../Components/Charts/PieChart'
import Tables from '../Components/Charts/Tables'
import Cards from '../Components/Charts/Cards'

const Analytics = () => {
  return (
    <>

<div className="min-h-screen p-6">
  <div className="mb-6">
    <h1 className="text-2xl font-semibold text-gray-700">Analytics Dashboard</h1>
  </div>
  {/* Cards Section */}
    <Cards />
  {/* Charts and Table Section */}
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-600">Bar Chart</h2>
      <BarChart />
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-600">Line Chart</h2>
      <LineChart />
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-600">Pie Chart</h2>
      <PieChart />
    </div>
    <div className="col-span-3 p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-600">Data Table</h2>
      <Tables />
    </div>
  </div>
</div>

    </>
  )
}

export default Analytics
