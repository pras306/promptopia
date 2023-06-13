'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return(
        <div className='mt-16 prompt_layout'>
            {data.map((post) => {
                return (
                    <PromptCard 
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                )
            })}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setsearchResults] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async() => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    const filterPosts = (searchTerm) => {
        return posts.filter(post => {
            return post.prompt.includes(searchTerm) || post.tag.includes(searchTerm) || post.creator.username.includes(searchTerm);
        });
    };

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
        setTimeout(() => {
            setsearchResults(filterPosts(e.target.value));
        },1000);
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
        setTimeout(() => {
            setsearchResults(filterPosts(tagName));
        },1000);
    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                    type='text'
                    placeholder='Search for a tag or username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            { searchText ?
                <PromptCardList 
                    data={searchResults}
                    handleTagClick={handleTagClick}
                />
            :
                <PromptCardList 
                    data={posts}
                    handleTagClick={handleTagClick}
                />
            }
        </section>
    );
};

export default Feed;