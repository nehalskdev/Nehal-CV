/** Decorative, fixed page backdrop: soft aurora blobs over a faded grid. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
      <div className="animate-aurora absolute -top-40 -left-32 size-[34rem] rounded-full bg-brand/20 blur-[120px]" />
      <div className="animate-aurora absolute top-1/3 -right-40 size-[30rem] rounded-full bg-brand-2/15 blur-[120px] [animation-delay:-6s]" />
      <div className="animate-aurora absolute -bottom-40 left-1/4 size-[28rem] rounded-full bg-brand/10 blur-[120px] [animation-delay:-12s]" />
    </div>
  );
}
