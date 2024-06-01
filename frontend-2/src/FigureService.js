import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/figures';

const calculateFigure = async (figureType, measurements) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/calculate`, {
            // Inclua o tipo da figura na requisição
            type: figureType, // Remova a conversão para minúsculas (o backend já está usando a mesma nomenclatura)
            ...measurements, // Espalha as medidas no objeto da requisição
        });

        return response.data; // Retorna os resultados do cálculo
    } catch (error) {
        console.error('Erro ao calcular figura:', error);
        throw error; // Propaga o erro para tratamento no componente
    }
};

export default {calculateFigure};