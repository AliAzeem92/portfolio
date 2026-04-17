"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  order: number
}

const emptyForm = { title: "", category: "", description: "", image: "", technologies: "", liveUrl: "", githubUrl: "", order: 0 }

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editForm, setEditForm] = useState(emptyForm)
  const [editId, setEditId] = useState("")
  const [editModal, setEditModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data)
    } catch { setMessage("Failed to load.") }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleImageUpload = async (file: File, isEdit = false) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      })
      const data = await res.json()
      if (isEdit) setEditForm((prev) => ({ ...prev, image: data.url }))
      else setForm((prev) => ({ ...prev, image: data.url }))
    }
  }

  const handleAdd = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, technologies: form.technologies.split(",").map((t) => t.trim()) }),
      })
      if (res.ok) { setMessage("Added successfully!"); setForm(emptyForm); fetchData() }
      else setMessage("Failed to add.")
    } catch { setMessage("Something went wrong.") }
    finally { setSaving(false) }
  }

  const handleEdit = (project: Project) => {
    setEditId(project.id)
    setEditForm({ ...project, technologies: project.technologies.join(", ") })
    setEditModal(true)
  }

  const handleUpdate = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch(`/api/projects/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, technologies: editForm.technologies.split(",").map((t) => t.trim()) }),
      })
      if (res.ok) { setMessage("Updated successfully!"); setEditModal(false); fetchData() }
      else setMessage("Failed to update.")
    } catch { setMessage("Something went wrong.") }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      fetchData()
    } catch { setMessage("Failed to delete.") }
  }

  const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
    <div>
      <label className="block text-gray-400 text-sm mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
    </div>
  )

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Projects Section</h1>

      {/* Add New */}
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400">Add New Project</h2>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Project Image</label>
          {form.image && <img src={form.image} alt="preview" className="w-32 h-20 object-cover rounded-lg mb-3" />}
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none" />
        </div>
        <Field label="Technologies (comma separated)" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
        <div className="grid grid-cols-2 gap-6">
          <Field label="Live URL" value={form.liveUrl} onChange={(v) => setForm({ ...form, liveUrl: v })} />
          <Field label="GitHub URL" value={form.githubUrl} onChange={(v) => setForm({ ...form, githubUrl: v })} />
        </div>
        <Field label="Order" value={String(form.order)} onChange={(v) => setForm({ ...form, order: Number(v) })} type="number" />
        {message && <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</p>}
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Project"}
        </button>
      </div>

      {/* Existing Projects */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Existing Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-800 border border-white/10 rounded-xl p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {project.image && <img src={project.image} alt={project.title} className="w-16 h-12 object-cover rounded-lg" />}
              <div>
                <p className="text-white font-medium">{project.title}</p>
                <p className="text-gray-400 text-sm">{project.category}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(project)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Project">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" value={editForm.title} onChange={(v) => setEditForm({ ...editForm, title: v })} />
            <Field label="Category" value={editForm.category} onChange={(v) => setEditForm({ ...editForm, category: v })} />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Description</label>
            <textarea rows={3} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Project Image</label>
            {editForm.image && <img src={editForm.image} alt="preview" className="w-32 h-20 object-cover rounded-lg mb-3" />}
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none" />
          </div>
          <Field label="Technologies (comma separated)" value={editForm.technologies} onChange={(v) => setEditForm({ ...editForm, technologies: v })} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Live URL" value={editForm.liveUrl} onChange={(v) => setEditForm({ ...editForm, liveUrl: v })} />
            <Field label="GitHub URL" value={editForm.githubUrl} onChange={(v) => setEditForm({ ...editForm, githubUrl: v })} />
          </div>
          <Field label="Order" value={String(editForm.order)} onChange={(v) => setEditForm({ ...editForm, order: Number(v) })} type="number" />
          <div className="flex gap-4 mt-2">
            <button onClick={handleUpdate} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={() => setEditModal(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
