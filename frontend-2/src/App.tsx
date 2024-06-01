import React, {useState} from 'react';
import './App.css';

// Definindo o tipo para as formas geométricas
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
const ResultDisplay: React.FC<{ results: CalculationResults; unit: MeasurementUnit }> = ({
                                                                                             results,
                                                                                             unit,
                                                                                         }) => (
    <div className="result-container">
        <h2>Resultados:</h2>
        <div className="result-item">
            <span className="result-label">Perímetro:</span>
            <span>
        {results.perimetro !== null ? `${results.perimetro!.toFixed(2)} ${unit}` : '-'}
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
        {results.volume !== null ? `${results.volume!.toFixed(2)} ${unit}³` : '-'}
      </span>
        </div>
    </div>
);

const App: React.FC = () => {
    const [shape, setShape] = useState<GeometricShape | ''>('');
    const [measurements, setMeasurements] = useState<Measurements>({});
    const [results, setResults] = useState<CalculationResults>({});
    const [selectedUnit, setSelectedUnit] = useState<MeasurementUnit>('m'); // Estado para a unidade selecionada

    const handleMeasurementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setMeasurements({...measurements, [name]: parseFloat(value)});
    };

    // Funções para calcular as propriedades geométricas
    const calcularCubo = (lado: number): CalculationResults => {
        const perimetro = 12 * lado;
        const area = 6 * lado * lado;
        const volume = lado * lado * lado;
        return {perimetro, area, volume};
    };

    const calcularEsfera = (raio: number): CalculationResults => {
        const perimetro = 2 * Math.PI * raio;
        const area = 4 * Math.PI * raio * raio;
        const volume = (4 / 3) * Math.PI * Math.pow(raio, 3);
        return {perimetro, area, volume};
    };

    const calcularCilindro = (raio: number, altura: number): CalculationResults => {
        const perimetroBase = 2 * Math.PI * raio;
        const areaBase = Math.PI * raio * raio;
        const areaLateral = perimetroBase * altura;
        const areaTotal = 2 * areaBase + areaLateral;
        const volume = areaBase * altura;
        return {perimetro: perimetroBase, area: areaTotal, volume};
    };

    const calcularCone = (raio: number, altura: number): CalculationResults => {
        const geratriz = Math.sqrt(raio * raio + altura * altura);
        const perimetroBase = 2 * Math.PI * raio;
        const areaBase = Math.PI * raio * raio;
        const areaLateral = Math.PI * raio * geratriz;
        const areaTotal = areaBase + areaLateral;
        const volume = (1 / 3) * areaBase * altura;
        return {perimetro: perimetroBase, area: areaTotal, volume};
    };

    const calcularPiramide = (base: number, altura: number): CalculationResults => {
        const apotemaBase = base / (2 * Math.sqrt(2)); // Para pirâmide de base quadrada
        const apotemaLateral = Math.sqrt(Math.pow(altura, 2) + Math.pow(apotemaBase, 2));
        const areaBase = base * base;
        const areaLateral = (perimetroQuadrado(base) * apotemaLateral) / 2;
        const areaTotal = areaBase + areaLateral;
        const volume = (areaBase * altura) / 3;
        return {perimetro: perimetroQuadrado(base), area: areaTotal, volume};
    };

    const calcularPrismaRetangular = (
        comprimento: number,
        largura: number,
        altura: number
    ): CalculationResults => {
        const perimetroBase = 2 * (comprimento + largura);
        const areaBase = comprimento * largura;
        const areaLateral = perimetroBase * altura;
        const areaTotal = 2 * areaBase + areaLateral;
        const volume = areaBase * altura;
        return {perimetro: perimetroBase, area: areaTotal, volume};
    };

    const calcularPrismaTriangular = (
        base: number,
        lado1: number,
        lado2: number,
        altura: number
    ): CalculationResults => {
        const perimetroBase = base + lado1 + lado2;
        const areaBase = heron(base, lado1, lado2);
        const areaLateral = perimetroBase * altura;
        const areaTotal = 2 * areaBase + areaLateral;
        const volume = areaBase * altura;
        return {perimetro: perimetroBase, area: areaTotal, volume};
    };

    const calcularTetraedro = (aresta: number): CalculationResults => {
        const perimetro = 3 * aresta;
        const area = Math.sqrt(3) * aresta * aresta;
        const volume = (Math.sqrt(2) / 12) * aresta * aresta * aresta;
        return {perimetro, area, volume};
    };

    const calcularOctaedro = (aresta: number): CalculationResults => {
        const perimetro = 6 * aresta;
        const area = 2 * Math.sqrt(3) * aresta * aresta;
        const volume = (Math.sqrt(2) / 3) * aresta * aresta * aresta;
        return {perimetro, area, volume};
    };

    // Funções auxiliares
    const perimetroQuadrado = (lado: number): number => {
        return 4 * lado;
    };

    const heron = (a: number, b: number, c: number): number => {
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    };

    const calculate = async () => {
        if (!shape) {
            alert('Selecione uma forma!');
            return;
        }

        let newResults: CalculationResults = {};

        switch (shape) {
            case 'CUBO':
                newResults = calcularCubo(measurements.lado || 0);
                break;
            case 'ESFERA':
                newResults = calcularEsfera(measurements.raio || 0);
                break;
            case 'CILINDRO':
                newResults = calcularCilindro(measurements.raio || 0, measurements.altura || 0);
                break;
            case 'CONE':
                newResults = calcularCone(measurements.raio || 0, measurements.altura || 0);
                break;
            case 'PIRAMIDE':
                newResults = calcularPiramide(measurements.base || 0, measurements.altura || 0);
                break;
            case 'PRISMA_RETANGULAR':
                newResults = calcularPrismaRetangular(
                    measurements.base || 0,
                    measurements.altura || 0,
                    measurements.profundidade || 0
                );
                break;
            case 'PRISMA_TRIANGULAR':
                newResults = calcularPrismaTriangular(
                    measurements.base || 0,
                    measurements.lado1 || 0,
                    measurements.lado2 || 0,
                    measurements.altura || 0
                );
                break;
            case 'TETRAEDRO':
                newResults = calcularTetraedro(measurements.aresta || 0);
                break;
            case 'OCTAEDRO':
                newResults = calcularOctaedro(measurements.aresta || 0);
                break;
            default:
                break;
        }

        setResults(newResults);
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
            <h1>Calculator Geométrica</h1>

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
            {Object.keys(results).length > 0 && <ResultDisplay results={results} unit={selectedUnit}/>}
        </div>
    );
};

export default App;