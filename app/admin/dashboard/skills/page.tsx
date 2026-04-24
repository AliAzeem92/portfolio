"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import ImageUploadBox from "../../components/ImageUploadBox";
import { Pencil, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  icon: string;
  iconUrl: string;
  order: number;
}

const emptyForm = { name: "", icon: "", iconUrl: "", order: 0 };

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
  return (await res.json()).url;
}

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editId, setEditId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const fetchData = async (silent = false) => {
    if (!silent) setInitialLoading(true);
    try {
      const res = await fetch("/api/skills");
      setSkills(await res.json());
    } catch { showToast("Failed to load.", "error"); }
    finally { setInitialLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddUpload = async (file: File) => {
    setUploading(true);
    try { const url = await uploadToCloudinary(file); setForm((p) => ({ ...p, iconUrl: url })); }
    catch { showToast("Upload failed.", "error"); }
    finally { setUploading(false); }
  };

  const handleEditUpload = async (file: File) => {
    setEditUploading(true);
    try { const url = await uploadToCloudinary(file); setEditForm((p) => ({ ...p, iconUrl: url })); }
    catch { showToast("Upload failed.", "error"); }
    finally { setEditUploading(false); }
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { showToast("Added!", "success"); setForm(emptyForm); fetchData(true); }
      else showToast("Failed to add.", "error");
    } catch { showToast("Something went wrong.", "error"); }
    finally { setSaving(false); }
  };

  const handleEdit = (skill: Skill) => { setEditId(skill.id); setEditForm({ ...skill }); setEditModal(true); };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const { id, ...rest } = editForm as any;
      const res = await fetch(`/api/skills/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
      if (res.ok) { showToast("Updated!", "success"); setEditModal(false); fetchData(true); }
      else showToast("Failed to update.", "error");
    } catch { showToast("Something went wrong.", "error"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    setSkills((prev) => prev.filter((s) => s.id !== id));
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" });
      showToast("Deleted.", "success");
    } catch { showToast("Failed to delete.", "error"); fetchData(true); }
  };

  if (initialLoading) return <Loader />;

  return (
    <div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <h1 className="text-3xl font-bold text-white mb-8">Skills Section</h1>

      {/* Add New */}
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400">Add New Skill</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Logo Image</label>
            <ImageUploadBox value={form.iconUrl} onChange={handleAddUpload} uploading={uploading} aspectRatio="square" />
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-gray-400 text-sm mb-2">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Skill"}
        </button>
      </div>

      {/* Skills grid */}
      <h2 className="text-xl font-semibold text-white mb-4">All Skills</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="relative group flex items-center justify-center bg-slate-800 border border-white/10 rounded-xl p-3 aspect-square">
            {skill.iconUrl ? (
              <img src={skill.iconUrl} alt={skill.name || "skill"} className="w-full h-full object-contain" />
            ) : (
              <span className="text-3xl">{skill.icon}</span>
            )}
            <div className="absolute inset-0 rounded-xl flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(15,23,42,0.75)" }}>
              <button onClick={() => handleEdit(skill)} title="Edit" className="w-9 h-9 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                <Pencil className="w-4 h-4 text-white" />
              </button>
              <button onClick={() => handleDelete(skill.id)} title="Delete" className="w-9 h-9 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Skill">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Logo Image</label>
            <ImageUploadBox value={editForm.iconUrl} onChange={handleEditUpload} uploading={editUploading} aspectRatio="square" />
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
            <button onClick={() => setEditModal(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
