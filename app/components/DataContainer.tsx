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
        let data: any;
        if(fetchOption === "Photos") {
          data = await getData.getPhotos(currentPage, perPage);
          setData((prevPhotos) => [...prevPhotos, ...data.photos]);
          setTotalResults(data.total_results);
        } else {
          data = await getData.getVideos(currentPage, perPage);
          setData((prevData) => [...prevData, ...data.videos]);
          setTotalResults(data.total_results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentPage, perPage]);

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
          <div className="grid grid-cols-3 gap-4 animate-fadeIn">
            {fetchOption}
            {/* {data.map((photo: any, index: number) => (
              <img
                key={`${photo.id}-${index}`}
                src={photo.src.large2x}
                alt={photo.alt}
                className="w-full h-auto"
              />
            ))} */}
          </div>
        )}
        {data.length < totalResults && (
          <div className="flex justify-center mt-4">
            <Button
              content={isLoading ? "Carregando..." : "Carregar mais"}
              action={handleLoadMore}
              className="w-32 py-2 rounded-xl bg-firstColor shadow-customShadow text-thirdColor text-sm font-semibold"
            />
          </div>
        )}
      </div>
    </div>
  );
}
