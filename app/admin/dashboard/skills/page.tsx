"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

interface Skill {
  id: string
  name: string
  icon: string
  category: string
  order: number
}

const emptyForm = { name: "", icon: "", category: "frontend", order: 0 }

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editForm, setEditForm] = useState(emptyForm)
  const [editId, setEditId] = useState("")
  const [editModal, setEditModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/skills")
      const data = await res.json()
      setSkills(data)
    } catch { showToast("Failed to load.", "error") }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleAdd = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) { showToast("Added successfully!", "success"); setForm(emptyForm); fetchData() }
      else showToast("Failed to add.", "error")
    } catch { showToast("Something went wrong.", "error") }
    finally { setSaving(false) }
  }

  const handleEdit = (skill: Skill) => {
    setEditId(skill.id)
    setEditForm({ ...skill })
    setEditModal(true)
  }

  const handleUpdate = async () => {
    setSaving(true)
    setMessage("")
    try {
      const { id, ...rest } = editForm as any
      const res = await fetch(`/api/skills/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      })
      if (res.ok) { showToast("Updated successfully!", "success"); setEditModal(false); fetchData() }
      else showToast("Failed to update.", "error")
    } catch { showToast("Something went wrong.", "error") }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" })
      fetchData()
    } catch { showToast("Failed to delete.", "error") }
  }

  const categories = ["frontend", "backend", "tools"]

  if (loading) return <Loader />

  return (
    <div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <h1 className="text-3xl font-bold text-white mb-8">Skills Section</h1>

      {/* Add New */}
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400">Add New Skill</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Skill Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Icon (emoji)</label>
            <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500">
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools & DevOps</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        {/* message removed - using toast */}
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Skill"}
        </button>
      </div>

      {/* Existing Skills by Category */}
      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-semibold text-white capitalize mb-4">{cat}</h2>
          <div className="space-y-3">
            {skills.filter((s) => s.category === cat).map((skill) => (
              <div key={skill.id} className="bg-slate-800 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                <span className="text-white">{skill.icon} {skill.name}</span>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(skill)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">Edit</button>
                  <button onClick={() => handleDelete(skill.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Skill">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Skill Name</label>
            <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Icon (emoji)</label>
            <input type="text" value={editForm.icon} onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Category</label>
            <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500">
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools & DevOps</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Order</label>
            <input type="number" value={editForm.order} onChange={(e) => setEditForm({ ...editForm, order: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
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
