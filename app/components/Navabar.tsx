import FixedContainer from "./FixedContainer";
import Logo from "./Logo";
import Search from "./Search";

export default function Navbar() {
    return <nav className="shadow-customShadow bg-background fixed top-0 w-full z-50">
        <FixedContainer>
            <div className="flex justify-between items-center">
             <Logo />
             <Search />
            </div>
        </FixedContainer>
    </nav>
}