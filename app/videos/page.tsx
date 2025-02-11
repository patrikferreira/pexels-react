"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/AppContext";
import GetData from "../service/GetData";
import LoadSpin from "../components/LoadSpin";
import Video from "../components/Video";
import Modal from "../components/Modal";
import Button from "../components/Button";
import FixedContainer from "../components/FixedContainer";

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

  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      try {
        const responseData = await getData.getVideos(
          currentPage,
          perPage,
          searchQuery
        );
        setVideos((prevVideos) =>
          currentPage === 1
            ? responseData.videos
            : [...prevVideos, ...responseData.videos]
        );
        setTotalResults(responseData.total_results);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setVideos([]);
    setCurrentPage(1);
  }, [searchQuery]);

  function handleLoadMore() {
    if (videos.length < totalResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function handleVideoClick(src: string, photographer: string, alt: string) {
    setSelectedVideo({ src, photographer, alt });
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedVideo(null);
  }

  return (
    <div className="h-[calc(100%-92px)] pt-[92px]">
      <FixedContainer>
        {isLoading && videos.length === 0 ? (
          <LoadSpin />
        ) : (
          <div className="columns-3 space-y-4 animate-fadeIn">
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
        )}
        {videos.length < totalResults && (
          <div className="flex justify-center mt-4">
            <Button
              action={handleLoadMore}
              className="w-32 py-2 rounded-xl bg-firstColor shadow-customShadow text-thirdColor text-sm font-semibold"
            >
              {isLoading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}

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
