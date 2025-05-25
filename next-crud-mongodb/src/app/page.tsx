'use client'

import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { UserPost } from "@/types";
import { GetPostsVariables } from "@/types";
import Link from "next/link";
import ArrowButton from "@/components/ui/ArrowButton";

export default function Home() {

  const [openForm, setOpenForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean | null>(null)
  const [data, setData] = useState<UserPost[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount]= useState<number>(1)
  const limit = 10



  const toggleForm = (prev: boolean) => {
    setOpenForm(!openForm)
  }

  useEffect(() => {
    const getData = async () => {
      try {
      setLoading(true)
      const data = await fetch(`api/records?page=${page}&limit=${limit}`)
      const {items, pages, newPage} : GetPostsVariables = await data.json()
      setData(items)
      console.log(items[0].date)
      setPageCount(pages)
      setPage(parseInt(newPage))
      } catch(err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [openForm, page])
  

  const pagesRender = []
  for (let i = 1; i <= pageCount; i++) {
    pagesRender.push(i)
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <h1 className="font-bold text-xl">Hello, this is very basic website where you can view or create and delete posts</h1>
          <div onClick={() => toggleForm(openForm)}><Button buttonName="Create Post"/></div>
          {openForm && <ItemForm onClose={() => setOpenForm(false)}/>}

      
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {loading 
        ? <div>Loading...</div> 
        : <div className="flex flex-col m-4 gap-10">
          {
            data.map((item, key) => (
              <Link key={key} href={`/${item.lastname}`}>
              <ItemCard 
                title={item.title} 
                description={item.description} 
                name={item.name} 
                lastname={item.lastname} 
                date={item.date} // fix since its undefined
                readingTime={item.readingTime} 
                image={item.image}/>
              </Link>
            ))
          }
        </div>
        }
        
      </main>
        
      <div className="flex flex-row justify-around items-center mx-auto">
        <ArrowButton 
        direction={'backward'}
        changePage={() => page > 1 && setPage(page - 1 )}/>
        
        
        {pagesRender.map((pagPage, index) => (
          <span
          className=
          {`${pagPage == page ? "bg-blue-500 text-white" : 'bg-white'} block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-blue-500 hover:text-white m-4`}
          key={index} 
          onClick={() => setPage(pagPage)}>{pagPage}</span>
        ))}
        

        <ArrowButton 
        direction={'forward'}
        changePage={() => page < pageCount && setPage(page + 1)}/>
      </div>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
        
      
      </footer>
    </div>
  );
}
