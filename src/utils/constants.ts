export const baseURI = (process.env.API_ENV === 'prod')
  ? 'https://some url'
  : `https://${process.env.API_ENV}.some url`;
