const expect = require( 'chai' ).expect;
const API = require( './API' );

describe( 'API', () => {
  it ( 'should expose a http server', done => {
    expect( API.listen != null ).to.be.true;
    expect( API.get != null ).to.be.true;
    expect( API.post != null ).to.be.true;
    expect( API.put != null ).to.be.true;
    expect( API.delete != null ).to.be.true;
    expect( API.patch != null ).to.be.true;
    expect( API.head != null ).to.be.true;
    done();
  });

  it ( 'should expose the raw http server object', done => {
    expect( API ).to.have.property( 'httpServer' );
    done();
  });
});

/* Close the http server when we are done */
after(() => {
  API.httpServer.close();
});
