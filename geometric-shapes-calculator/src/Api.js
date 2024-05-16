const API_URL = 'http://localhost:8080/api/shapes';

export async function calculateShape(shape, params) {
  const response = await fetch(`${API_URL}/${shape}`, {
    method: 'GET',
    params: new URLSearchParams(params),
  });

  const data = await response.json();

  return data;
}