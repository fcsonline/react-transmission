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

suite('Main', function() {
  setup(async function (){
    await browser.url('/');
  });

  test('document', async function() {
    const report = await browser.checkDocument({
      widths
    });

    assertDiff(report);
  });

  test('action toolbar', async function() {
    const report = await browser.checkElement('#toolbar', {
      widths
    });

    assertDiff(report);
  });

  test('filter toolbar', async function() {
    const report = await browser.checkElement('#statusbar', {
      widths
    });

    assertDiff(report);
  });

  test('list', async function() {
    const report = await browser.checkElement('#torrent_container', {
      widths
    });

    assertDiff(report);
  });

  test('torrent', async function() {
    const report = await browser.checkElement('.torrent', {
      widths
    });

    assertDiff(report);
  });
});
