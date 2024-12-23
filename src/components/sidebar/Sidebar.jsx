import { useContext, useState } from 'react'
import Searchbar from "./Searchbar";
import SidebarFooter from "./SidebarFooter";
import UserComponent from "./UserComponent";
import { IoIosMenu } from 'react-icons/io'
import SidebarModal from './SidebarModal'
import { UserContext } from '../../pages/Dashboard'

export default function Sidebar() {
    const [search, setSearch] = useState("");
    const { isModal, setIsModal, theme, setTheme } = useContext(UserContext);
    const [isArchive, setIsArchive] = useState(false);
    const [isSettings, setIsSettings] = useState(false);

    const menuFunction = (e) => {
        e.stopPropagation();
        setIsModal(!isModal);
    }

    return (
        <main className="relative flex flex-col gap-4 w-1/4 h-screen p-2 bg-primary shadow-lg z-20">
            <div className="flex items-center gap-2 px-3">
                <button onClick={menuFunction}><IoIosMenu className="text-[26px] text-text hover:text-gray-500 transition-all" /></button>
                <Searchbar search={search} setSearch={setSearch} />
                {isModal && <SidebarModal
                    setIsArchive={setIsArchive}
                    setIsSettings={setIsSettings}
                    theme={theme}
                    setTheme={setTheme}
                />}
            </div>
            <UserComponent search={search}/>
            <SidebarFooter />
        </main>
    )
}