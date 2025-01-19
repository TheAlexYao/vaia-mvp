export function Card({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`rounded-lg ${className}`}>
      {children}
    </div>
  )
} 