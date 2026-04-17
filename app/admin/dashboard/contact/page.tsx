"use client";

import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

export default function ContactAdminPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/contact")
        const data = await res.json()
        setEmail(data.email)
        setPhone(data.phone)
        setLocation(data.location)
        setResumeUrl(data.resumeUrl)
      } catch {
        setMessage("Failed to load data.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, location, resumeUrl }),
      })
      if (res.ok) setMessage("Saved successfully!")
      else setMessage("Failed to save.")
    } catch {
      setMessage("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Contact Section</h1>
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6">

        <div>
          <label className="block text-gray-400 text-sm mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Resume URL</label>
          <input type="text" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        {message && <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</p>}

        <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  )
}
