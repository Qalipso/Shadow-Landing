"use client";

import { motion } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { InboxDump } from "@/components/ui-mocks/InboxDump";
import { ClassificationCard } from "@/components/ui-mocks/ClassificationCard";
import { capture } from "@/content/copy";

export function CaptureScene() {
  return (
    <section
      id="capture"
      className="relative min-h-screen flex items-center px-6 py-32"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* left — copy + shady */}
        <div className="relative">
          <motion.div
            className="text-xs font-mono tracking-widest uppercase text-violet mb-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            {capture.eyebrow}
          </motion.div>
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-5"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {capture.headline}
          </motion.h2>
          <motion.p
            className="text-text-secondary text-body max-w-md mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {capture.subhead}
          </motion.p>

          <div className="hidden lg:flex justify-start mt-12">
            <Shady state="structure" size={200} magnetic={false} />
          </div>
        </div>

        {/* right — UI mocks layered */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <InboxDump />
            <div className="absolute -bottom-12 -right-4 md:-right-12 z-10">
              <ClassificationCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
