import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/Header";
import { PostForm } from "@/components/admin/PostForm";
import { getPostById } from "@/lib/blog";
import { updatePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <>
      <AdminHeader title="Editar post" />
      <div className="admin__content">
        <div className="admin-panel">
          <PostForm action={updatePost.bind(null, id)} post={post} />
        </div>
      </div>
    </>
  );
}
