export function Card({ children, className }) {
    return (
      <div className={`bg-white p-6 rounded-xl shadow-lg ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className }) {
    return <div className={`mt-2 ${className}`}>{children}</div>;
  }
  