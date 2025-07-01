"use client";

export default function Profile() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          👤 Your Profile
        </h1>

        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">
              {/* Placeholder initials */}H
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Muhammad Haroon</h2>
              <p className="text-gray-400">haroon@example.com</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Username</p>
              <p className="text-white font-medium">haroon23</p>
            </div>
            <div>
              <p className="text-gray-400">Joined On</p>
              <p className="text-white font-medium">April 5, 2025</p>
            </div>
            <div>
              <p className="text-gray-400">Items Traded</p>
              <p className="text-white font-medium">14</p>
            </div>
            <div>
              <p className="text-gray-400">Trust Score</p>
              <p className="text-green-400 font-semibold">92%</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
