export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] pb-40">
      <p className="text-6xl font-bold text-zinc-900 dark:text-white mb-4">
        404
      </p>
      <h1 className="text-2xl text-zinc-700 dark:text-zinc-300 mb-6">
        Page Not Found
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        The page you are looking for does not exist.
      </p>
    </section>
  );
}
