"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const PromptCard = ({
  post,
  handleProfileclick,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card bg-white shadow-md rounded-lg p-5 m-3 max-w-sm w-full md:max-w-md lg:max-w-lg transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div
          onClick={() => {
            handleProfileclick &&
              handleProfileclick(post.creator._id, post.creator.username);
          }}
          className="flex items-start gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            alt="user_name"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn flex-shrink-0" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            alt="copy_btn"
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-center sm:justify-start gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
