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
    <div className="result-container">
        <h2>Resultados:</h2>
        <div className="result-item">
            <span className="result-label">Perímetro:</span>
            <span className="result-value">{formatUnit(results.perimetro, unit)}</span>
        </div>
        <div className="result-item">
            <span className="result-label">Área:</span>
            <span className="result-value">{formatUnit(results.area, unit, 2)}</span>
        </div>
        <div className="result-item">
            <span className="result-label">Volume:</span>
            <span className="result-value">{formatUnit(results.volume, unit, 3)}</span>
        </div>
    </div>
);


// Função auxiliar para formatar as unidades
const formatUnit = (value: number | null | undefined, unit: MeasurementUnit, exponent?: number) => {
    if (value === undefined || value === null) return '-';
    const formattedValue = value.toFixed(2);
    const formattedExponent = exponent !== undefined ? <sup>{exponent}</sup> : null;
    return (
        <span>
            {formattedValue} {unit}
            {formattedExponent}
        </span>
    );
};


// Função auxiliar para criar um input de medida
const MeasurementInput = ({label, name, value, onChange}: {
    label: string;
    name: string;
    value: number | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input
            type="number"
            id={name}
            name={name}
            value={value === undefined ? '' : value.toString()} // Converte para string se undefined
            onChange={onChange}
        />
    </div>
);

// Função auxiliar para construir o requestBody
// Função auxiliar para construir o requestBody
const buildRequestBody = (figureType: GeometricShape, measurements: Measurements) => {
    switch (figureType) {
        case 'CUBO':
            return {type: 'cube', measurements: {side: measurements.lado}};
        case 'ESFERA':
            return {type: 'sphere', measurements: {radius: measurements.raio}};
        case 'CILINDRO':
            return {type: 'cylinder', measurements: {radius: measurements.raio, height: measurements.altura}};
        case 'CONE':
            return {type: 'cone', measurements: {radius: measurements.raio, height: measurements.altura}};
        case 'PIRAMIDE':
            return {type: 'pyramid', measurements: {base: measurements.base, height: measurements.altura}};
        case 'PRISMA_RETANGULAR':
            return {
                type: 'rectangular_prism',
                measurements: {base: measurements.comprimento, height: measurements.altura, width: measurements.largura}
            };
        case 'PRISMA_TRIANGULAR':
            return {
                type: 'triangular_prism',
                measurements: {base: measurements.base, height: measurements.altura, width: measurements.lado1}
            };
        case 'TETRAEDRO':
            return {type: 'tetrahedron', measurements: {edge: measurements.aresta}};
        case 'OCTAEDRO':
            return {type: 'octahedron', measurements: {edge: measurements.aresta}};
    }
};

const App: React.FC = () => {
    const [figureType, setFigureType] = useState<GeometricShape | ''>('');
    const [measurements, setMeasurements] = useState<Measurements>({});
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
        if (!figureType) {
            alert('Selecione uma forma!');
            return;
        }

        try {
            const requestBody = buildRequestBody(figureType, measurements);

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
            setResults({
                area: data.area,
                volume: data.volume,
                perimetro: data.perimetro
            });
        } catch (error) {
            console.error('Erro ao calcular figura:', error);
            // Lidar com o erro
        }
    };

    const renderMeasurementInputs = () => {
        switch (figureType) {
            case 'CUBO':
                return <MeasurementInput label="Lado:" name="lado" value={measurements.lado}
                                         onChange={handleMeasurementChange}/>;
            case 'ESFERA':
                return <MeasurementInput label="Raio:" name="raio" value={measurements.raio}
                                         onChange={handleMeasurementChange}/>;
            case 'CILINDRO':
                return (
                    <div>
                        <MeasurementInput label="Raio:" name="raio" value={measurements.raio}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Altura:" name="altura" value={measurements.altura}
                                          onChange={handleMeasurementChange}/>
                    </div>
                );
            case 'CONE':
                return (
                    <div>
                        <MeasurementInput label="Raio:" name="raio" value={measurements.raio}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Altura:" name="altura" value={measurements.altura}
                                          onChange={handleMeasurementChange}/>
                    </div>
                );
            case 'PIRAMIDE':
                return (
                    <div>
                        <MeasurementInput label="Base:" name="base" value={measurements.base}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Altura:" name="altura" value={measurements.altura}
                                          onChange={handleMeasurementChange}/>
                    </div>
                );
            case 'PRISMA_RETANGULAR':
                return (
                    <div>
                        <MeasurementInput label="Comprimento:" name="comprimento" value={measurements.comprimento}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Largura:" name="largura" value={measurements.largura}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Altura:" name="altura" value={measurements.altura}
                                          onChange={handleMeasurementChange}/>
                    </div>
                );
            case 'PRISMA_TRIANGULAR':
                return (
                    <div>
                        <MeasurementInput label="Base do Triângulo:" name="base" value={measurements.base}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Lado 1:" name="lado1" value={measurements.lado1}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Lado 2:" name="lado2" value={measurements.lado2}
                                          onChange={handleMeasurementChange}/>
                        <MeasurementInput label="Altura do Prisma:" name="altura" value={measurements.altura}
                                          onChange={handleMeasurementChange}/>
                    </div>
                );
            case 'TETRAEDRO':
                return <MeasurementInput label="Aresta:" name="aresta" value={measurements.aresta}
                                         onChange={handleMeasurementChange}/>;
            case 'OCTAEDRO':
                return <MeasurementInput label="Aresta:" name="aresta" value={measurements.aresta}
                                         onChange={handleMeasurementChange}/>;
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">Calculadora de Figuras Geométricas</h1>
                <div className="authors">
                    <h2 className="author">Vinícius dos Santos Andrade RA: 22333</h2>
                    <h2 className="author">Arthur Assis Gonçalves RA: 22300</h2>
                </div>
            </header>

            <div className="shape-selector">
                <label htmlFor="shape">Forma Geométrica:</label>
                <select
                    id="shape"
                    value={figureType}
                    onChange={(e) => setFigureType(e.target.value as GeometricShape)}
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

            {figureType && (
                <div className="measurement-inputs">{renderMeasurementInputs()}</div>
            )}

            <button onClick={calculate} disabled={!figureType}>
                Calcular
            </button>

            {Object.keys(results).length > 0 ? (
                <ResultDisplay results={results} unit={selectedUnit}/>
            ) : (
                <p>Calculando resultados...</p>
            )}
        </div>
    );
};

export default App;