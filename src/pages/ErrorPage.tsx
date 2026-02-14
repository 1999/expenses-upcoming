import { Page, Navbar, Block, Button } from 'konsta/react';

const ErrorPage = () => {
  return (
    <Page>
      <Navbar title="Error" />
      <Block className="text-center">
        <h1 className="text-4xl font-bold mb-4">Unexpected error</h1>
        <p>An unexpected error occurred.</p>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      </Block>
    </Page>
  );
};

export default ErrorPage;
