import React from "react";
import { NewPost } from "./NewPost";
import { Posts } from "./Posts";

export const Feed = () => {
  return (
    <main className="flex-1 w-full max-w-2xl min-w-0 flex flex-col gap-4">
      <NewPost />
      <Posts />
    </main>
  );
};

