import * as React from 'react';
import Header from './components/header/header';
import Tabs from './components/tabs/tabs';
import Footer from './components/footer/footer';
import Github from './components/github/github';
import About from './components/about/about';
import Clipper from './components/clipper/clipper';

class Application extends React.Component<{}, {}> {
    render() {
        return (
            <div className="application">
                <Header />
                <div className="menu" style={{ margin: '1rem', marginTop: 0 }}>
                    <Clipper Tag="a" className="test" href="http://www.utgaard.xyz">
                        A menu
                    </Clipper>
                    <Clipper Tag="a" className="test" href="http://www.utgaard.xyz">
                        concept
                    </Clipper>
                    <Clipper Tag="a" className="test" href="http://www.utgaard.xyz">
                        which is
                    </Clipper>
                    <Clipper Tag="a" className="test" href="http://www.utgaard.xyz">
                        perhaps usable
                    </Clipper>
                </div>
                <main className="application__main">
                    <Tabs tabTitles={['Github', 'About']}>
                        <Github />
                        <About />
                    </Tabs>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Application;
