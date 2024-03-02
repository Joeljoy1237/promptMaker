"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleProfileclick, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleProfileclick={handleProfileclick}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState([]);

  const handleSearchChange = (val) => {
    var tempVal = val.toLowerCase();
    setFilter(
      posts.filter(
        (item) =>
          item.creator.username.toLowerCase().includes(tempVal) ||
          item.tag.toLowerCase().includes(tempVal) ||
          item.prompt.toLowerCase().includes(tempVal)
      )
    );
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", { cache: "no-store" });
      const data = await response.json();
      setPosts(data);
      setFilter(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearchChange(e.target.value);
          }}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filter}
        handleProfileclick={(id, name) => {
          console.log(id);
          router.push(`/profile/${id}?name=${name}`);
        }}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
};

export default Feed;
