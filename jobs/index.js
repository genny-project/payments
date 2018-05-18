const AssemblyReleaseAll = require( './assembly-release-all' );
const schedule = require( 'node-schedule' );

schedule.scheduleJob( '0 2 * * *', function(){
  AssemblyReleaseAll( process.env.PAYMENTS_EMAIL, process.env.PAYMENTS_PASSWORD );
});
