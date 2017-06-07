import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Header from './components/header/header';
import Tabs from './components/tabs/tabs';
import Footer from './components/footer/footer';
import Github from './components/github/github';
import About from './components/about/about';
import Clipper from './components/clipper/clipper';
import rootReducer from './ducks/reducers';

let initialState = {};
let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f:any)=>f; // tslint:disable-line
let middleware = applyMiddleware(thunk);
const store: any = middleware(devtools(createStore))(rootReducer, initialState); // tslint:disable-line

class Application extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
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
                        <Tabs tabTitles={['Github repos', 'Github pages', 'About']}>
                            <Github />
                            <Github />
                            <About />
                        </Tabs>
                    </main>
                    <Footer />
                </div>
            </Provider>
        );
    }
}

export default Application;
