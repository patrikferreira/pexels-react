"use client";
import { useContext, useEffect, useState } from "react";
import LoadSpin from "./LoadSpin";
import Button from "./Button";
import { AppContext } from "../store/AppContext";
import GetData from "../service/GetData";

export default function DataContainer() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [perPage] = useState<number>(15);

  const { fetchOption } = useContext(AppContext);

  if (!fetchOption) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const getData = new GetData();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        let responseData: any;

        if (fetchOption === "Photos") {
          responseData = await getData.getPhotos(currentPage, perPage);
          setData((prevData) =>
            currentPage === 1
              ? responseData.photos
              : [...prevData, ...responseData.photos]
          );
        } else {
          responseData = await getData.getVideos(currentPage, perPage);
          setData((prevData) =>
            currentPage === 1
              ? responseData.videos
              : [...prevData, ...responseData.videos]
          );
        }

        setTotalResults(responseData.total_results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [fetchOption, currentPage]);

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
  }, [fetchOption]);

  const handleLoadMore = () => {
    if (data.length < totalResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="h-full">
      <div className="h-full">
        {isLoading && data.length === 0 ? (
          <LoadSpin />
        ) : (
          <div>
            {fetchOption === "Photos" ? (
              <div className="grid grid-cols-3 gap-4 animate-fadeIn">
                {data.map((photo: any, index: number) => (
                  <img
                    key={`${photo.id}-${index}`}
                    src={photo.src?.large2x || photo.src?.original}
                    alt={photo.alt}
                    className="w-full h-auto"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 animate-fadeIn">
                {data.map((video: any, index: number) => (
                  <video
                    key={`${video.id}-${index}`}
                    controls
                    className="w-full h-auto"
                  >
                    {video.video_files?.length > 0 ? (
                      <source
                        src={video.video_files[0]?.link}
                        type="video/mp4"
                      />
                    ) : (
                      <p>Video not available</p>
                    )}
                    Your browser does not support videos.
                  </video>
                ))}
              </div>
            )}
          </div>
        )}
        {data.length < totalResults && (
          <div className="flex justify-center mt-4">
            <Button
              content={isLoading ? "Loading..." : "Load more"}
              action={handleLoadMore}
              className="w-32 py-2 rounded-xl bg-firstColor shadow-customShadow text-thirdColor text-sm font-semibold"
            />
          </div>
        )}
      </div>
    </div>
  );
}
