import DataContainer from "./components/DataContainer";
import FixedContainer from "./components/FixedContainer";
import GetKey from "./components/GetKey";

export default function Home() {
  return (
    <div className="h-full">
      <FixedContainer>
        <GetKey />
        {/* <DataContainer /> */}
      </FixedContainer>
    </div>
  );
}
