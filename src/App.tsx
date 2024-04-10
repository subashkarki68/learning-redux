import { Provider } from "react-redux";
import AddPostForm from "./components/AddPostForm";
import Posts from "./components/Posts";
import { Toaster } from "./components/ui/toaster";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <div className='w-[100vw] h-[100vh] flex justify-center mt-10'>
          <div className='flex flex-col w-1/2 h-1/2'>
            <AddPostForm />
            <Posts />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
