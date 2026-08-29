"use client";

import { motion } from "framer-motion";
import { NewPost } from "./NewPost";
import { Posts } from "./Posts";

export const Feed = () => {
  return (
    <main className="flex-1 w-full max-w-2xl min-w-0 flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="sticky top-4 z-20"
      >
        <NewPost />
      </motion.div>
      <Posts />
    </main>
  );
};

