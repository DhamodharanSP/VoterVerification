"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"

const VotersList = () => {
  const [voters, setVoters] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch this data from your API
    const mockVoters = [
      {
        id: "V001",
        name: "John Smith",
        age: 35,
        address: "123 Main St, City",
        voterId: "ID12345",
        hasVoted: false,
        verified: true,
      },
      {
        id: "V002",
        name: "Sarah Johnson",
        age: 42,
        address: "456 Oak Ave, Town",
        voterId: "ID23456",
        hasVoted: true,
        verified: true,
      },
      {
        id: "V003",
        name: "Michael Brown",
        age: 29,
        address: "789 Pine Rd, Village",
        voterId: "ID34567",
        hasVoted: false,
        verified: false,
      },
      {
        id: "V004",
        name: "Emily Davis",
        age: 31,
        address: "101 Elm St, County",
        voterId: "ID45678",
        hasVoted: false,
        verified: true,
      },
      {
        id: "V005",
        name: "Robert Wilson",
        age: 55,
        address: "202 Maple Dr, District",
        voterId: "ID56789",
        hasVoted: true,
        verified: true,
      },
      {
        id: "V006",
        name: "Jennifer Lee",
        age: 38,
        address: "303 Cedar Ln, Region",
        voterId: "ID67890",
        hasVoted: false,
        verified: false,
      },
      {
        id: "V007",
        name: "David Miller",
        age: 47,
        address: "404 Birch Blvd, Area",
        voterId: "ID78901",
        hasVoted: false,
        verified: true,
      },
      {
        id: "V008",
        name: "Lisa Garcia",
        age: 33,
        address: "505 Walnut Way, Zone",
        voterId: "ID89012",
        hasVoted: false,
        verified: true,
      },
    ]

    setTimeout(() => {
      setVoters(mockVoters)
      setLoading(false)
    }, 1000) // Simulate API delay
  }, [])

  const filteredVoters = voters.filter(
    (voter) =>
      voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.voterId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-500">Manage Voters</h2>

      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or voter ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600"
          />
        </div>

        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVoters.map((voter) => (
            <div key={voter.id} className="overflow-hidden bg-white rounded-lg shadow">
              <div
                className={`h-2 ${voter.hasVoted ? "bg-green-500" : voter.verified ? "bg-blue-500" : "bg-yellow-500"}`}
              ></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-500">{voter.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Age: {voter.age}</p>
                <p className="mt-1 text-sm text-gray-500">Voter ID: {voter.voterId}</p>
                <p className="mt-1 text-sm text-gray-500">Address: {voter.address}</p>

                <div className="flex items-center mt-4 space-x-2">
                  {voter.hasVoted ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Has Voted
                    </span>
                  ) : voter.verified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending Verification
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredVoters.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-gray-500">No voters found matching your search.</p>
        </div>
      )}
    </div>
  )
}

export default VotersList

