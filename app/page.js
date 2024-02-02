import '@components/Feed';
import Feed from '@components/Feed';

const Home = () => {
  return (
      <section className="w-full  flex-center flex-col">
          <h1 className="head_text text-center">
              Discover & Share
              <br className="max-w-md:hidden" />
              <span className="orange_gradient"> AI-powered prompts</span>
          </h1>
          <p className="desc text-center">
              Promptopia is an open-source AI prompting tool for modern world tool to descover, create and share creative prompts
          </p>
          <Feed/>
    </section>
  )
}

export default Home