'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { UserPost } from '@/types'
import ItemCard from '@/components/ItemCard'

type NewData = UserPost & {
    id: string,
}

const DetailsPage = () => {
    const {lastname} = useParams()
    const [loading, setLoading] = useState<boolean | null>(null)
    const [posts, setPosts] = useState<NewData[]>([])


    useEffect(() => {
        setLoading(true)
        const getDetails = async() => {
            try {
                const data = await fetch(`/api/records/${lastname}`) 
                const {dbPosts} = await data.json()
                setPosts(dbPosts)
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }
        getDetails()
    }, [lastname])


  return (
    <div className='flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
     <h1 className='text-xl font-bold'>Details Page</h1>
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       

        <div className='flex flex-col gap-5'>
        {posts.map((post, index) => (
            <ItemCard key={index} 
                title={post.title}
                description={post.description} 
                name={post.name}
                lastname={post.lastname}
                date={post.date}
                readingTime={post.readingTime} 
                image={post.image}
                />
        ))}
        </div>
    </div>
    </div>
  )
}

export default DetailsPage