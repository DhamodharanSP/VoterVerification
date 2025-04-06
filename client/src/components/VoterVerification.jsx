"use client"

import { useEffect, useState } from "react"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

const DummyVoterVerification = () => {
  const [step, setStep] = useState(0)
  const [isVerified, setIsVerified] = useState(false)

  // Step progression using timers
  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        setIsVerified(false)
        setStep(2) // Move to multiple attempts after verification card
      }, 3000)
      return () => clearTimeout(timer)
    }

    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 3000)
      return () => clearTimeout(timer)
    }
  }, [isVerified, step])

  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleApprove = () => {
    setIsVerified(true)
  }

  const renderCard = () => {
    if (isVerified) {
      return (
        <div className="animate-fade-in-up max-w-xl p-6 rounded-xl border-2 shadow-lg bg-green-50 border-green-500 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-white rounded-full shadow">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">✅ Voter Verified</h2>
              <p className="text-gray-600">Voter ID: ID12345 - Dhamodharan</p>
            </div>
          </div>
          <p className="text-green-600 font-semibold">Verification complete successfully!</p>
        </div>
      )
    }

    switch (step) {
      case 0:
        return <p className="text-gray-400 animate-pulse">⏳ Waiting for NFC scan...</p>

      case 1:
        return (
          <div className="animate-fade-in-up max-w-md p-6 bg-white border border-blue-300 shadow-lg rounded-xl text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🗳️ Manual Verification</h2>
            <p className="text-gray-600 mb-4">Voter ID: ID12345 - Dhamodharan is ready for verification.</p>
            <button
              onClick={handleApprove}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              ✅ Allow
            </button>
          </div>
        )

      case 2:
        return (
          <div className="animate-fade-in-up max-w-md p-6 bg-yellow-50 border-2 border-yellow-400 shadow rounded-xl text-center">
            <AlertTriangle className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
            <h2 className="text-lg font-semibold text-yellow-700">⚠️ Multiple Voting Attempts Detected</h2>
            <p className="text-yellow-600 mt-2">Voter ID: ID12345 has already voted!</p>
          </div>
        )

      case 3:
        return (
          <div className="animate-fade-in-up max-w-md p-6 bg-red-50 border-2 border-red-400 shadow rounded-xl text-center">
            <XCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
            <h2 className="text-lg font-semibold text-red-700">❌ Voter Not Found</h2>
            <p className="text-red-600 mt-2">No record found for scanned NFC tag.</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      {renderCard()}
    </div>
  )
}

export default DummyVoterVerification
