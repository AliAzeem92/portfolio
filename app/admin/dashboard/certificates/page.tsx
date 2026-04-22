"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

interface Certificate {
  id: string;
  name: string;
  provider: string;
  icon: string;
  iconUrl: string;
  order: number;
}

const emptyForm = { name: "", provider: "", icon: "", iconUrl: "", order: 0 };

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

export default function CertificatesAdminPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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
      const res = await fetch("/api/certificates");
      const data = await res.json();
      setCertificates(data);
    } catch {
      showToast("Failed to load.", "error");
    } finally {
      setLoading(false);
    }
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
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { showToast("Added successfully!", "success"); setForm(emptyForm); fetchData(); }
      else showToast("Failed to add.", "error");
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cert: Certificate) => {
    setEditId(cert.id);
    setEditForm({ ...cert });
    setEditModal(true);
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const { id, ...rest } = editForm as any;
      const res = await fetch(`/api/certificates/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
      if (res.ok) { showToast("Updated successfully!", "success"); setEditModal(false); fetchData(); }
      else showToast("Failed to update.", "error");
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    try {
      await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      fetchData();
    } catch {
      showToast("Failed to delete.", "error");
    }
  };

  const IconUploadField = ({
    iconUrl,
    onUpload,
  }: {
    iconUrl: string;
    onUpload: (file: File) => void;
  }) => (
    <div>
      <label className="block text-gray-400 text-sm mb-2">Icon Image</label>
      {iconUrl && (
        <img src={iconUrl} alt="icon preview" className="w-12 h-12 object-contain rounded-lg mb-2 bg-white/5 p-1" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none"
      />
      {uploading && <p className="text-purple-400 text-xs mt-1">Uploading...</p>}
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <h1 className="text-3xl font-bold text-white mb-8">Certificates Section</h1>

      {/* Add New */}
      <div className="bg-slate-800 border border-white/10 rounded-xl p-8 space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400">Add New Certificate</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Certificate Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Provider</label>
            <input type="text" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <IconUploadField iconUrl={form.iconUrl} onUpload={(f) => handleIconUpload(f, false)} />
          <div>
            <label className="block text-gray-400 text-sm mb-2">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
          </div>
        </div>
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Certificate"}
        </button>
      </div>

      {/* Existing Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Existing Certificates</h2>
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-slate-800 border border-white/10 rounded-xl p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {cert.iconUrl ? (
                <img src={cert.iconUrl} alt={cert.name} className="w-10 h-10 object-contain rounded-lg bg-white/5 p-1" />
              ) : (
                <span className="text-3xl">{cert.icon}</span>
              )}
              <div>
                <p className="text-white font-medium">{cert.name}</p>
                <p className="text-gray-400 text-sm">{cert.provider}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(cert)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">Edit</button>
              <button onClick={() => handleDelete(cert.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Certificate">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Certificate Name</label>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Provider</label>
              <input type="text" value={editForm.provider} onChange={(e) => setEditForm({ ...editForm, provider: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <IconUploadField iconUrl={editForm.iconUrl} onUpload={(f) => handleIconUpload(f, true)} />
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
  );
}
