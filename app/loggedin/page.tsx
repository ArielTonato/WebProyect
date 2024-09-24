import Tasks from "@/components/todoMe/tasks";
import UserProfile from "@/components/todoMe/user-profile";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>TodoMe</h1>
      <UserProfile />
      <Tasks />
    </main>
  );
}
