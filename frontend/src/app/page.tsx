import { PostList } from "@/components/post/PostList";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div>
        <PostList />
      </div>
    </div>
  );
}
