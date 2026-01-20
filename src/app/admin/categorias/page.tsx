"use client";

import { Suspense } from "react";
import AdminGuard from "@/components/guards/AdminGuard";
import Link from "next/link";
import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface Category {
  id: string;
  name: string;
}

type ActionType = "create" | "edit" | "delete";

export default function CategoriasPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Cargando panel de administración...
        </div>
      }
    >
      <AdminGuard>
        <CategoriasContent />
      </AdminGuard>
    </Suspense>
  );
}

function CategoriasContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{
    show: boolean;
    type: ActionType | null;
    category: Category | null;
  }>({
    show: false,
    type: null,
    category: null,
  });
  const [categoryName, setCategoryName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categories`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (type: ActionType, category: Category | null = null) => {
    setActionModal({ show: true, type, category });
    setCategoryName(category?.name || "");
  };

  const handleConfirmAction = async () => {
    if (!actionModal.type) return;
    if (
      (actionModal.type === "create" || actionModal.type === "edit") &&
      !categoryName.trim()
    ) {
      alert("El nombre de la categoría no puede estar vacío");
      return;
    }

    setProcessing(true);
    try {
      let endpoint = "";
      let method = "";
      let body: string | null = null;

      switch (actionModal.type) {
        case "create":
          endpoint = `${API_URL}/categories`;
          method = "POST";
          body = JSON.stringify({ name: categoryName.trim() });
          break;
        case "edit":
          if (!actionModal.category) return;
          endpoint = `${API_URL}/categories/${actionModal.category.id}`;
          method = "PATCH";
          body = JSON.stringify({ name: categoryName.trim() });
          break;
        case "delete":
          if (!actionModal.category) return;
          endpoint = `${API_URL}/categories/${actionModal.category.id}`;
          method = "DELETE";
          break;
      }

      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });

      await fetchCategories();
      setActionModal({ show: false, type: null, category: null });
      setCategoryName("");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin" className="text-purple-400">
          ← Volver al Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-white my-6">Categorías</h1>

        {loading && <p className="text-gray-400">Cargando...</p>}
        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  );
}
