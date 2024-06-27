'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
    const router=useRouter();
  return (
    <div className="w-64 mt-16 h-screen bg-slate-100 text-blue fixed">
      <nav >
        <a onClick={()=>router.push("/product/createProduct")} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-300">Create Product</a>
        <a onClick={()=>router.push("/product/productList")} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-300">Product List</a>
      </nav>
    </div>
  );
};

export default Sidebar;
