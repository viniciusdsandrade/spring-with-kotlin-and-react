import axios from 'axios';

interface Measurements {
    [key: string]: number | string;
}

class FigureService {
    static API_BASE_URL = 'http://localhost:8080/api/v1/figures';

    static async calculateFigure(figureType: string, measurements: Measurements) {
        try {
            const response = await axios.post(
                `${FigureService.API_BASE_URL}/calculate`,
                {
                    type: figureType,
                    ...measurements,
                }
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao calcular figura:', error);
            throw error;
        }
    }
}

export default FigureService;