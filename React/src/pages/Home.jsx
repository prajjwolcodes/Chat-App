
import SideBar from "../components/hero/SideBar";
import MessageContainer from "../components/messages/MessageContainer";

const Home = () => {
    return (
        <div className='flex h-screen rounded-lg overflow-hidden '>
            <SideBar />
            <MessageContainer />
        </div>
    );
};
export default Home;
