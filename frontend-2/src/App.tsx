import React, {useState} from 'react';
import './App.css';

export type GeometricShape =
    | 'CUBO'
    | 'ESFERA'
    | 'CILINDRO'
    | 'CONE'
    | 'PIRAMIDE'
    | 'PRISMA_RETANGULAR'
    | 'PRISMA_TRIANGULAR'
    | 'TETRAEDRO'
    | 'OCTAEDRO';

// Tipo para unidades de medida
export type MeasurementUnit =
    | 'km'
    | 'hm'
    | 'dam'
    | 'm'
    | 'dm'
    | 'cm'
    | 'mm';

// Interface para tipar as medidas das figuras
interface Measurements {
    [key: string]: number;
}

// Interface para os resultados do cálculo
interface CalculationResults {
    perimetro?: number | null;
    area?: number | null;
    volume?: number | null;
}

// Componente para exibir os resultados
const ResultDisplay: React.FC<{
    results: CalculationResults;
    unit: MeasurementUnit;
}> = ({results, unit}) => (
    <div>
        <h2>Resultados:</h2>
        <div className="result-item">
            <span className="result-label">Perímetro:</span>
            <span>
        {results.perimetro !== null
            ? `${results.perimetro!.toFixed(2)} ${unit}`
            : '-'}
      </span>
        </div>
        <div className="result-item">
            <span className="result-label">Área:</span>
            <span>
        {results.area !== null ? `${results.area!.toFixed(2)} ${unit}²` : '-'}
      </span>
        </div>
        <div className="result-item">
            <span className="result-label">Volume:</span>
            <span>
        {results.volume !== null
            ? `${results.volume!.toFixed(2)} ${unit}³`
            : '-'}
      </span>
        </div>
    </div>
);

