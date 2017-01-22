import assert from 'assert';

function assertDiff(results) {
  results.forEach((result) => {
    assert.ok(
      result.isWithinMisMatchTolerance,
      `Images are not the same (mismatch percentage: ${result.misMatchPercentage})`
    );
  });
}

const widths = [1400];

suite('Inspector', function() {
  setup(async function (){
    await browser.url('/');
    await browser.pause(1000);
    await browser.element('.torrent:nth-child(1)').click();
    await browser.element('#toolbar-inspector').click();
  });

  test('document', async function() {
    const report = await browser.checkDocument({
      widths
    });

    assertDiff(report);
  });

  test('content', async function() {
    const report = await browser.checkElement('#torrent_inspector', {
      widths
    });

    assertDiff(report);
  });
});
