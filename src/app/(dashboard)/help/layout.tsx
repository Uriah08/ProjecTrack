'use client'

import Link from 'next/link'
import React from 'react'
import { useParams } from 'next/navigation'

interface LinkItem {
  href: string;
  label: string;
}

interface Props {
  children: React.ReactNode;
}

const HelpLayout = ({ children }: Props) => {

  const { id } = useParams();

  const gettingStartedLinks: LinkItem[] = [
    { href: 'introduction', label: 'Introduction' },
    { href: 'navigate', label: 'Navigate' },
    { href: 'create', label: 'Create Projects' },
    { href: 'manage', label: 'Manage Tasks' },
    { href: 'organize', label: 'Organizing' },
    { href: 'track', label: 'Track Progress' },
    { href: 'tips', label: 'Tips' },
    { href: 'FAQ', label: 'FAQ' },
  ];

  const createGoodProjectsLinks: LinkItem[] = [
    { href: 'handle', label: 'Handle good project'},
    { href: 'define', label: 'Define' },
    { href: 'conduct', label: 'Conduct' },
    { href: 'detail', label: 'Detail' },
    { href: 'design', label: 'Design' },
    { href: 'implement', label: 'Implementation' },
    { href: 'testing', label: 'Testing' },
    { href: 'review', label: 'Review' },
    { href: 'evaluation', label: 'Evaluation' },
  ];

  const renderLinks = (links: LinkItem[]) => (
    links.map(link => (
      <Link
        key={link.label}
        href={`/help/${link.href}`}
        className={`text-zinc-500 mt-2 hover:text-zinc-800 dark:hover:text-zinc-300 transition-all duration-200 ${id === link.href ? 'text-zinc-800 dark:text-zinc-300 font-semibold' : ''}`}
      >
        {link.label}
      </Link>
    ))
  );

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col items-center gap-10">
      <div className='max-w-[1400px]'>
        <h1 className="text-3xl font-semibold">Help</h1>
        <div className='flex w-full flex-col lg:flex-row'>
          <div className='flex flex-row lg:flex-col mt-5 w-full lg:w-1/4 lg:gap-0 gap-10 '>
            <div className='flex flex-col'>
            <h1 className='font-medium text-base'>Getting Started</h1>
              {renderLinks(gettingStartedLinks)}

            </div>
            <div className='flex flex-col'>
          <h1 className='font-medium text-base lg:mt-5'>Create Good Projects</h1>
            {renderLinks(createGoodProjectsLinks)}
            </div>
          </div>
          <div className='w-full lg:w-3/4 h-[100px] mt-10 lg:mt-0'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpLayout

