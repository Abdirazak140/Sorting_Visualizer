import { Link } from "react-router-dom";
import { FcGenericSortingAsc } from "react-icons/fc";
import { SlMenu } from "react-icons/sl";
import { IconContext } from "react-icons";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 bg-davy-gray">
            <div className="flex items-center">
                <div className="flex flex-row space-x-2 items-center">
                    <FcGenericSortingAsc size={50} className="rotate-90" />
                    <span to="/" className="text-snow font-semibold text-xl">Sort Visualizer</span>
                </div>
            </div>

            <div className="flex items-center">
                <IconContext.Provider
                    value={{ color: 'snow'}}
                >
                    <SlMenu size={35} className="" />
                </IconContext.Provider>
            </div>
        </nav>
    )
}