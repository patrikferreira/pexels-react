import DataContainer from "./components/DataContainer";
import FixedContainer from "./components/FixedContainer";

export default function Home() {
  return (
    <div className="h-full">
      <FixedContainer>
        <DataContainer />
      </FixedContainer>
    </div>
  );
}
