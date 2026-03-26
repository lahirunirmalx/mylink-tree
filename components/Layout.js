import dynamic from 'next/dynamic';
import styled from 'styled-components';

const SplashCursor = dynamic(() => import('./react-bits/SplashCursor'), { ssr: false });

export default function Layout({ children }) {
  return (
    <Main>
      {children}
      <SplashCursor />
    </Main>
  );
}

const Main = styled.main`
  min-height: 100vh;
  background: url('/bg.png') no-repeat;
  background-size: 100%;
  background-position: -50vh 10%;
  background-attachment: fixed;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    background-size: 250%;
    background-position: -50vh 30vh;
  }
`;
