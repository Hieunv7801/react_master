import React from "react";
import { Link } from "react-router-dom";

export default function index({ data }) {
  return (
    <div className="flex gap-3">
      <div className="relative min-w-fit">
        <Link to={`/watch/${data.vid}`}>
          <img src={data.thumbnail} className="h-24 w-40" alt="thumbnail" />
        </Link>
      </div>
      <div className="flex gap-1 flex-col">
        <h4 className="text-sm">
          <a href="#" className="line-clamp-2">
            {data.title}
          </a>
        </h4>
        <div className="text-xs text-grap-400">
          <div>
            <a href="#" className="hover:text-white">
              {data.sharedBy.firstName} {data.sharedBy.lastName}
            </a>
          </div>
          <div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.viewCount} views
              </span>
              <span>{data.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
