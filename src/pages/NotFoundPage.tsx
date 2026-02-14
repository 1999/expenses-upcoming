import { Page, Navbar, Block, NavbarBackLink } from 'konsta/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Navbar
        title="404"
        left={<NavbarBackLink onClick={() => navigate('/')} />}
      />
      <Block className="text-center">
        <h1 className="text-4xl font-bold mb-4">Not found</h1>
        <p>The page you are looking for does not exist.</p>
      </Block>
    </Page>
  );
};

export default NotFoundPage;
