"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

interface Education {
  id: string
  degree: string
  institution: string
  location: string
  duration: string
  gpa?: string
  status: string
  description: string
  coursework: string[]
  color: string
  order: number
}

const emptyForm = { degree: "", institution: "", location: "", duration: "", gpa: "", status: "", description: "", coursework: "", color: "from-purple-500 to-blue-500", order: 0 }

const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div>
    <label className="block text-gray-400 text-sm mb-2">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
  </div>
)

export default function EducationAdminPage() {
  const [entries, setEntries] = useState<Education[]>([])
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
      const res = await fetch("/api/education")
      const data = await res.json()
      setEntries(data)
    } catch {
      setMessage("Failed to load data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleAdd = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, coursework: form.coursework.split(",").map((c) => c.trim()) }),
      })
      if (res.ok) { setMessage("Added successfully!"); setForm(emptyForm); fetchData() }
      else setMessage("Failed to add.")
    } catch { setMessage("Something went wrong.") }
    finally { setSaving(false) }
  }

  const handleEdit = (edu: Education) => {
    setEditId(edu.id)
    setEditForm({ ...edu, coursework: edu.coursework.join(", "), gpa: edu.gpa || "" })
    setEditModal(true)
  }

  const handleUpdate = async () => {
    setSaving(true)
    setMessage("")
    try {
      const { id, createdAt, ...rest } = editForm as any;
      const res = await fetch(`/api/education/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, coursework: editForm.coursework.split(",").map((c: string) => c.trim()) }),
      })
      if (res.ok) { setMessage("Updated successfully!"); setEditModal(false); fetchData() }
      else setMessage("Failed to update.")
    } catch { setMessage("Something went wrong.") }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return
    try {
      await fetch(`/api/education/${id}`, { method: "DELETE" })
      fetchData()
    } catch { setMessage("Failed to delete.") }
  }



  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Education Section</h1>

      {/* Add New */}
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400">Add New Entry</h2>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Degree" value={form.degree} onChange={(v) => setForm({ ...form, degree: v })} />
          <Field label="Institution" value={form.institution} onChange={(v) => setForm({ ...form, institution: v })} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
          <Field label="Duration" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Field label="GPA (optional)" value={form.gpa} onChange={(v) => setForm({ ...form, gpa: v })} />
          <Field label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
        </div>
        <Field label="Coursework (comma separated)" value={form.coursework} onChange={(v) => setForm({ ...form, coursework: v })} />
        <div className="grid grid-cols-2 gap-6">
          <Field label="Color (Tailwind gradient)" value={form.color} onChange={(v) => setForm({ ...form, color: v })} />
          <Field label="Order" value={String(form.order)} onChange={(v) => setForm({ ...form, order: Number(v) })} type="number" />
        </div>
        {message && <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</p>}
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Entry"}
        </button>
      </div>

      {/* Existing Entries */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Existing Entries</h2>
        {entries.map((edu) => (
          <div key={edu.id} className="bg-slate-800 border border-white/10 rounded-xl p-6 flex justify-between items-center">
            <div>
              <p className="text-white font-medium">{edu.degree}</p>
              <p className="text-gray-400 text-sm">{edu.institution}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(edu)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">Edit</button>
              <button onClick={() => handleDelete(edu.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Entry">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Degree" value={editForm.degree} onChange={(v) => setEditForm({ ...editForm, degree: v })} />
            <Field label="Institution" value={editForm.institution} onChange={(v) => setEditForm({ ...editForm, institution: v })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Location" value={editForm.location} onChange={(v) => setEditForm({ ...editForm, location: v })} />
            <Field label="Duration" value={editForm.duration} onChange={(v) => setEditForm({ ...editForm, duration: v })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="GPA (optional)" value={editForm.gpa} onChange={(v) => setEditForm({ ...editForm, gpa: v })} />
            <Field label="Status" value={editForm.status} onChange={(v) => setEditForm({ ...editForm, status: v })} />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Description</label>
            <textarea rows={3} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500 resize-none" />
          </div>
          <Field label="Coursework (comma separated)" value={editForm.coursework} onChange={(v) => setEditForm({ ...editForm, coursework: v })} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Color" value={editForm.color} onChange={(v) => setEditForm({ ...editForm, color: v })} />
            <Field label="Order" value={String(editForm.order)} onChange={(v) => setEditForm({ ...editForm, order: Number(v) })} type="number" />
          </div>
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
