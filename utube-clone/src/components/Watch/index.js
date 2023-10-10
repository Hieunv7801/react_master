import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import NavBar from "../Navbar";
import WatchCard from "../WatchCard/index";
import { FaShare } from "react-icons/fa";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Watch() {
  const [showMoreStatus, setShowMoreStatus] = useState(false);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();
  const getData = () => {
    axios
      .get("http://localhost:5001/api/videos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          data: "application/json",
        },
        params: {
          limit: 10,
          currentPage: page,
          sortBy: "publishedAt",
        },
      })
      .then((res) => {
        setVideos([...videos, ...res.data.data.body]);
        setTotalItems(res.data.data.totalItems);
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getData(), []);

  const fetchProducts = async () => {
    if (videos.length >= totalItems) {
      setHasMore(false);
      return;
    }
    getData();
  };
  return (
    <>
      <div className="max-h-screen overflow-hidden">
        <div style={{ height: "7.5vh" }}>
          <NavBar />
        </div>
        <div className="flex w-full" style={{ height: "92.5vh" }}>
          <div className="flex gap-y-10 gap-x-5 p-7 mx-20 mr-0 w-full overflow-auto">
            <div style={{ maxWidth: "800px" }}>
              <div>
                <iframe
                  width="800"
                  height="502"
                  src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="mt-5">
                  <p className="text-xl">{videos.title}</p>
                  <div className="flex justify-between mt-1">
                    <div className="text-sm text-gray-400">
                      <span className="after:content-['•'] after:mx-1">
                        {videos.viewCount} views
                      </span>
                      <span>100 ago</span>
                    </div>
                    <div className="flex items-center gap-4 uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BiLike className="text-xl" />
                        <strong>100</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BiDislike className="text-xl" />
                        <strong>dislike</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <FaShare className="text-xl" />
                        <strong>share</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <HiScissors className="text-xl" />
                        <strong>clip</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <MdOutlinePlaylistAdd className="text-xl" />
                        <strong>save</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BsThreeDots className="text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                    <div className="flex items-center gap-5 mr-5 mt-4">
                      <div>
                        <img src="" alt="" className="rounded-full h-12 w-12" />
                      </div>
                      <div className="w-5/6">
                        <h5 className="text-sm">hh</h5>
                        <h6 className="text-gray-400 text-xs">subscribers</h6>
                      </div>
                      <div>
                        <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                          subscribe
                        </button>
                      </div>
                    </div>
                    <div
                      className={`${
                        !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                      } text-sm w-11/12`}
                    >
                      <pre
                        style={{
                          fontFamily: `"Roboto", sans-serif`,
                        }}
                        className="whitespace-pre-wrap"
                      ></pre>
                    </div>
                    <div>
                      <button className="uppercase text-sm cursor-pointer">
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-24 flex flex-col gap-3">
              <InfiniteScroll
                dataLength={videos.length} // Độ dài hiện tại của danh sách sản phẩm
                next={fetchProducts} // Hàm được gọi khi scroll xuống cuối cùng
                hasMore={hasMore} // Tiếp tục load khi còn sản phẩm
                loader={<h4>Loading...</h4>} // Hiển thị thông báo loading
                endMessage={<p>No more videos</p>} // Thông báo hết sản phẩm
              >
                <div>
                  {videos.map((item) => {
                    return <WatchCard data={item} key={item.id} />;
                  })}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
