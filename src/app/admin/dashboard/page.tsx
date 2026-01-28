"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Upload } from "lucide-react";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState<"portfolio" | "clients">("portfolio");
  const [items, setItems] = useState<any[]>([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, type));
    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchData(); }, [type]);

  const handleUpload = async () => {
    if (!file || !name) return;
    const storageRef = ref(storage, `${type}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, type), { 
      name, 
      imageUrl: url, 
      storagePath: storageRef.fullPath,
      createdAt: new Date() 
    });
    
    setFile(null); setName(""); fetchData();
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm("Delete this item?")) return;
    await deleteObject(ref(storage, path));
    await deleteDoc(doc(db, type, id));
    fetchData();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Content</h1>
      
      <div className="flex gap-4 mb-8">
        <Button variant={type === "portfolio" ? "default" : "outline"} onClick={() => setType("portfolio")}>Portfolio</Button>
        <Button variant={type === "clients" ? "default" : "outline"} onClick={() => setType("clients")}>Clients</Button>
      </div>

      <div className="bg-muted p-6 rounded-lg mb-8 space-y-4">
        <Input type="text" placeholder="Name/Description" value={name} onChange={e => setName(e.target.value)} />
        <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <Button onClick={handleUpload} className="w-full"><Upload className="mr-2 h-4 w-4" /> Upload to {type}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-card shadow-sm">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
              <span className="font-medium">{item.name}</span>
            </div>
            <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id, item.storagePath)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
