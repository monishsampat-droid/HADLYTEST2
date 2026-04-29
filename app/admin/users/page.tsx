"use client"

const users = [
  {
    id: "u1",
    name: "Aditya Sharma",
    email: "aditya@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "u2",
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    role: "User",
    status: "Active",
  },
  {
    id: "u3",
    name: "Sneha Kapoor",
    email: "sneha@gmail.com",
    role: "User",
    status: "Inactive",
  },
]

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Users
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage platform users
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {users.map((user) => (
              <tr key={user.id}>

                <td className="p-3 font-medium">
                  {user.name}
                </td>

                <td>{user.email}</td>

                <td>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="text-right pr-4">
                  <button className="text-primary text-sm">
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}