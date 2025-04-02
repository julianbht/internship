const apiClientCode = `import axios from 'axios';

export async function fetchTransactions() {
  try {
    const response = await axios.get('https://api.digidip.com/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions', error);
    throw error;
  }
}
`;

export default apiClientCode;
