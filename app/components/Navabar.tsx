import FixedContainer from "./FixedContainer";
import Logo from "./Logo";
import Search from "./Search";

export default function Navbar() {
    return <div className="p-4 shadow-customShadow">
        <FixedContainer>
            <div className="flex justify-between items-center">
             <Logo />
             <Search />
            </div>
        </FixedContainer>
    </div>
}