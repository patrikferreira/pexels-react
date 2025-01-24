import FixedContainer from "./components/FixedContainer";
import LoadSpin from "./components/LoadSpin";

export default function Home() {
  return (
    <div className="h-full">
      <FixedContainer>
        <LoadSpin />
      </FixedContainer>
    </div>
  );
}
