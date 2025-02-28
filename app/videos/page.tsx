"use client";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../store/AppContext";
import GetData from "../service/GetData";
import LoadSpin from "../components/LoadSpin";
import Video from "../components/Video";
import Modal from "../components/Modal";
import FixedContainer from "../components/FixedContainer";
import ContentFilter from "../components/ContentFilter";

export default function Videos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [perPage] = useState<number>(30);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    photographer: string;
    alt: string;
  } | null>(null);

  const { searchQuery } = useContext(AppContext);
  const getData = new GetData();
  const scrollRef = useRef(false);

  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      try {
        const responseData = await getData.getVideos(
          currentPage,
          perPage,
          searchQuery
        );
        setVideos((prevVideos) => {
          const newVideos = [...prevVideos, ...responseData.videos];

          const uniqueVideos = Array.from(
            new Map(newVideos.map((video) => [video.id, video])).values()
          );

          return currentPage === 1 ? responseData.videos : uniqueVideos;
        });
        setTotalResults(responseData.total_results);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
        scrollRef.current = false;
      }
    }

    fetchVideos();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setVideos([]);
    setCurrentPage(1);
  }, [searchQuery]);

  function handleScroll() {
    if (scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isBottom && videos.length < totalResults) {
      scrollRef.current = true;
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videos, totalResults]);

  function handleVideoClick(src: string, photographer: string, alt: string) {
    setSelectedVideo({ src, photographer, alt });
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedVideo(null);
  }

  return (
    <div className="h-[calc(100%-78px)] pt-[78px] sm:h-[calc(100%-94px)] sm:pt-[94px]">
      <FixedContainer>
        {isLoading && videos.length === 0 ? (
          <LoadSpin />
        ) : (
          <div className="flex flex-col gap-4">
            <ContentFilter />
            <div className="columns-1 sm:columns-2 md:columns-3 space-y-4 animate-fadeIn">
              {videos.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  onClick={() =>
                    handleVideoClick(
                      video.video_files?.[0]?.link,
                      video.user?.name || "Unknown",
                      video.alt
                    )
                  }
                >
                  <Video
                    src={video.video_files?.[0]?.link}
                    photographer={video.user?.name || "Unknown"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoading && <LoadSpin />}

        {isModalOpen && selectedVideo && (
          <Modal
            onClose={handleCloseModal}
            title={selectedVideo.photographer}
            src={selectedVideo.src}
            alt={selectedVideo.alt}
          >
            <video
              src={selectedVideo.src}
              controls
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </Modal>
        )}
      </FixedContainer>
    </div>
  );
}
