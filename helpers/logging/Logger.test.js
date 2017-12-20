const expect = require( 'chai' ).expect;
const Logger = require( './Logger' );

describe( 'Logger', () => {
  it ( 'should be a valid logging instance', done => {
    expect( Logger ).to.have.property( 'info' );
    expect( Logger ).to.have.property( 'warn' );
    expect( Logger ).to.have.property( 'debug' );
    expect( Logger ).to.have.property( 'error' );
    done();
  });
});
