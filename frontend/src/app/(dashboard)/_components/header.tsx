import { IoNotificationsOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";
import UserDropdown from "~/components/auth/user-dropdown";
import MobileSidebar from "~/components/mobile-sidebar";
import { ModeSelect } from "~/components/mode-select";
import { Button } from "~/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center gap-4 h-14 border-b px-3">
      {/* <MobileSidebar /> */}
      <div className="w-full flex-1">
        {/* <Logo width={24} height={24} className="lg:hidden" /> */}
        <span className="text-xl lg:text-2xl font-bold">Simple CRM</span>
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <ModeSelect />
        <Button
          variant="outline"
          size="icon"
          className="border-0 shadow"
        >
          <IoNotificationsOutline className="h-5 w-5" />
        </Button>
        <div className="relative ">
          <Button
            variant="outline"
            size="icon"
            className="border-0 shadow me-3 relative"
          >
            <RxEnvelopeClosed className="h-5 w-5" />
          </Button>
          <span className="absolute top-0 right-1.5 flex justify-center items-center w-[17px] h-[17px] rounded-full bg-[#FF8C5B] text-white text-[10px] font-bold">
            8
          </span>
        </div>
      </div>
      <UserDropdown />
    </header>
  );
};

export default Header;
