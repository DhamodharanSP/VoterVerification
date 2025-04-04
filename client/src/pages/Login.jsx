"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { VoteIcon as HowToVote } from "lucide-react"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate authentication
      if (username === "admin" && password === "admin123") {
        login({ id: "1", username: "admin", role: "superadmin" })
        navigate("/super-admin")
      } else if (username === "booth" && password === "booth123") {
        login({ id: "2", username: "booth", role: "boothhead" })
        navigate("/booth-head")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("Failed to login. Please try again.")
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <HowToVote className="w-16 h-16 mx-auto text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Secure Voter Verification</h1>
          <p className="mt-2 text-gray-600">Sign in to access the system</p>
        </div>

        {error && <div className="p-3 text-sm text-white bg-red-500 rounded">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-200 text-gray-600" 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 bg-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-200 text-gray-600"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-sm text-center text-gray-600">
            <p>Demo Credentials:</p>
            <p>Super Admin: admin / admin123</p>
            <p>Booth Head: booth / booth123</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

