'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { DialogClose } from '../ui/dialog';

const SearchContainer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
  
    const items = [
      { label: 'Dashboard', path: '/' },
      { label: 'Search', path: '/search' },
      { label: 'Timeline', path: '/timeline' },
      { label: 'Status', path: '/status' },
      { label: 'Settings', path: '/settings' },
      { label: 'Profile', path: '/profile' },
      { label: 'Help', path: '/help' },
      { label: 'Urgent', path: '/priority/urgent' },
      { label: 'Low', path: '/priority/low' },
      { label: 'Medium', path: '/priority/medium' },
      { label: 'High', path: '/priority/high' },
      { label: 'Backlog', path: '/priority/backlog' },
    ];
  
    const filteredItems = items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const handleClick = (path: string) => {
      router.push(path);
    };
  
    return (
      <div className="w-full mt-5">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="p-2 border rounded-md w-full"
        />
        {searchTerm && (
          <ul className="list-none mt-2 border rounded-md">
            {filteredItems.map((item, index) => (
                <DialogClose asChild key={index}>
                <li
                    onClick={() => handleClick(item.path)}
                    className="cursor-pointer p-2"
                >
                    {item.label}
                </li>
              </DialogClose>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default SearchContainer;
