export function LoadingSkeleton() {
  return <div className="skeleton-grid" aria-label="Loading products" role="status"><span className="sr-only">Loading</span>{[1, 2, 3].map((item) => <div className="skeleton-card" key={item}><div /><span /><span /></div>)}</div>;
}
