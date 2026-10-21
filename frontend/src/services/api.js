import axios from 'axios';
export default axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', timeout: 15000 });

export function errorMessage(error) {
  const data = error.response?.data;
  if (Array.isArray(data?.errors)) return data.errors.join(' ');
  if (data?.message) return data.message;
  if (error.code === 'ECONNABORTED') return 'The request took too long. Refresh the student list before retrying to check whether it was saved.';
  return 'Unable to reach the server. Check that the backend and MongoDB are running, then try again.';
}
