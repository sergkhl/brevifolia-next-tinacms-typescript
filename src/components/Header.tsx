import Link from 'next/link'

interface IHeaderProps {
  siteTitle?: string
}

const Header: React.FC<IHeaderProps> = ({ siteTitle }) => {
  return (
    <header className="header">
      <nav className="nav" role="navigation" aria-label="main navigation">
        <Link href="/">
          <h1>{siteTitle}</h1>
        </Link>
        <div>
          <Link
            href={`${
              typeof window !== 'undefined' &&
              window.location.pathname == '/info'
                ? '/'
                : '/info'
            }`}
          >
            <h1>{`${
              typeof window !== 'undefined' &&
              window.location.pathname == '/info'
                ? 'close'
                : 'info'
            }`}</h1>
          </Link>
        </div>
      </nav>
      <style jsx>
        {`
          h1 {
            margin-bottom: 0;
          }
          h1:hover {
            cursor: pointer;
          }
          nav {
            padding: 1.5rem 1.25rem;
            border-bottom: 1px solid #ebebeb;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
          }
          img {
            margin-bottom: 0;
          }
          @media (min-width: 768px) {
            .header {
              height: 100vh;
              position: fixed;
              left: 0;
              top: 0;
            }
            .nav {
              padding: 2rem;
              width: 30vw;
              height: 100%;
              border-right: 1px solid #ebebeb;
              border-bottom: none;
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}
      </style>
    </header>
  )
}

export default Header
