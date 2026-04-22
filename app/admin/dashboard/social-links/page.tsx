"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
  color: string
  order: number
}

const emptyForm = { label: "", href: "", icon: "", color: "", order: 0 }

export default function SocialLinksAdminPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
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
      const res = await fetch("/api/social-links")
      const data = await res.json()
      setLinks(data)
    } catch { showToast("Failed to load.", "error") }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleAdd = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) { showToast("Added successfully!", "success"); setForm(emptyForm); fetchData() }
      else showToast("Failed to add.", "error")
    } catch { showToast("Something went wrong.", "error") }
    finally { setSaving(false) }
  }

  const handleEdit = (link: SocialLink) => {
    setEditId(link.id)
    setEditForm({ ...link })
    setEditModal(true)
  }

  const handleUpdate = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch(`/api/social-links/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })
      if (res.ok) { showToast("Updated successfully!", "success"); setEditModal(false); fetchData() }
      else showToast("Failed to update.", "error")
    } catch { showToast("Something went wrong.", "error") }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this social link?")) return
    try {
      await fetch(`/api/social-links/${id}`, { method: "DELETE" })
      fetchData()
    } catch { showToast("Failed to delete.", "error") }
  }

  if (loading) return <Loader />

  return (
    <div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <h1 className="text-3xl font-bold text-white mb-8">Social Links</h1>

      {/* Add New */}
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400">Add New Link</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Label</label>
            <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="GitHub" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Icon (Github / Linkedin / Mail)</label>
            <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="Github" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">URL</label>
          <input type="text" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })}
            placeholder="https://github.com/..." className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Color (Tailwind gradient)</label>
            <input type="text" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
              placeholder="from-gray-600 to-gray-800" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        {/* message removed - using toast */}
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Link"}
        </button>
      </div>

      {/* Existing Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Existing Links</h2>
        {links.map((link) => (
          <div key={link.id} className="bg-slate-800 border border-white/10 rounded-xl p-6 flex justify-between items-center">
            <div>
              <p className="text-white font-medium">{link.label}</p>
              <p className="text-gray-400 text-sm">{link.href}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(link)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">Edit</button>
              <button onClick={() => handleDelete(link.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Social Link">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Label</label>
              <input type="text" value={editForm.label} onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Icon</label>
              <input type="text" value={editForm.icon} onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">URL</label>
            <input type="text" value={editForm.href} onChange={(e) => setEditForm({ ...editForm, href: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Color</label>
              <input type="text" value={editForm.color} onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Order</label>
              <input type="number" value={editForm.order} onChange={(e) => setEditForm({ ...editForm, order: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
            </div>
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
