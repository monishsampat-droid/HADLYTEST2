export default function ProfilePage() {
  return (
    <div className="max-w-xl space-y-6">

      <h1 className="text-xl font-bold">
        Profile
      </h1>

      <form className="space-y-4">

        <input
          defaultValue="Aditya Sharma"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <input
          defaultValue="aditya@gmail.com"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <input
          defaultValue="+91 98765 43210"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <button className="bg-primary text-white px-6 py-3 rounded-lg">
          Save Changes
        </button>

      </form>

    </div>
  )
}