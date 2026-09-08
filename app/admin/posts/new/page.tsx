import AdminGate from "../../AdminGate";
import PostForm from "../../PostForm";

export default function NewPostPage() {
  return (
    <AdminGate>
      <div className="min-h-screen bg-background px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-sm tracking-widest text-violet">
            &#9670; ADMIN / NEW POST
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            New post
          </h1>

          <div className="mt-10">
            <PostForm />
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
