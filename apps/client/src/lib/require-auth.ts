
export async function requireAuth() {
  const token = localStorage.getItem("authToken");
  const authToken = token ? token : '';
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  return config;
  
}
  