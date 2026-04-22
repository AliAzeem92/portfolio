"use client";

import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

export default function AboutAdminPage() {
  const [bio1, setBio1] = useState("")
  const [bio2, setBio2] = useState("")
  const [projectsCount, setProjectsCount] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [location, setLocation] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [training, setTraining] = useState("")
  const [availability, setAvailability] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/about")
        const data = await res.json()
        setBio1(data.bio1)
        setBio2(data.bio2)
        setProjectsCount(data.projectsCount)
        setYearsExperience(data.yearsExperience)
        setLocation(data.location)
        setJobTitle(data.jobTitle)
        setTraining(data.training)
        setAvailability(data.availability)
        setResumeUrl(data.resumeUrl)
      } catch {
        showToast("Failed to load data.", "error")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio1, bio2, projectsCount, yearsExperience, location, jobTitle, training, availability, resumeUrl }),
      })
      if (res.ok) showToast("Saved successfully!", "success")
      else showToast("Failed to save.", "error")
    } catch {
      showToast("Something went wrong.", "error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <h1 className="text-3xl font-bold text-white mb-8">About Section</h1>
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Bio Paragraph 1</label>
          <textarea rows={4} value={bio1} onChange={(e) => setBio1(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Bio Paragraph 2</label>
          <textarea rows={4} value={bio2} onChange={(e) => setBio2(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Projects Count</label>
            <input type="text" value={projectsCount} onChange={(e) => setProjectsCount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Years Experience</label>
            <input type="text" value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Job Title</label>
            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Training</label>
            <input type="text" value={training} onChange={(e) => setTraining(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Availability</label>
            <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Resume URL</label>
          <input type="text" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>
        <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
