"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  updateDoc 
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Loader2, Hash, Edit2, Check, X } from "lucide-react";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [index, setIndex] = useState<string>("0");
  const [type, setType] = useState<"portfolio" | "clients" | "materials">("portfolio");
  const [items, setItems] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // New states for editing existing preferences
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<string>("0");
  
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const q = query(collection(db, type));
      const querySnapshot = await getDocs(q);
      
      const fetchedItems = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));

      const sortedItems = fetchedItems.sort((a, b) => {
        const indexA = a.index !== undefined ? Number(a.index) : Number.MAX_SAFE_INTEGER;
        const indexB = b.index !== undefined ? Number(b.index) : Number.MAX_SAFE_INTEGER;
        return indexA - indexB;
      });

      setItems(sortedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({ title: "Fetch Error", description: "Could not load existing items.", variant: "destructive" });
    }
  };

  useEffect(() => { fetchData(); }, [type]);

  const handleUpload = async () => {
    if (!file || !name) {
      toast({ title: "Error", description: "Please provide both a name and a file.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    const storageRef = ref(storage, `${type}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setIsUploading(false);
        toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        
        await addDoc(collection(db, type), { 
          name, 
          imageUrl: url, 
          storagePath: storageRef.fullPath,
          index: Number(index),
          createdAt: new Date() 
        });
        
        setIsUploading(false);
        setUploadProgress(0);
        setFile(null);
        setName("");
        setIndex("0");
        toast({ title: "Success", description: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!` });
        fetchData();
      }
    );
  };

  const handleUpdateIndex = async (id: string) => {
    try {
      const docRef = doc(db, type, id);
      await updateDoc(docRef, {
        index: Number(editIndex)
      });
      setEditingId(null);
      toast({ title: "Updated", description: "Display preference updated successfully." });
      fetchData();
    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteObject(ref(storage, path));
      await deleteDoc(doc(db, type, id));
      toast({ title: "Deleted", description: "Item removed successfully." });
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-8 text-primary">Content Management</h1>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <Button 
          variant={type === "portfolio" ? "default" : "outline"} 
          onClick={() => setType("portfolio")}
          className="flex-1"
        >
          Portfolio Gallery
        </Button>
        <Button 
          variant={type === "clients" ? "default" : "outline"} 
          onClick={() => setType("clients")}
          className="flex-1"
        >
          Valued Customers
        </Button>
        <Button 
          variant={type === "materials" ? "default" : "outline"} 
          onClick={() => setType("materials")}
          className="flex-1"
        >
          Material List
        </Button>
      </div>

      <div className="bg-card border p-6 rounded-xl mb-12 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold">
          Upload New {type === "portfolio" ? "Project" : type === "clients" ? "Logo" : "Material"}
        </h2>
        <div className="space-y-4">
          <Input 
            type="text" 
            placeholder={type === "portfolio" ? "Project Name" : type === "clients" ? "Company Name" : "Material Name"} 
            value={name} 
            onChange={e => setName(e.target.value)} 
            disabled={isUploading}
          />

          {type === "clients" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Display Preference (e.g., 1 for first)</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="number" 
                  placeholder="Order Index" 
                  className="pl-9"
                  value={index} 
                  onChange={e => setIndex(e.target.value)} 
                  disabled={isUploading}
                />
              </div>
            </div>
          )}

          <Input 
            type="file" 
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0] || null)} 
            disabled={isUploading}
            className="cursor-pointer"
          />
          
          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">{Math.round(uploadProgress)}% Uploaded</p>
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            className="w-full" 
            disabled={isUploading || !file || !name}
          >
            {isUploading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="mr-2 h-4 w-4" /> Add to {type}</>
            )}
          </Button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">Existing Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 overflow-hidden flex-1">
                {/* Editable Index Badge */}
                {editingId === item.id ? (
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      className="w-16 h-8 text-xs" 
                      value={editIndex} 
                      onChange={(e) => setEditIndex(e.target.value)}
                    />
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={() => handleUpdateIndex(item.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded cursor-pointer hover:bg-primary/20 flex items-center gap-1"
                    title="Click to edit preference"
                    onClick={() => {
                      setEditingId(item.id);
                      setEditIndex(item.index?.toString() || "0");
                    }}
                  >
                    #{item.index || 0}
                    <Edit2 className="h-3 w-3 opacity-50" />
                  </div>
                )}

                <div className="relative h-12 w-12 flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover rounded-md" />
                </div>
                <span className="font-medium truncate">{item.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id, item.storagePath)} className="text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-10">No items found in this category.</p>
        )}
      </div>
    </div>
  );
}
