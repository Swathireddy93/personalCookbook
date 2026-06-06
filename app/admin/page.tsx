import { AdminEditor } from "@/components/admin-editor";
import { recipes } from "@/data/rituals";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Local Content Admin</p>
      <h1 className="mt-2 text-5xl font-semibold">Recipe editor</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        This no-auth pilot keeps data local and previews the shape of the content model. In production, the same fields can map to Supabase, PostgreSQL, or a headless CMS.
      </p>
      <AdminEditor initialRecipes={recipes} />
    </main>
  );
}
