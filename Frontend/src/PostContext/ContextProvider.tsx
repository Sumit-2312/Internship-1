import  { createContext, useState } from 'react';



export const PostContext = createContext(null);

interface postsType{
    id: number;
    imageUrl: string;
    likes: number;
    comments: number;
    caption: string;
}


const ContextProvider = ({ children }:{children:any}) => {

    const posts:postsType[] = [
        {
            id: 1,
            imageUrl: "https://plus.unsplash.com/premium_photo-1677231559666-53bed9be43ba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 120,
            comments: 34,
            caption: "This is a sample caption",
        },
        {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 12,
            comments: 2,
            caption: "This is a sample caption",
        },
        {
            id: 3,
            imageUrl: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 111,
            comments: 28,
            caption: "This is a sample caption",
        },
        {
            id: 4,
            imageUrl: "https://images.unsplash.com/photo-1593757147298-e064ed1419e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 189,
            comments: 48,
            caption: "This is a sample caption",
        },
        {
            id: 5,
            imageUrl: "https://plus.unsplash.com/premium_photo-1670948083449-41e3ea2263b7?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 190,
            comments: 90,
            caption: "This is a sample caption",
        },
        {
            id: 6,
            imageUrl: "https://plus.unsplash.com/premium_photo-1664876514376-e684971ec8d3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 300,
            comments: 39,
            caption: "This is a sample caption",
        }
      ]

    const [Posts, setPosts] = useState(posts);

    console.log(Posts)


    return (
        //@ts-ignore
        <PostContext.Provider value={{ Posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};


export default ContextProvider;