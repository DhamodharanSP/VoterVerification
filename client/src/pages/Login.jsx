"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { VoteIcon as HowToVote } from "lucide-react"
import bgImage from "../assets/images/bgImage.png" // ✅ Import background image

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
      if (username === "admin" && password === "admin123") {
        login({ id: "1", username: "admin", role: "superadmin" })
        navigate("/super-admin")
      }
        else if (username === "booth" && password === "booth123") {
      login({ id: "2", username: "booth", role: "boothhead" })
      navigate("/booth-head")
    }
      else {
        const response = await fetch("http://localhost:5000/api/booth-head-routes/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message || "Invalid credentials")

        login(data)
        navigate("/booth-head")
      }
    } catch (err) {
      console.error(err)
      setError(err.message || "Failed to login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex items-center justify-center w-full min-h-screen bg-no-repeat bg-center bg-[length:100%_100%]"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >


      <div className="w-full max-w-md p-8 rounded-xl shadow-lg backdrop-blur-sm bg-white/30 border border-white/40">
        <div className="text-center mb-6">
          <HowToVote className="w-14 h-14 mx-auto text-blue-800" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Voter Verification Portal</h2>
          <p className="mt-1 text-sm text-gray-700">Authorized personnel only</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 px-4 py-2 rounded border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-800" >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white/80 text-gray-800"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white/80 text-gray-800"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-medium rounded-md shadow-sm transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-800">
          <p className="mb-1">Demo Credentials</p>
          <p>🛡️ Super Admin: <strong>admin / admin123</strong></p>
          <p>🏷️ Booth Head: <strong>booth / booth123</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Login
