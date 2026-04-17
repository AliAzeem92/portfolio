"use client";

import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

export default function HeroAdminPage() {
  const [name, setName] = useState("")
  const [tagline, setTagline] = useState("")
  const [bio, setBio] = useState("")
  const [roles, setRoles] = useState("")
  const [isAvailable, setIsAvailable] = useState(true)
  const [profileImage, setProfileImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchHeroData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/hero")
        const data = await res.json()
        setName(data.name)
        setTagline(data.tagline)
        setBio(data.bio)
        setRoles(data.roles.join(", "))
        setIsAvailable(data.isAvailable)
        setProfileImage(data.profileImage)
      } catch {
        setMessage("Failed to fetch hero data")
      } finally {
        setLoading(false)
      }
    }
    fetchHeroData()
  }, [])

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      })
      const data = await res.json()
      setProfileImage(data.url)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, tagline, bio,
          roles: roles.split(",").map((r) => r.trim()),
          isAvailable, profileImage,
        }),
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
      <h1 className="text-3xl font-bold text-white mb-8">Hero Section</h1>
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6">

        <div>
          <label className="block text-gray-400 text-sm mb-2">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Ali Azeem"
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Tagline</label>
          <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
            placeholder="Hello, I'm"
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Bio</label>
          <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)}
            placeholder="A developer who loves turning ideas into..."
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Roles (comma separated)</label>
          <input type="text" value={roles} onChange={(e) => setRoles(e.target.value)}
            placeholder="Full Stack Developer, React Specialist, ..."
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Profile Image</label>
          {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-lg object-cover mb-3" />}
          <input type="file" accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="available" checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="w-4 h-4 accent-purple-500" />
          <label htmlFor="available" className="text-gray-300">Available for work</label>
        </div>

        {message && <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</p>}

        <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  )
}
