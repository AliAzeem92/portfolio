"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import ImageUploadBox from "../../components/ImageUploadBox";

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
  return (await res.json()).url;
}

export default function CertificatesAdminPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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
      const res = await fetch("/api/certificates");
      setCertificates(await res.json());
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
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { showToast("Added!", "success"); setForm(emptyForm); fetchData(true); }
      else showToast("Failed to add.", "error");
    } catch { showToast("Something went wrong.", "error"); }
    finally { setSaving(false); }
  };

  const handleEdit = (cert: Certificate) => { setEditId(cert.id); setEditForm({ ...cert }); setEditModal(true); };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const { id, ...rest } = editForm as any;
      const res = await fetch(`/api/certificates/${editId}`, {
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
    if (!confirm("Delete this certificate?")) return;
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      showToast("Deleted.", "success");
    } catch { showToast("Failed to delete.", "error"); fetchData(true); }
  };

  const inputCls = "w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-white/10 outline-none focus:border-purple-500";

  if (initialLoading) return <Loader />;

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
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Provider</label>
            <input type="text" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Certificate Image</label>
            <ImageUploadBox value={form.iconUrl} onChange={handleAddUpload} uploading={uploading} aspectRatio="square" />
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-gray-400 text-sm mb-2">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls} />
          </div>
        </div>
        <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          {saving ? "Adding..." : "Add Certificate"}
        </button>
      </div>

      {/* Existing Certificates — 3-column card grid */}
      <h2 className="text-xl font-semibold text-white mb-4">Existing Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-slate-800 border border-white/10 rounded-xl overflow-hidden flex flex-col">
            {/* Image */}
            <div className="h-40 bg-slate-700 flex items-center justify-center p-4">
              {cert.iconUrl ? (
                <img src={cert.iconUrl} alt={cert.name} className="h-full w-full object-contain" />
              ) : cert.icon ? (
                <span className="text-5xl">{cert.icon}</span>
              ) : (
                <div className="text-gray-500 text-sm">No image</div>
              )}
            </div>
            {/* Info + Actions */}
            <div className="p-4 flex flex-col gap-3 flex-1">
              <div>
                <p className="text-white font-semibold">{cert.name}</p>
                {cert.provider && <p className="text-gray-400 text-sm">{cert.provider}</p>}
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => handleEdit(cert)} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">Edit</button>
                <button onClick={() => handleDelete(cert.id)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Certificate">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Certificate Name</label>
            <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Provider</label>
            <input type="text" value={editForm.provider} onChange={(e) => setEditForm({ ...editForm, provider: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Certificate Image</label>
            <ImageUploadBox value={editForm.iconUrl} onChange={handleEditUpload} uploading={editUploading} aspectRatio="square" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Order</label>
            <input type="number" value={editForm.order} onChange={(e) => setEditForm({ ...editForm, order: Number(e.target.value) })} className={inputCls} />
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
