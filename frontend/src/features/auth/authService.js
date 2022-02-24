import axios from 'axios'

const API_URL = '/api/users' //API to register, made it the backend. Make sure to use PROXY at package.json and enter the SERVER url (i.e. http://localhost:5000)

const register = async (userData) => {
	const response = await axios.post(API_URL, userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data)) //JSON.stringify because localstorage can only hold strings
	}
	return response.data
}

const login = async (userData) => {
	const response = await axios.post(`${API_URL}/login`, userData)
	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}

// Logout User
const logout = () => localStorage.removeItem('user')

const authService = {
	register,
	login,
	logout,
}

export default authService
