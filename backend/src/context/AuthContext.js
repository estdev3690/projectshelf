const register = async (userData) => {
    try {
      setLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("username", userData.username);
      formData.append("password", userData.password);
      
      // Add files if they exist
      if (userData.avatar) {
        formData.append("avatar", userData.avatar);
      }
      if (userData.coverImage) {
        formData.append("coverImage", userData.coverImage);
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1/users/register', 
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setUser(response.data.data);
      localStorage.setItem('token', response.data.data.accessToken);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
};