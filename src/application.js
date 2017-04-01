import React from 'react';
import Header from './components/header/header';
import Tabs from './components/tabs/tabs';
import Footer from './components/footer/footer';

import Github from './components/github/github';
import About from './components/about/about';

function Application(){
    return (
        <div className="application">
            <Header />
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

export default Application;
