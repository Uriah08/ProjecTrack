import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Link from "next/link"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from 'next/image'

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Create Project",
    href: "/help/create",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Create Task",
    href: "/help/create",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Drag and Drop Task",
    href: "/help/manage",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Real Time Dashboard",
    href: "/help/navigate",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Manage Tasks",
    href: "/help/manage",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "AI Powered",
    href: "/help/manage",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const Recommendation = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex w-full justify-center'>
      <NavigationMenu className='w-full'>
      <NavigationMenuList className='flex justify-between'>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent className='bg-myLight dark:bg-myDark'>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/help/handle"
                  >
                    <Image src={'/logo.png'} width={30} height={30} alt='logo'/>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      <h1 className='text-main'>Projec<span className='text-follow'>Track</span></h1>
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Simplify your project by the better management and efficiency of ProjecTrack.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/help/introduction" title="Introduction">
                Welcome to our Task Management Web App!
              </ListItem>
              <ListItem href="/help/navigate" title="Dashboard Overview">
                After logging in, you will be taken to the Dashboard
              </ListItem>
              <ListItem href="/help/create" title="Projects">
              Start by clicking the &quot;Create Project&quot; button, give your project a title, and set a due date
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Actions</NavigationMenuTrigger>
          <NavigationMenuContent className='bg-myLight dark:bg-myDark'>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/help/introduction" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} dark:bg-main bg-follow`}>
              More...
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
    <h1 className='text-xl font-bold mb-5 mt-3'>FAQ</h1>
    <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it free?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s absolutely free
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I collaborate with other users?</AccordionTrigger>
            <AccordionContent>
            Currently, the app is designed for individual use. We plan to introduce collaboration features in future updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h1 className='text-xl font-bold mb-5 mt-3'>How to create good projects?</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the first step in creating a good project?</AccordionTrigger>
            <AccordionContent>
              The first step is to define clear project goals. Understand the purpose, scope, and objectives to ensure that the entire team is aligned and knows what success looks like.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Why is planning crucial for project success?</AccordionTrigger>
            <AccordionContent>
              Proper planning creates a roadmap for the project. It includes defining tasks, setting deadlines, and allocating resources to keep everything on track and ensure smooth execution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How important is testing during project development?</AccordionTrigger>
            <AccordionContent>
              Testing ensures the project meets requirements and functions as expected. Early testing helps catch issues and ensures that the final product is reliable and ready for delivery.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Recommendation