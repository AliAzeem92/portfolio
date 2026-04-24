"use client";

import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import ImageUploadBox from "../../components/ImageUploadBox";

export default function HeroAdminPage() {
  const [name, setName] = useState("")
  const [tagline, setTagline] = useState("")
  const [bio, setBio] = useState("")
  const [roles, setRoles] = useState("")
  const [isAvailable, setIsAvailable] = useState(true)
  const [profileImage, setProfileImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    setLoading(true)
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => {
        setName(data.name)
        setTagline(data.tagline)
        setBio(data.bio)
        setRoles(data.roles.join(", "))
        setIsAvailable(data.isAvailable)
        setProfileImage(data.profileImage)
      })
      .catch(() => showToast("Failed to fetch hero data", "error"))
      .finally(() => setLoading(false))
  }, [])

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
    })
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      })
      const data = await res.json()
      setProfileImage(data.url)
    } catch {
      showToast("Image upload failed", "error")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
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
      if (res.ok) showToast("Saved successfully!", "success")
      else showToast("Failed to save", "error")
    } catch {
      showToast("Something went wrong", "error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <h1 className="text-3xl font-bold text-white mb-8">Hero Section</h1>
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6">

        <div>
          <label className="block text-gray-400 text-sm mb-2">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Tagline</label>
          <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Bio</label>
          <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Roles (comma separated)</label>
          <input type="text" value={roles} onChange={(e) => setRoles(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Profile Image</label>
          <div className="w-48">
            <ImageUploadBox
              value={profileImage}
              onChange={handleImageUpload}
              uploading={uploading}
              aspectRatio="square"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="available" checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="w-4 h-4 accent-purple-500" />
          <label htmlFor="available" className="text-gray-300">Available for work</label>
        </div>

        <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
