import Header from 'components/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import { Suspense, useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useIsUserLoading } from 'hooks';
import { ToastWrapper } from 'components/ToastContainer/ToastContainer';
import Loader from 'components/Loader';
import { StyledMain } from './Layout.styled';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const myRef = useRef(null);
  const isDesktop = window.screen.width;
  const isLoading = useIsUserLoading();

  useEffect(() => {
    if (isDesktop > 1439) {
      setIsSidebarOpen(true);
    } else {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktop]);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleClickOutside = e => {
    const modal = document.getElementById('modal-root');
    if (!myRef.current.contains(e.target) && !modal.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  return (
    !isLoading && (<>
      <Header openSidebar={openSidebar} />
      <div ref={myRef}>{isSidebarOpen && <Sidebar />}</div>
      <StyledMain>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </StyledMain>
      <ToastWrapper />
    </>)
    
  );
}

export default Layout;
