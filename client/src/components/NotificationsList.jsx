"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch this data from your API
    const mockNotifications = [
      {
        id: "N001",
        type: "verification_needed",
        voterId: "ID34567",
        voterName: "Michael Brown",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        status: "pending",
      },
      {
        id: "N002",
        type: "verification_needed",
        voterId: "ID67890",
        voterName: "Jennifer Lee",
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        status: "pending",
      },
      {
        id: "N003",
        type: "duplicate_attempt",
        voterId: "ID23456",
        voterName: "Sarah Johnson",
        timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
        status: "alert",
      },
      {
        id: "N004",
        type: "verification_needed",
        voterId: "ID90123",
        voterName: "Thomas Anderson",
        timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
        status: "pending",
      },
      {
        id: "N005",
        type: "verification_needed",
        voterId: "ID01234",
        voterName: "Jessica Williams",
        timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
        status: "pending",
      },
    ]

    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000) // Simulate API delay
  }, [])

  const handleApprove = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, status: "approved" } : notification)),
    )
  }

  const handleReject = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, status: "rejected" } : notification)),
    )
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-500">Notifications</h2>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-t-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8">
              <p className="text-lg text-gray-500">No notifications at this time.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li key={notification.id} className="p-4">
                  <div className="flex items-start">
                    {notification.type === "verification_needed" ? (
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      </div>
                    )}

                    <div className="flex-1 ml-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.type === "verification_needed"
                            ? "Voter Verification Needed"
                            : "Duplicate Voting Attempt Detected"}
                        </p>
                        <p className="text-sm text-gray-500">{formatTime(notification.timestamp)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        Voter ID: <span className="font-medium">{notification.voterId}</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Name: <span className="font-medium">{notification.voterName}</span>
                      </p>

                      {notification.status === "pending" && (
                        <div className="flex mt-4 space-x-3">
                          <button
                            onClick={() => handleApprove(notification.id)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircle className="w-4 h-4 mr-1.5" />
                            Allow
                          </button>
                          <button
                            onClick={() => handleReject(notification.id)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <XCircle className="w-4 h-4 mr-1.5" />
                            Not Allow
                          </button>
                        </div>
                      )}

                      {notification.status === "approved" && (
                        <p className="mt-2 text-sm font-medium text-green-600">Voter approved</p>
                      )}

                      {notification.status === "rejected" && (
                        <p className="mt-2 text-sm font-medium text-red-600">Voter rejected</p>
                      )}

                      {notification.status === "alert" && (
                        <p className="mt-2 text-sm font-medium text-yellow-600">
                          This voter has already voted. Duplicate attempt detected.
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationsList

