import { PropsWithChildren } from "react";

export default function PostTitle({ children }: PropsWithChildren<any>) {
  return (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-8 mt-4" 
        style={{ 
          color: 'var(--color-primary)', 
          textShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          letterSpacing: '-0.02em'
        }}>
      {children}
    </h1>
  )
}
