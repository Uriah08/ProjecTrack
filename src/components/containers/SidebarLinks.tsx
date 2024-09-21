import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

type Props = {
    label: string;
    icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>
    link: string;
};

const SidebarLinks = ({label, icon: Icon, link}:Props) => {

  const pathname = usePathname()
  const active = link === pathname || (pathname === '/' && label === 'Dashboard')

  return (
    <Link href={link} className={`relative flex items-center gap-2 h-[40px] ${active && 'bg-myLightFollow dark:bg-myDarkFollow'} duration-200 transition-all hover:bg-myLightFollow dark:hover:bg-myDarkFollow`}>
        {active ? (
            <div className='h-full absolute w-[5px] left-0 top-0 dark:bg-main bg-follow'/>
        ) : (<></>)}
        <div className='w-full flex justify-center items-center md:justify-start md:ml-5 gap-4'>
            <Icon size={20}/>
            <h1 className='hidden md:block'>{label}</h1>
        </div>
    </Link>
  )
}

export default SidebarLinks