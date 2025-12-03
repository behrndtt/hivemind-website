"use client"

interface MobileMenuItemProps {
  name: string
  href: string
  index: number
  onClick: () => void
  isOpen: boolean
}

export function MobileMenuItem({ name, href, index, onClick, isOpen }: MobileMenuItemProps) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className={`group flex items-center px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 font-sans hover:scale-[1.02] ${
          isOpen ? "animate-fade-in-left" : ""
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <span className="group-hover:text-[#00C896] transition-colors duration-300">{name}</span>
        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          →
        </div>
      </a>
    </li>
  )
}
