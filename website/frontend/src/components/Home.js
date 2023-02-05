import React from "react";
import Footer from "./Footer";
import SimpleBar from "simplebar-react";


export default function Home() {
    document.title = 'Domovská stránka';

    return (
        <SimpleBar style={{maxHeight: window.innerHeight}}>
            <div className="container px-4">
                <h1 className="text-center display-1 fw-normal p-2">Domovská stránka</h1>
                <div className="container p-4 m-4">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card border border-dark rounded">
                                <div className="card-body">
                                    <h1 className="card-title text-center"><a href="/test"
                                                                              className="text-decoration-none text-dark">Test</a>
                                    </h1>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit.
                                        Animi
                                        cupiditate excepturi fugiat iure natus quae reprehenderit suscipit ullam.
                                        Minima,
                                        vero.</p>
                                    <a href="/test" className="text-decoration-none card-link">Zkusit test</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card border border-dark rounded">
                                <div className="card-body">
                                    <h1 className="card-title text-center"><a href="/statistiky"
                                                                              className="text-decoration-none text-dark">Statistiky</a>
                                    </h1>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit.
                                        Animi
                                        cupiditate excepturi fugiat iure natus quae reprehenderit suscipit ullam.
                                        Minima,
                                        vero.</p>
                                    <a href="/statistiky" className="text-decoration-none card-link">Statistiky</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card border border-dark rounded">
                                <div className="card-body">
                                    <h1 className="card-title text-center"><a href="/trenink"
                                                                              className="text-decoration-none text-dark">Trénink</a>
                                    </h1>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit.
                                        Animi
                                        cupiditate excepturi fugiat iure natus quae reprehenderit suscipit ullam.
                                        Minima,
                                        vero.</p>
                                    <a href="/trenink" className="text-decoration-none card-link">Pojď trénovat!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </SimpleBar>
    )
}