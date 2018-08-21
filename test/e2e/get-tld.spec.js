import { ClientFunction } from 'testcafe';
var getTld = require("../../dist/getTld");


fixture `Get Top Level Domains`
    .page `http://www.google.com/`;

test('getTld works for Google.com', async t => {
    await t
        .setPageLoadTimeout(0);

    var clientFn = ClientFunction(() => {
        return getTld();
    }, { dependencies: { getTld } });

    var domain = await clientFn();
    await t.expect(domain).eql("google.com");
});
