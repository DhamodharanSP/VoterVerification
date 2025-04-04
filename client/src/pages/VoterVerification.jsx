"use client"

import { useState, useRef } from "react"
import { CheckCircle, XCircle, AlertTriangle, Scan } from "lucide-react"

const VoterVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [voterId, setVoterId] = useState("")
  const [loading, setLoading] = useState(false)
  const [scanActive, setScanActive] = useState(false)
  const inputRef = useRef(null)

  const handleVerify = async (e) => {
    e.preventDefault()

    if (!voterId.trim()) return

    setLoading(true)
    setVerificationStatus(null)

    try {
      // In a real app, this would be an API call to your backend
      // Simulate API call with random response for demo
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate different verification scenarios
      const scenarios = ["verified", "not_verified", "duplicate_attempt"]
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]

      setVerificationStatus(randomScenario)
    } catch (err) {
      console.error(err)
      setVerificationStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const handleScanNFC = () => {
    setScanActive(true)

    // Simulate NFC scan
    setTimeout(() => {
      // Generate a random voter ID for demo
      const randomId = "ID" + Math.floor(10000 + Math.random() * 90000)
      setVoterId(randomId)
      setScanActive(false)
    }, 2000)
  }

  const handleReset = () => {
    setVerificationStatus(null)
    setVoterId("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Voter Verification</h1>

        {!verificationStatus ? (
          <>
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="voterId" className="block text-sm font-medium text-gray-700">
                  Voter ID
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="voterId"
                    ref={inputRef}
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Voter ID"
                    disabled={loading || scanActive}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleScanNFC}
                  disabled={loading || scanActive}
                  className="flex items-center justify-center flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {scanActive ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-2 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2 -ml-1" />
                      Scan NFC
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  disabled={!voterId.trim() || loading || scanActive}
                  className="flex items-center justify-center flex-1 px-4 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-2 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-gray-500">
              <p>Scan the NFC tag on the voter ID card or enter the Voter ID manually</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            {verificationStatus === "verified" && (
              <>
                <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-600">Voter Verified</h2>
                  <p className="mt-2 text-lg">Allow to vote!</p>
                  <p className="mt-1 text-gray-600">Voter ID: {voterId}</p>
                </div>
              </>
            )}

            {verificationStatus === "not_verified" && (
              <>
                <div className="flex items-center justify-center w-24 h-24 bg-red-100 rounded-full">
                  <XCircle className="w-16 h-16 text-red-600" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-600">Voter Not Verified</h2>
                  <p className="mt-2 text-lg">No data in database</p>
                  <p className="mt-1 text-gray-600">Voter ID: {voterId}</p>
                </div>
              </>
            )}

            {verificationStatus === "duplicate_attempt" && (
              <>
                <div className="flex items-center justify-center w-24 h-24 bg-yellow-100 rounded-full">
                  <AlertTriangle className="w-16 h-16 text-yellow-600" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-yellow-600">Alert!</h2>
                  <p className="mt-2 text-lg">Multiple attempt to vote!</p>
                  <p className="mt-1 text-gray-600">Voter ID: {voterId}</p>
                </div>
              </>
            )}

            {verificationStatus === "error" && (
              <>
                <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full">
                  <XCircle className="w-16 h-16 text-gray-600" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-600">Verification Error</h2>
                  <p className="mt-2 text-lg">Please try again</p>
                </div>
              </>
            )}

            <button
              onClick={handleReset}
              className="px-6 py-2 mt-6 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify Another Voter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VoterVerification

