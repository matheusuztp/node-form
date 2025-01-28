const axios = require('axios');

const validateCEP = async (cep) => {
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    return { isValid: true, data: response.data };
  } catch (error) {
    return { isValid: false };
  }
};

module.exports = { validateCEP };