const App: React.FC = () => {
    const [shape, setShape] = useState<GeometricShape | ''>('');
    const [measurements, setMeasurements] = useState<Measurements>({});
    // Ajuste do estado results para receber a resposta da API
    const [results, setResults] = useState<CalculationResults>({
        perimetro: null,
        area: null,
        volume: null,
    });
    const [selectedUnit, setSelectedUnit] = useState<MeasurementUnit>('m'); // Estado para a unidade selecionada

    const handleMeasurementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setMeasurements({...measurements, [name]: parseFloat(value)});
    };

    const calculate = async () => {
        if (!shape) {
            alert('Selecione uma forma!');
            return;
        }

        try {
            const requestBody = {
                type: '',
                measurements: {},
            };

            switch (shape) {
                case 'CUBO':
                    requestBody.type = 'cube';
                    requestBody.measurements = {side: measurements.lado};
                    break;
                case 'ESFERA':
                    requestBody.type = 'sphere';
                    requestBody.measurements = {radius: measurements.raio};
                    break;
                case 'CILINDRO':
                    requestBody.type = 'cylinder';
                    requestBody.measurements = {
                        radius: measurements.raio,
                        height: measurements.altura,
                    };
                    break;
                case 'CONE':
                    requestBody.type = 'cone';
                    requestBody.measurements = {
                        radius: measurements.raio,
                        height: measurements.altura,
                    };
                    break;
                case 'PIRAMIDE':
                    requestBody.type = 'pyramid';
                    requestBody.measurements = {base: measurements.base};
                    break;
                case 'PRISMA_RETANGULAR':
                    requestBody.type = 'rectangular_prism';
                    requestBody.measurements = {
                        base: measurements.comprimento,
                        height: measurements.altura,
                        width: measurements.largura,
                    };
                    break;
                case 'PRISMA_TRIANGULAR':
                    requestBody.type = 'triangular_prism';
                    requestBody.measurements = {
                        base: measurements.base,
                        height: measurements.altura,
                        width: measurements.lado1,
                    };
                    break;
                case 'TETRAEDRO':
                    requestBody.type = 'tetrahedron';
                    requestBody.measurements = {edge: measurements.aresta};
                    break;
                case 'OCTAEDRO':
                    requestBody.type = 'octahedron';
                    requestBody.measurements = {edge: measurements.aresta};
                    break;
                default:
                    return;
            }

            const response = await fetch('http://localhost:8080/api/v1/figures/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Erro ao calcular figura');
            }

            const data = await response.json();
            // ATUALIZA O ESTADO results COM A RESPOSTA DA API
            setResults({
                area: data.area,
                volume: data.volume,
                perimetro: data.perimeter,
            });
        } catch (error) {
            console.error('Erro ao calcular figura:', error);
            // Lidar com o erro
        }
    };

    const renderMeasurementInputs = () => {
        switch (shape) {
            case 'CUBO':
                return (
                    <div>
                        <label htmlFor="lado">Lado:</label>
                        <input
                            type="number"
                            id="lado"
                            name="lado"
                            value={measurements.lado || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            case 'ESFERA':
                return (
                    <div>
                        <label htmlFor="raio">Raio:</label>
                        <input
                            type="number"
                            id="raio"
                            name="raio"
                            value={measurements.raio || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            case 'CILINDRO':
                return (
                    <div>
                        <label htmlFor="raio">Raio:</label>
                        <input
                            type="number"
                            id="raio"
                            name="raio"
                            value={measurements.raio || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="altura">Altura:</label>
                        <input
                            type="number"
                            id="altura"
                            name="altura"
                            value={measurements.altura || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            case 'CONE':
                return (
                    <div>
                        <label htmlFor="raio">Raio:</label>
                        <input
                            type="number"
                            id="raio"
                            name="raio"
                            value={measurements.raio || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="altura">Altura:</label>
                        <input
                            type="number"
                            id="altura"
                            name="altura"
                            value={measurements.altura || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            case 'PIRAMIDE':
                return (
                    <div>
                        <label htmlFor="base">Base:</label>
                        <input
                            type="number"
                            id="base"
                            name="base"
                            value={measurements.base || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="altura">Altura:</label>
                        <input
                            type="number"
                            id="altura"
                            name="altura"
                            value={measurements.altura || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );

            case 'PRISMA_RETANGULAR':
                return (
                    <div>
                        <label htmlFor="comprimento">Comprimento:</label>
                        <input
                            type="number"
                            id="comprimento"
                            name="comprimento"
                            value={measurements.comprimento || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="largura">Largura:</label>
                        <input
                            type="number"
                            id="largura"
                            name="largura"
                            value={measurements.largura || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="altura">Altura:</label>
                        <input
                            type="number"
                            id="altura"
                            name="altura"
                            value={measurements.altura || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            case 'PRISMA_TRIANGULAR':
                return (
                    <div>
                        <label htmlFor="base">Base do Triângulo:</label>
                        <input
                            type="number"
                            id="base"
                            name="base"
                            value={measurements.base || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="lado1">Lado 1:</label>
                        <input
                            type="number"
                            id="lado1"
                            name="lado1"
                            value={measurements.lado1 || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="lado2">Lado 2:</label>
                        <input
                            type="number"
                            id="lado2"
                            name="lado2"
                            value={measurements.lado2 || ''}
                            onChange={handleMeasurementChange}
                        />
                        <label htmlFor="altura">Altura do Prisma:</label>
                        <input
                            type="number"
                            id="altura"
                            name="altura"
                            value={measurements.altura || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            case 'TETRAEDRO':
                return (
                    <div>
                        <label htmlFor="aresta">Aresta:</label>
                        <input
                            type="number"
                            id="aresta"
                            name="aresta"
                            value={measurements.aresta || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            case 'OCTAEDRO':
                return (
                    <div>
                        <label htmlFor="aresta">Aresta:</label>
                        <input
                            type="number"
                            id="aresta"
                            name="aresta"
                            value={measurements.aresta || ''}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">Calculadora de Figuras Geométricas</h1>
                <div className="authors">
                    <h2 className="author">Vinícius dos Santos Andrade RA: 22333</h2>
                    <h2 className="author">Arthur Gonçalves RA: 22300</h2>
                </div>
            </header>

            <div className="shape-selector">
                <label htmlFor="shape">Forma Geométrica:</label>
                <select
                    id="shape"
                    value={shape}
                    onChange={(e) => setShape(e.target.value as GeometricShape)}
                >
                    <option value="">Selecione uma forma</option>
                    <option value="CUBO">Cubo</option>
                    <option value="ESFERA">Esfera</option>
                    <option value="CILINDRO">Cilindro</option>
                    <option value="CONE">Cone</option>
                    <option value="PIRAMIDE">Pirâmide</option>
                    <option value="PRISMA_RETANGULAR">Prisma Retangular</option>
                    <option value="PRISMA_TRIANGULAR">Prisma Triangular</option>
                    <option value="TETRAEDRO">Tetraedro</option>
                    <option value="OCTAEDRO">Octaedro</option>
                </select>
            </div>

            {/* Seleção da unidade de medida */}
            <div className="unit-selector">
                <label htmlFor="unit">Unidade de Medida:</label>
                <select
                    id="unit"
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value as MeasurementUnit)}
                >
                    <option value="km">Quilômetro (km)</option>
                    <option value="hm">Hectômetro (hm)</option>
                    <option value="dam">Decâmetro (dam)</option>
                    <option value="m">Metro (m)</option>
                    <option value="dm">Decímetro (dm)</option>
                    <option value="cm">Centímetro (cm)</option>
                    <option value="mm">Milímetro (mm)</option>
                </select>
            </div>

            {shape && (
                <div className="measurement-inputs">{renderMeasurementInputs()}</div>
            )}

            <button onClick={calculate} disabled={!shape}>
                Calcular
            </button>

            {/* Passando a unidade selecionada para o ResultDisplay */}
            {Object.keys(results).length > 0 ? (
                <ResultDisplay results={results} unit={selectedUnit}/>
            ) : (
                <p>Calculando resultados...</p> // Mensagem enquanto carrega
            )}
        </div>
    );
};

export default App;