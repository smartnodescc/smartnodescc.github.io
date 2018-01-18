/* eslint import/prefer-default-export: 0 */

export const stats = () => fetch(`${API_URL}/stats`).then(res => res.json())
