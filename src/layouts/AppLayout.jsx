import ToggleTheme from "@/components/ToggleTheme.jsx";

const AppLayout = ({ children }) => {
    return (
        <div className={'font-Inter'}>
            <div className={'bg-white dark:bg-black dark:text-white w-full h-24 flex items-center border-b-2 fixed z-10'}>
                <div className={'container mx-auto px-5 md:px-0 flex items-center justify-between'}>
                    <div className={'text-4xl italic font-bold'}>
                        Qur'an Digital
                    </div>
                    <ToggleTheme />
                </div>
            </div>
            <div className={'dark:bg-black dark:text-white min-h-screen pt-28'}>
                <div className={'container mx-auto px-5 pb-60 md:px-0'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppLayout;