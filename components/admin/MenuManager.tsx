"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, ImageIcon, Search } from "lucide-react";
import type { CategoryId } from "@/lib/menu-data";
import { categories } from "@/lib/menu-data";
import { createItem, updateItem, deleteItem } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface AdminMenuRow {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: "burgers" | "drinks" | "sides" | "extras";
  image_url: string | null;
  sort_order: number;
}

const categoryLabel: Record<string, string> = {
  burgers: "Burgers",
  drinks: "Drinks",
  sides: "Sides",
  extras: "Extras",
};

export default function MenuManager({
  initialItems,
}: {
  initialItems: AdminMenuRow[];
}) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminMenuRow | null>(null);
  const [deleting, setDeleting] = useState<AdminMenuRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<CategoryId | "all">(
    "all"
  );
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();
  const filtered = initialItems.filter((item) => {
    const byCategory =
      filterCategory === "all" || item.category === filterCategory;
    const bySearch =
      q === "" ||
      item.name.toLowerCase().includes(q) ||
      (item.description ?? "").toLowerCase().includes(q);
    return byCategory && bySearch;
  });

  function openAdd() {
    setEditing(null);
    setError(null);
    setFormOpen(true);
  }

  function openEdit(item: AdminMenuRow) {
    setEditing(item);
    setError(null);
    setFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const res = editing
      ? await updateItem(formData)
      : await createItem(formData);
    setSaving(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    toast.success(editing ? "Menu updated" : "Menu added");
    setFormOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleting) return;
    setSaving(true);
    const res = await deleteItem(deleting.id);
    setSaving(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Menu deleted");
    setDeleting(null);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Menu items</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {initialItems.length} items · shown live on the
            website
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add item
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or description…"
            className="pl-9"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value as CategoryId | "all")
          }
          className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-48"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-9 w-[56px]">Photo</TableHead>
              <TableHead className="h-9">Name</TableHead>
              <TableHead className="h-9">Category</TableHead>
              <TableHead className="h-9">Price</TableHead>
              <TableHead className="h-9 w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-20 py-2 text-center text-muted-foreground"
                >
                  {initialItems.length === 0
                    ? "No menu items yet."
                    : "No items match your filter."}
                </TableCell>
              </TableRow>
            )}
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-1.5">
                  <div className="relative h-9 w-9 overflow-hidden rounded-md border border-border bg-muted">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-1.5 font-medium">{item.name}</TableCell>
                <TableCell className="py-1.5">
                  <Badge variant="secondary">
                    {categoryLabel[item.category] ?? item.category}
                  </Badge>
                </TableCell>
                <TableCell className="py-1.5">${Number(item.price)}</TableCell>
                <TableCell className="py-1.5 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEdit(item)}
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setDeleting(item)}
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit item" : "Add item"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update this menu item. Changes appear on the site immediately."
                : "Create a new menu item."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {editing && <input type="hidden" name="id" value={editing.id} />}
            <input
              type="hidden"
              name="image_url"
              value={editing?.image_url ?? ""}
            />

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editing?.name ?? ""}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  defaultValue={editing?.category ?? "burgers"}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.5"
                  defaultValue={editing?.price ?? ""}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={editing?.description ?? ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Photo</Label>
              <div className="flex items-center gap-3">
                {editing?.image_url && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border">
                    <Image
                      src={editing.image_url}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}
                <Input id="image" name="image" type="file" accept="image/*" />
              </div>
              <p className="text-xs text-muted-foreground">
                {editing
                  ? "Leave empty to keep the current photo."
                  : "Optional — upload a photo for this item."}
              </p>
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : editing ? "Save changes" : "Add item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete item?</DialogTitle>
            <DialogDescription>
              &ldquo;{deleting?.name}&rdquo; will be permanently removed from the
              menu. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleting(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={saving}
            >
              {saving ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
