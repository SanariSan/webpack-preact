import preactLogo from '../../assets/preact.svg';
import { Resource } from './Resource';
import './style.scss';

export function Home() {
  return (
    <div class="home">
      <a href="https://preactjs.com" target="_blank" rel="noreferrer">
        <img src={preactLogo} alt="Preact logo" height="160" width="160" />
      </a>
      <h1>Get Started building Preact Apps </h1>
      <section>
        <Resource
          title="Learn Preact"
          description="If you're new to Preact, try the interactive tutorial to learn important concepts"
          href="https://preactjs.com/tutorial"
        />
        <Resource
          title="Differences to React"
          description="If you're coming from React, you may want to check out our docs to see where Preact differs"
          href="https://preactjs.com/guide/v10/differences-to-react"
        />
      </section>
    </div>
  );
}
