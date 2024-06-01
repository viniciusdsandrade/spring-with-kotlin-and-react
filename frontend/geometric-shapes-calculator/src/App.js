import React, {useState} from 'react';

function App() {
    const [shape, setShape] = useState('circle');
    const [param1, setParam1] = useState(0);
    const [param2, setParam2] = useState(0);
    const [perimeter, setPerimeter] = useState(null);
    const [area, setArea] = useState(null);
    const [volume, setVolume] = useState(null);
    const [error, setError] = useState(null);

    const apiUrl = 'http://localhost:8080/calculate'; // Substitua pela URL da sua API Spring

    const calculateShape = async () => {
        setError(null); // Limpa erros anteriores
        setPerimeter(null);
        setArea(null);
        setVolume(null);

        try {
            const response = await fetch(apiUrl + `/${shape}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({param1, param2}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPerimeter(data.perimeter);
            setArea(data.area);
            setVolume(data.volume);
        } catch (error) {
            setError(`Erro ao calcular: ${error.message}`);
        }
    };

    const handleShapeChange = (e) => {
        setShape(e.target.value);
        setParam1(0);
        setParam2(0);
        setPerimeter(null);
        setArea(null);
        setVolume(null);
        setError(null);
    };

    return (
        <div className="App">
            <h1>Geometric Shapes Calculator</h1>
            <div>
                <label htmlFor="shapeSelect">Shape:</label>
                <select id="shapeSelect" value={shape} onChange={handleShapeChange}>
                    <option value="circle">Circle</option>
                    <option value="cone">Cone</option>
                    <option value="hexagon">Hexagon</option>
                    <option value="sphere">Sphere</option>
                    {/* Adicione mais formas aqui */}
                </select>
            </div>
            {/* Inputs dinâmicos */}
            {shape === 'circle' && (
                <div>
                    <label htmlFor="radius">Radius:</label>
                    <input type="number" id="radius" value={param1}
                           onChange={(e) => setParam1(parseFloat(e.target.value))}/>
                </div>
            )}
            {shape === 'cone' && (
                <div>
                    <label htmlFor="radius">Radius:</label>
                    <input type="number" id="radius" value={param1}
                           onChange={(e) => setParam1(parseFloat(e.target.value))}/>
                    <label htmlFor="height">Height:</label>
                    <input type="number" id="height" value={param2}
                           onChange={(e) => setParam2(parseFloat(e.target.value))}/>
                </div>
            )}
            {/* Adicione inputs para outras formas conforme necessário */}

            <button onClick={calculateShape}>Calculate</button>

            {error && <div style={{color: 'red'}}>{error}</div>}
            {perimeter !== null && <p>Perimeter: {perimeter}</p>}
            {area !== null && <p>Area: {area}</p>}
            {volume !== null && <p>Volume: {volume}</p>}

            <div>
                <p>Developed by: [Your Names]</p>
                <p>Date: 06/06</p>
            </div>
        </div>
    );
}

export default App;