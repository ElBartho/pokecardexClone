import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../components/Header';
import styled from '@emotion/styled';
// import Footer from '../Footer';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
`;

const Layout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Root>
        <Header />
        {children}
      </Root>
    </Router>
  );
};

export default Layout;
