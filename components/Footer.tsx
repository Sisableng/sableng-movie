import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="mt-20 bg-zinc-900 py-4">
        <div className="container text-center text-zinc-500">
          <p>©{new Date().getFullYear()}, Sisableng, Allright resrved.</p>
        </div>
      </footer>
    </>
  );
}
