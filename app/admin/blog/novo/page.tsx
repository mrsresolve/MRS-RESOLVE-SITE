import { AdminHeader } from "@/components/admin/Header";
import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <>
      <AdminHeader title="Novo post" />
      <div className="admin__content">
        <div className="admin-panel">
          <PostForm action={createPost} />
        </div>
      </div>
    </>
  );
}
