import {  useMemo, useState } from 'react'

import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './Chart';

function App() {
  const [count, setCount] = useState(0)
  const statistics = useStatistics(10);
  console.log(statistics);
  const cpuUsages = useMemo(() => statistics.map((stat) => stat.cpuUsage), [statistics]);
  
  return (
    <>
      <div style={{height:120}}>
      <Chart data={cpuUsages} maxDataPoints={10}/>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
