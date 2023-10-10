import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/AuthContext";
import NavBar from "../Navbar";
import Card from "../Card";
import SideBar from "../SideBar";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
const Home = (props) => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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
    <div className="max-h-screen">
      <div style={{ height: "7.5vh" }}>
        <NavBar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <SideBar />
        <InfiniteScroll
          dataLength={videos.length} // Độ dài hiện tại của danh sách sản phẩm
          next={fetchProducts} // Hàm được gọi khi scroll xuống cuối cùng
          hasMore={hasMore} // Tiếp tục load khi còn sản phẩm
          loader={<h4>Loading...</h4>} // Hiển thị thông báo loading
          endMessage={<p>No more videos</p>} // Thông báo hết sản phẩm
        >
          <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8 ml-[300px]">
            {videos.map((video) => (
              <Card key={video.id} video={video} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
