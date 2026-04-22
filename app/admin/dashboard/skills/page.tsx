"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import { Pencil, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  icon: string;
  iconUrl: string;
  category: string;
  order: number;
}

const emptyForm = { name: "", icon: "", iconUrl: "", category: "frontend", order: 0 };

async function uploadToCloudinary(file: File): Promise<string> {
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64 }),
  });
  const data = await res.json();
  return data.url;
}

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editId, setEditId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data);
    } catch { showToast("Failed to load.", "error"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleIconUpload = async (file: File, isEdit = false) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      if (isEdit) setEditForm((prev) => ({ ...prev, iconUrl: url }));
      else setForm((prev) => ({ ...prev, iconUrl: url }));
    } catch {
      showToast("Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { showToast("Added successfully!", "success"); setForm(emptyForm); fetchData(); }
      else showToast("Failed to add.", "error");
    } catch { showToast("Something went wrong.", "error"); }
    finally { setSaving(false); }
  };

  const handleEdit = (skill: Skill) => {
    setEditId(skill.id);
    setEditForm({ ...skill });
    setEditModal(true);
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const { id, ...rest } = editForm as any;
      const res = await fetch(`/api/skills/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
      if (res.ok) { showToast("Updated successfully!", "success"); setEditModal(false); fetchData(); }
      else showToast("Failed to update.", "error");
    } catch { showToast("Something went wrong.", "error"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" });
      fetchData();
    } catch { showToast("Failed to delete.", "error"); }
  };

  const categories = ["frontend", "backend", "tools"];

  if (loading) return <Loader />;

  return (
    <div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <h1 className="text-3xl font-bold text-white mb-8">Skills Section</h1>

      {/* Add New */}
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400">Add New Skill</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Logo Image</label>
            {form.iconUrl && (
              <img src={form.iconUrl} alt="preview" className="w-16 h-16 object-contain rounded-lg mb-2" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleIconUpload(e.target.files[0], false)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none"
            />
            {uploading && <p className="text-purple-400 text-xs mt-1">Uploading...</p>}
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500">
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools & DevOps</option>
            </select>
          </div>
        </div>
        {/* Order */}
        <div className="w-1/2">
          <label className="block text-gray-400 text-sm mb-2">Order</label>
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
        </div>
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Skill"}
        </button>
      </div>

      {/* Existing Skills by Category — logo grid with hover actions */}
      {categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (catSkills.length === 0) return null;
        return (
          <div key={cat} className="mb-10">
            <h2 className="text-xl font-semibold text-white capitalize mb-4">{cat}</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {catSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="relative group flex items-center justify-center bg-slate-800 border border-white/10 rounded-xl p-3 aspect-square"
                >
                  {/* Logo */}
                  {skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name || "skill"}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-3xl">{skill.icon}</span>
                  )}

                  {/* Hover overlay with icon buttons */}
                  <div className="absolute inset-0 rounded-xl flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{background: "rgba(15,23,42,0.75)"}}>
                    <button
                      onClick={() => handleEdit(skill)}
                      title="Edit"
                      className="w-9 h-9 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      title="Delete"
                      className="w-9 h-9 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Edit Modal — only logo upload + category + order */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Skill">
        <div className="space-y-4">
          {/* Logo Upload */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Logo Image</label>
            {editForm.iconUrl && (
              <img src={editForm.iconUrl} alt="preview" className="w-16 h-16 object-contain rounded-lg mb-2" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleIconUpload(e.target.files[0], true)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none"
            />
            {uploading && <p className="text-purple-400 text-xs mt-1">Uploading...</p>}
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Category</label>
            <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500">
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools & DevOps</option>
            </select>
          </div>
          {/* Order */}
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
  );
}
