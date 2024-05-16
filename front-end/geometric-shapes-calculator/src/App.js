import React, { useState } from 'react';

function App() {
  const [shape, setShape] = useState('circle');
  const [param1, setParam1] = useState(0);
  const [param2, setParam2] = useState(0);
  const [perimeter, setPerimeter] = useState(0);
  const [area, setArea] = useState(0);
  const [volume, setVolume] = useState(0);

 
  const calculate = async () => {
    const result = await calculateShape(shape, {
      param1: param1,
      param2: param2,
      // Add more parameters as needed
    });
  
    setPerimeter(result.perimeter);
    setArea(result.area);
    setVolume(result.volume);
  };
 

  return (
    <div className="App">
      <h1>Geometric Shapes Calculator</h1>
      <div>
        <select value={shape} onChange={(e) => setShape(e.target.value)}>
          <option value="circle">Circle</option>
          <option value="cone">Cone</option>
          <option value="hexagon">Hexagon</option>
          {/* Add more shapes as needed */}
        </select>
        <input
          type="number"
          value={param1}
          onChange={(e) => setParam1(parseFloat(e.target.value))}
        />
        <input
          type="number"
          value={param2}
          onChange={(e) => setParam2(parseFloat(e.target.value))}
        />
        {/* Add more input fields as needed */}
        <button onClick={calculate}>Calculate</button>
      </div>
      <div>
        <p>Perimeter: {perimeter}</p>
        <p>Area: {area}</p>
        <p>Volume: {volume}</p>
      </div>
      <div>
        <p>Developed by: [Your Names]</p>
        <p>Date: 06/06</p>
      </div>
    </div>
  );
}

export default App;